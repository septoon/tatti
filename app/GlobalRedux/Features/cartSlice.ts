import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// Получаем корзину из localStorage или устанавливаем пустой массив
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
};
const saveCartToLocalStorage = (cart: CartItem[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Добавляем товар в корзину
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
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
  },
});

export const { addToCart, removeOne, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;