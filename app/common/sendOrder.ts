import axios from 'axios';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  name: string;
  phone: string;
  date?: Date | null;
  wishes?: string;
  deliveryMethod?: 'pickup' | 'courier';
  address?: string;
  cartItems?: CartItem[];
  totalPrice?: number;
}

export interface SendOrderResult {
  success: boolean;
  orderId?: string;
}

const sendOrder = async ({
  name,
  phone,
  date,
  wishes,
  deliveryMethod,
  address,
  cartItems,
  totalPrice
}: OrderDetails): Promise<SendOrderResult> => {
  const apiBaseUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

  if (!apiBaseUrl) {
    console.error('NEXT_PUBLIC_API_URL is not configured');
    alert('Сервис заказа временно недоступен. Пожалуйста, попробуйте позже.');
    return {
      success: false,
    };
  }

  const payload = {
    name,
    phone,
    date: date ? date.toISOString() : null,
    wishes,
    deliveryMethod,
    address,
    cartItems,
    totalPrice,
  };

  try {
    const response = await axios.post(`${apiBaseUrl}/api/orders`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const orderId = response?.data?.orderId;

    alert('Ваш заказ успешно отправлен!');
    return {
      success: true,
      orderId,
    };
  } catch (error) {
    console.error('Ошибка отправки заказа:', error);
    alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте снова.');
    return {
      success: false,
    };
  }
};

export default sendOrder;
