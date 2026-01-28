/**
 * Schema.org TraditionalChineseMedicineClinic 마크업 생성
 * SEO 최적화를 위한 구조화된 데이터
 */
export function getSchemaMarkup() {
    return {
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "additionalType": "TraditionalChineseMedicineClinic",
        "name": "소생한의원",
        "description": "전북특별자치도 군산시 수송동에 위치한 소생한의원입니다. 미국 초음파사(RMSK) 자격을 보유한 양경욱 원장이 정밀한 진단과 따뜻한 치료를 제공합니다.",
        "url": "https://sosang-hospital.com",
        "telephone": "063-463-7588",
        "logo": "https://sosang-hospital.com/images/gold_logo.png",
        "image": "https://sosang-hospital.com/images/lobby_main.jpg",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "KR",
            "addressLocality": "군산시",
            "addressRegion": "전북특별자치도",
            "postalCode": "54091",
            "streetAddress": "수송북로 7, 기업은행 건물 4층"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "35.9678",
            "longitude": "126.7119"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:30",
                "closes": "19:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:30",
                "closes": "13:00"
            }
        ],
        "employee": {
            "@type": "Physician",
            "name": "양경욱",
            "description": "원광대학교 한의과대학 졸업. 미국 초음파사 APCA RMSK 자격증 보유. 추나의학 전문가.",
            "award": "미국 초음파사 APCA RMSK (Registered in Musculoskeletal sonography) 자격 취득"
        },
        "medicalSpecialty": ["TraditionalChineseMedicine", "Acupuncture", "ChunaManualMedicine"],
        "priceRange": "₩₩"
    };
}

export function getBlogPostingSchema(post: {
    title: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    datePublished: string;
    dateModified?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "image": post.imageUrl,
        "datePublished": post.datePublished,
        "dateModified": post.dateModified || post.datePublished,
        "author": {
            "@type": "Physician",
            "name": "양경욱",
            "url": "https://sosang-hospital.com/doctors"
        },
        "publisher": {
            "@type": "MedicalOrganization",
            "name": "소생한의원",
            "logo": {
                "@type": "ImageObject",
                "url": "https://sosang-hospital.com/images/gold_logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://sosang-hospital.com/post/${post.slug}`
        }
    };
}
