import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DopaShop ✨ | Simulador de Compras de Dopamina",
  description: "Gaste bilhões fictícios, sinta a emoção do consumo sem gastar um centavo real! Terapia de compras da Coreia do Sul.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased dark scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-fuchsia-500 selection:text-white font-sans overflow-x-hidden w-full">
        {children}
      </body>
    </html>
  );
}
