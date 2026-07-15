import FooterPanel from "../components/layout/footer-panel";
import HeaderPanel from "../components/layout/header-panel";
import "./globals.css"
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
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
            </head>
            <body>
                <HeaderPanel/>
                {children}
                <FooterPanel/>
            </body>
        </html>
    );
}