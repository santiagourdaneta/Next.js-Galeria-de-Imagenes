import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es" data-theme="dark">
      <Head>
        {/* Etiquetas para Facebook y WhatsApp */}
        <meta property="og:title" content="Mi Casa del Árbol Mágica" />
        <meta property="og:description" content="Una casa del árbol para niños, llena de dibujos y juegos." />
        <meta property="og:image" content="https://ejemplo.com/imagen-de-la-casa.jpg" />
        <meta property="og:url" content="https://ejemplo.com" />

        {/* Etiquetas para Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tuusuario" />
        <meta name="twitter:title" content="Mi Casa del Árbol Mágica" />
        <meta name="twitter:description" content="Una casa del árbol para niños, llena de dibujos y juegos." />
        <meta name="twitter:image" content="https://ejemplo.com/imagen-de-la-casa.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}