import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header/Header";
import ChatButton from "./components/Chat/Chat";
import { Providers } from "./GlobalRedux/provider";

export const metadata: Metadata = {
  title: "Tatti shef - Алушта",
  description: "Тестовый режим",
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
        <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=IM+Fell+Double+Pica:ital,wght@0,400;1,400&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body
        
      >
        <Providers>
          <Header />
          {children}
        </Providers>
        <ChatButton />
        <script id="pixel-chaty" async src="https://cdn.chaty.app/pixel.js?id=njyZmWFm"></script>
      </body>
    </html>
  );
}
