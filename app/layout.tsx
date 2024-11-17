import type { Metadata } from "next";
import "@/ui/globals.css";

export const metadata: Metadata = {
  title: "Staff Editor",
  description: "A simple app that allows users to place notes on a staff.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`text-dark antialiased`}>
        {children}
      </body>
    </html>
  );
}