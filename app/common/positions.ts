export type PositionType = "center" | "top" | "right" | "bottom" | "left" | 
  "top-left" | "top-right" | "bottom-left" | "bottom-right";

const screenWidth = typeof window !== 'undefined' ? window.screen.availWidth : 512;
export const pos: PositionType = screenWidth >= 768 ? 'right' : 'bottom';
export let position: PositionType = 'center';

export const show = (newPosition: PositionType) => {
  position = newPosition;
};

export const handleShow = (setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>): void => {
  show(pos);
  setIsModalOpen(true);
};