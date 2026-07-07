import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Hear Me Out',
  description: 'A place where people will hear you. '
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}