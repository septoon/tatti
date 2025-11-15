// /app/GlobalRedux/provider.jsx
'use client';
import { ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { hydrateCart, loadCartFromLocalStorage } from './Features/cartSlice';

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const items = loadCartFromLocalStorage();
    store.dispatch(hydrateCart(items));
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
