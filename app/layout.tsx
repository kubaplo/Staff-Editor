import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/ui/globals.css";

const inter = Inter({
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Staff Editor",
	description: "A simple app that allows users to place notes on a staff.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={`${inter.className} text-dark antialiased`}>
				{children}
			</body>
		</html>
	);
}
