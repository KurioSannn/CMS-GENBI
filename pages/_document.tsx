import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id" className="scroll-smooth">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Plus Jakarta Sans & Newsreader (Editorial Serif Italic) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500;1,6..72,600;1,6..72,700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased font-sans bg-[#F8FAFC] text-slate-900 selection:bg-sky-500 selection:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
