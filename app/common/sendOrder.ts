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

const sendOrder = async ({
  name,
  phone,
  date,
  wishes,
  deliveryMethod,
  address,
  cartItems,
  totalPrice
}: OrderDetails) => {
  const botToken = process.env.NEXT_PUBLIC_BOT_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_CHANNEL_ID; 

  const orderDetails = cartItems?.map((item) => 
    `${item.name} — ${item.quantity} шт. (${item.price * item.quantity} р.)`
  ).join('\n') || 'Нет товаров в заказе';

  const deliveryInfo = deliveryMethod === 'courier'
    ? `Доставка: Курьер\nАдрес: ${address || 'Не указан'}\n`
    : deliveryMethod === 'pickup'
    ? `Доставка: Самовывоз`
    : '';

  const message = `
🚨 *Новый заказ!*

👤 Имя: ${name || 'Не указано'}
📞 Телефон: +7${phone || 'Не указан'}
📅 Дата: ${date ? date.toLocaleDateString() : 'Не указана'}
📦 Пожелания: ${wishes || 'Нет'}

${deliveryInfo}

🛒 *Состав заказа:*
${orderDetails}

${totalPrice ? `💰 Итоговая сумма: ${totalPrice} р.` : ''}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    });
    return true;
    alert('Ваш заказ успешно отправлен!');
  } catch (error) {
    console.error('Ошибка отправки заказа:', error);
    alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте снова.');
  }
};

export default sendOrder;