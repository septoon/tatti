import { createSlice } from '@reduxjs/toolkit';
import { menu } from '@/app/api/menu'; // <-- импортируем локальные данные

// Типы для меню
type MenuItem = {
  name: string;
  price: number;
  description: string[];
  image: string;
};

type MenuType = {
  [key: string]: MenuItem[];
};

interface MenuState {
  items: MenuType;
  categories: string[];
}

// Берем все данные и формируем массив категорий
const initialState: MenuState = {
  items: menu,
  categories: Object.keys(menu),
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Если нужна логика изменения, добавляй сюда редьюсеры
  },
});

export default menuSlice.reducer;