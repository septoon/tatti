interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderDetails {
  name: string;
  phone: string;
  date: Date | null;
  wishes: string;
  deliveryMethod: 'pickup' | 'courier';
  address?: string;
  cartItems: CartItem[];
  totalPrice: number;
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
  const botToken = process.env.BOT_TOKEN;
  const chatId = process.env.CHANNEL_ID; 

  const orderDetails = cartItems.map((item) => 
    `${item.name} — ${item.quantity} шт. (${item.price * item.quantity} р.)`
  ).join('\n');

  const deliveryInfo = deliveryMethod === 'courier'
    ? `Доставка: Курьер\nАдрес: ${address || 'Не указан'}`
    : `Доставка: Самовывоз`;

  const message = `
🚨 *Новый заказ!*

👤 Имя: ${name || 'Не указано'}
📞 Телефон: ${phone || 'Не указан'}
📅 Дата: ${date ? date.toLocaleDateString() : 'Не указана'}
📦 Пожелания: ${wishes || 'Нет'}

${deliveryInfo}

🛒 *Состав заказа:*
${orderDetails}

💰 Итоговая сумма: ${totalPrice} р.
  `;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
    alert('Ваш заказ успешно отправлен!');
  } catch (error) {
    console.error('Ошибка отправки заказа:', error);
    alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте снова.');
  }
};

export default sendOrder;