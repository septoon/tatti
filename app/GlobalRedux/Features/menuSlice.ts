import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface MenuItem {
  name: string;
  price: number;
  description: string[];
  image: string;
  category?: string;
}

type MenuType = Record<string, MenuItem[]>;

interface MenuState {
  items: MenuType;
  categories: string[];
  loading: boolean;
  error?: string;
}

export const fetchMenu = createAsyncThunk<MenuType, void, { rejectValue: string }>(
  'menu/fetchMenu',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/menu.json`);
      const data = response.data;
      let groupedData: Record<string, MenuItem[]> = {};
      if (!Array.isArray(data)) {
        // data — объект с ключами (категориями)
        for (const cat in data) {
          let items = data[cat];
          const flatItems: MenuItem[] = Array.isArray(items) ? items.flat(Infinity) : [];
          // Для каждого элемента всегда задаем category равное ключу cat
          groupedData[cat] = flatItems.map(item => ({ ...item, category: cat }));
        }
      } else {
        // Если data — массив, группируем по полю category; если отсутствует, назначаем 'Без категории'
        groupedData = data.reduce((acc: Record<string, MenuItem[]>, item: any) => {
          const cat = item.category || 'Без категории';
          acc[cat] = acc[cat] ? [...acc[cat], item] : [item];
          return acc;
        }, {});
      }
      return groupedData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Ошибка при загрузке меню');
    }
  }
);

const initialState: MenuState = {
  items: {},
  categories: [],
  loading: false,
  error: undefined,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.categories = Object.keys(action.payload);
    });
    builder.addCase(fetchMenu.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default menuSlice.reducer;