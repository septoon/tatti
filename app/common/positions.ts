export type PositionType = "center" | "top" | "right" | "bottom" | "left" |
  "top-left" | "top-right" | "bottom-left" | "bottom-right";

// Теперь вычисление позиции происходит внутри функции, что исключает различия между сервером и клиентом.
export const getPos = (): PositionType => {
  if (typeof window === 'undefined') return 'bottom';
  return window.screen.availWidth >= 768 ? 'right' : 'bottom';
};

export let position: PositionType = 'center';

export const show = (newPosition: PositionType) => {
  position = newPosition;
};

export const handleShow = (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
  // Вычисляем позицию только на клиенте
  if (typeof window !== 'undefined') {
    show(getPos());
  }
  setIsModalOpen(true);
};