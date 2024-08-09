import type { Metadata } from "next";
import localFonts from "@next/font/local";
import "./globals.css";

const raleway = localFonts({
  src: [
    {
      path: "../public/fonts/GianeGothicsansRegular.otf",
      weight: "400",
    },
  ],
});

export const metadata: Metadata = {
  title: "GoGlobal"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        {children}
      </body>
    </html>
  );
}