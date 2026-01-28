import type { Metadata } from "next";
import "./globals.css";
import { getSchemaMarkup } from "@/lib/schema-markup";

const pretendard = {
    variable: "--font-pretendard",
};


export const metadata: Metadata = {
    title: "소생한의원 | 건강한 삶의 시작",
    description: "소생한의원은 전통 한의학과 현대 의료 기술을 접목하여 환자분들의 건강을 책임집니다. AI 상담 시스템으로 편리하게 진료 상담을 받아보세요.",
    keywords: ["한의원", "소생한의원", "한방 치료", "침술", "한약", "추나요법"],
    openGraph: {
        title: "소생한의원 | 건강한 삶의 시작",
        description: "전통 한의학과 현대 의료 기술을 접목한 소생한의원",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const schemaMarkup = getSchemaMarkup();

    return (
        <html lang="ko" className="font-sans">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
                />
            </head>
            <body className="font-sans antialiased">
                {children}
            </body>
        </html>
    );
}
