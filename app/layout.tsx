import FooterPanel from "../components/layout/footer-panel";
import HeaderPanel from "../components/layout/header-panel";
import "./globals.css"
import { Metadata } from "next";

export const metadata: Metadata = {
    
    metadataBase: new URL(
        "https://hear-me-out.depression-anxiety-assessment.com"
    ),

  title: "Hear Me Out",
  description:
    "Hear Me Out is a student-centered platform designed to support emotional well-being through anonymous confessions, private reflection, and safe self-expression.",
  keywords: [
    "mental health",
    "student wellbeing",
    "anonymous confessions",
    "self expression",
    "journaling",
    "mind space",
    "UNITEN",
    "hear me out"
  ],
  authors: [
    {
        name: "Putra"
    },
    {
        name: "Mila"
    },
    {
        name: "Fahmi"
    },
    {
        name: "Tasnim"
    }
  ],
  
    openGraph: {
        title: "Hear Me Out",
        description:
          "A safe place for students to share thoughts, reflect privately, and feel heard.",
        siteName: "Hear Me Out",
        type: "website",
        url: "/",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Hear Me Out"
            }
        ]
    }

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