import type { Metadata } from "next";
import "./globals.css";
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';

import { PrimeReactProvider } from 'primereact/api';
import Header from "./components/Header/Header";
import ChatButton from "./components/Chat/Chat";
import { Providers } from "./GlobalRedux/provider";
import Footer from "./components/Footer/Footer";

export const metadata: Metadata = {
  title: "Tatti Shef - Кейтеринг в Алуште | Заказать кейтеринг | Доставка блюд",
  description: "Кейтеринг в Алуште от Tatti Shef - свежие и вкусные блюда для любого мероприятия. Доставка, обслуживание, широкий выбор готовых блюд.",
  keywords: "кейтеринг, доставка блюд, заказ еды, банкеты, корпоративы, праздники, Алушта, Tatti Shef"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
      <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <meta name="theme-color" content="#1f1d1d" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="description" content={metadata.description || ''} />
        <meta
          name="keywords"
          content="кейтеринг, фуршет, банкеты, праздники, корпоративы, заказ еды, доставка блюд, выездное обслуживание, выездной банкет, Алушта, Крым, Tatti Shef"
        />
        <meta name="yandex-verification" content="8f2be03681053015" />
        <meta name="google-site-verification" content="942SaSNCLpYbSFGQhcQ9-Gjd8kgAdnDntoFRCTpjcmU" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tatti-shef.ru" />
        <meta property="og:title" content="Tatti Shef - Алушта" />
        <meta property="og:description" content="Кейтеринг в Алуште от Tatti Shef - свежие и вкусные блюда для любого мероприятия." />
        <meta property="og:image" content="https://tatti-shef.ru/image.webp" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tatti-shef.ru" />
        <meta property="twitter:title" content="Tatti Shef - Алушта" />
        <meta property="twitter:description" content="Кейтеринг в Алуште от Tatti Shef - свежие и вкусные блюда для любого мероприятия." />
        <meta property="twitter:image" content="https://tatti-shef.ru/image.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=IM+Fell+Double+Pica:ital@0;1&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body
      >
        <Providers>
          <PrimeReactProvider>
            <Header />
            {children}
            <Footer />
          </PrimeReactProvider>
        </Providers>
        <ChatButton />
        <script id="pixel-chaty" async src="https://cdn.chaty.app/pixel.js?id=njyZmWFm"></script>
      </body>
    </html>
  );
}
