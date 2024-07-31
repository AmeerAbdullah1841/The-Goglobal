import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const raleway = Lato({
  weight: ["400"],
  style: "normal",
  subsets: ["latin"]
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