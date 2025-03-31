import React from 'react'

interface DeliveryMethodProps {
  deliveryMethod: 'pickup' | 'courier';
  setDeliveryMethod: React.Dispatch<React.SetStateAction<'pickup' | 'courier'>>;
}

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({ deliveryMethod, setDeliveryMethod }) => {
  return (
    <div className='mb-6 w-full flex justify-center'>
      <div className={`px-3 py-1 rounded-md ${deliveryMethod === 'pickup' ? 'bg-[#393939]' : 'bg-[#1e1e1e]'}`} onClick={() => setDeliveryMethod('pickup')}>
        <span className="text-white ">Самовывоз</span>
      </div>

      <div className={`px-3 py-1 rounded-md ${deliveryMethod === 'courier' ? 'bg-[#393939]' : 'bg-[#1e1e1e]'}`} onClick={() => setDeliveryMethod('courier')}>
        <span className="text-white ">Доставка курьером</span>
      </div>
    </div>
  )
}

export default DeliveryMethod