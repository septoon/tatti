import axios from 'axios'
import React, { useState } from 'react'
import { HiOutlinePaperClip } from 'react-icons/hi2'

interface ReviewFormProps {
  onClose: () => void
}

const MAX_IMAGE_SIZE_MB = 2
const MAX_IMAGE_DIMENSION = 1920

const isHeic = (file: File) =>
  /image\/hei(c|f)/i.test(file.type) || /\.(heic|heif)$/i.test(file.name)

const toWebpName = (fileName: string) => {
  const baseName = fileName.replace(/\.[^/.]+$/, '')
  return `${baseName}.webp`
}

const ensureWebpFile = async (file: File): Promise<File> => {
  const { default: imageCompression } = await import('browser-image-compression')
  let sourceFile: File = file

  if (isHeic(file)) {
    const { default: heic2any } = await import('heic2any')
    const converted = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.9 }) as Blob | Blob[]
    const blob = Array.isArray(converted) ? converted[0] : converted
    sourceFile = new File([blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
      type: 'image/jpeg',
      lastModified: Date.now(),
    })
  }

  const compressed = await imageCompression(sourceFile, {
    maxSizeMB: MAX_IMAGE_SIZE_MB,
    maxWidthOrHeight: MAX_IMAGE_DIMENSION,
    useWebWorker: true,
    fileType: 'image/webp',
    initialQuality: 0.85,
  })

  return new File([compressed], toWebpName(file.name), {
    type: 'image/webp',
    lastModified: Date.now(),
  })
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onClose }) => {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imageName, setImageName] = useState('Выберите фото')
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null
    setImage(selectedFile)
    setImageName(selectedFile ? selectedFile.name : 'Фото не выбрано')
  }

  const isFormValid = name.trim() !== '' && reviewText.trim() !== '' && rating > 0;

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await axios.post<{ url?: string }>('/api/reviews/upload', formData)
      return response.data?.url || null
    } catch (error) {
      console.error('Ошибка загрузки изображения:', error)
      return ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    let uploadedImageUrl = ''
    if (image) {
      try {
        const webpImage = await ensureWebpFile(image)
        uploadedImageUrl = (await uploadImage(webpImage)) || ''
      } catch (error) {
        console.error('Ошибка конвертации изображения:', error)
        alert('Не удалось обработать изображение')
        setLoading(false)
        return
      }
    }

    const reviewData = {
      name,
      reviewText,
      rating,
      image: uploadedImageUrl,
      images: uploadedImageUrl ? [uploadedImageUrl] : []
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/data/reviews.json`,
        reviewData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Ошибка при добавлении отзыва')
      }

      setName('')
      setRating(0)
      setReviewText('')
      setImage(null)
      setImageName('Выберите фото')
      onClose()
    } catch (error: any) {
      console.error(error)
      alert('Не удалось добавить отзыв')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Ваше имя *
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя"
            required
            className="w-full p-2 mt-2 border text-white border-gray-600 rounded-md"
          />
        </label>
        <label className="relative w-full">
          <span>Изображение рядом с отзывом</span>
          <div className="relative flex items-center">
            <input type="file" id="file-upload" onChange={handleFileChange} accept="image/*,.heic,.heif" className="hidden" />
            <label
              htmlFor="file-upload"
              className="flex items-center w-full text-white p-2 pl-2 mt-2 border border-gray-600 rounded-md cursor-pointer"
            >
              <HiOutlinePaperClip className="mr-2 text-white -rotate-45 text-gray-500" />
              {imageName}
            </label>
          </div>
        </label>
        <label>
          Ваша оценка *
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
              >
                ★
              </span>
            ))}
          </div>
        </label>
        <label>
          Текст отзыва *
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Ваш отзыв"
            required
            className="w-full p-2 mt-2 border text-white border-gray-600 rounded-md"
          ></textarea>
        </label>
        <button
          type="submit"
          className={`bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 ${
            (!isFormValid || loading) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            'Отправить'
          )}
        </button>
      </form>
    </div>
  )
}

export default ReviewForm
