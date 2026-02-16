import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  unit?: string;
  images?: string[];
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const LEGACY_CAKE_IMAGE_PREFIX = '/ТОРТЫ И ДЕСЕРТЫ/';
const LEGACY_MENU_IMAGE_PREFIX = '/Фуршетное меню/';

const sanitizeImagePath = (image?: string) => {
  const value = (image || '').trim();
  if (!value) return '';
  if (value.startsWith(LEGACY_CAKE_IMAGE_PREFIX)) return '/images/not_found.svg';
  if (value.startsWith(LEGACY_MENU_IMAGE_PREFIX)) return '/images/not_found.svg';
  return value;
};

// Получаем корзину из localStorage или устанавливаем пустой массив
export const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return [];
    const parsed = JSON.parse(savedCart);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      ...item,
      image: sanitizeImagePath(item?.image),
      images: Array.isArray(item?.images) ? item.images.map((src: string) => sanitizeImagePath(src)) : item?.images,
    }));
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: [],
};
const saveCartToLocalStorage = (cart: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};
const kilogramItems = [301, 302, 303];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
// Добавляем товар в корзину
// Список id товаров, измеряемых в килограммах

addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
  const existingItem = state.items.find((item) => item.id === action.payload.id);
  const isKilogram = kilogramItems.includes(action.payload.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const image = Array.isArray(action.payload.images) && action.payload.images.length > 0
      ? action.payload.images[0]
      : action.payload.image || '';

    state.items.push({
      ...action.payload,
      image,
      quantity: 1,
      unit: isKilogram ? 'кг' : 'шт'
    });
  }
  saveCartToLocalStorage(state.items);
},

    // Удаляем единицу товара из корзины
    removeOne: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);

      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
      saveCartToLocalStorage(state.items);
    },

    // Полностью удаляем товар из корзины (все количество)
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },

    // Очищаем корзину
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);
    },
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeOne, removeFromCart, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;
