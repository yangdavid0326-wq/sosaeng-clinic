/**
 * 소생한의원 진료 과목 지식 베이스
 */

export const KNOWLEDGE_BASE = {
    // 초음파 진단
    ultrasound: {
        title: "초음파 진단",
        description: "미국 초음파사 APCA RMSK 자격을 보유한 원장님의 정밀 진단",
        features: [
            "근골격계 초음파 검사",
            "통증의 정확한 원인 파악",
            "실시간 영상으로 병변 확인",
            "비침습적이고 안전한 검사"
        ],
        conditions: [
            "목/어깨 통증",
            "허리 통증",
            "관절 통증",
            "근육 및 인대 손상"
        ]
    },

    // 추나 치료
    chuna: {
        title: "추나 치료",
        description: "추나의학 아카데미 이수, 척추와 관절의 균형을 바로잡는 치료",
        features: [
            "척추 교정 및 정렬",
            "관절 가동범위 개선",
            "근육 긴장 완화",
            "자세 교정"
        ],
        conditions: [
            "척추측만증",
            "거북목",
            "일자목",
            "골반 불균형",
            "디스크 질환"
        ]
    },

    // 사상체질 치료
    sasang: {
        title: "사상체질 맞춤 치료",
        description: "개인의 체질에 맞는 맞춤형 한의학 치료",
        types: [
            {
                name: "태양인",
                characteristics: "폐 기능이 강하고 간 기능이 약함",
                treatment: "간 기능 보강, 폐 기능 조절"
            },
            {
                name: "태음인",
                characteristics: "간 기능이 강하고 폐 기능이 약함",
                treatment: "폐 기능 강화, 간 기능 조절"
            },
            {
                name: "소양인",
                characteristics: "비장 기능이 강하고 신장 기능이 약함",
                treatment: "신장 기능 보강, 비장 기능 조절"
            },
            {
                name: "소음인",
                characteristics: "신장 기능이 강하고 비장 기능이 약함",
                treatment: "비장 기능 강화, 신장 기능 조절"
            }
        ],
        benefits: [
            "체질에 맞는 한약 처방",
            "개인별 맞춤 식이요법",
            "생활습관 개선 지도"
        ]
    },

    // 교통사고 후유증
    accident: {
        title: "교통사고 후유증 치료",
        description: "사고 후 나타나는 다양한 증상의 조기 치료",
        symptoms: [
            "목 통증 및 뻣뻣함 (경추 염좌)",
            "허리 통증",
            "두통 및 어지러움",
            "팔·다리 저림",
            "근육 긴장 및 통증"
        ],
        treatments: [
            "초음파를 통한 정밀 진단",
            "추나 치료로 척추 교정",
            "침 치료로 통증 완화",
            "한약 처방으로 회복 촉진"
        ],
        importance: "교통사고 후유증은 조기 치료가 매우 중요합니다. 사고 직후에는 증상이 없다가 시간이 지나면서 나타날 수 있으므로, 빠른 시일 내에 검진을 받으시는 것을 권장드립니다."
    },

    // 척추/신경계 질환
    spine: {
        title: "척추·신경계 질환",
        description: "척추와 신경계 문제로 인한 통증 및 불편함 치료",
        conditions: [
            "디스크 (추간판 탈출증)",
            "척추관 협착증",
            "좌골신경통",
            "오십견",
            "손목터널증후군"
        ],
        approach: [
            "초음파 정밀 진단",
            "추나 치료",
            "침 치료",
            "약침 치료",
            "한약 처방"
        ]
    }
};

/**
 * 진료 시간 정보
 */
export const CLINIC_INFO = {
    hours: {
        weekday: "09:00 - 18:00",
        saturday: "09:00 - 14:00",
        closed: "일요일, 공휴일"
    },
    address: "전북특별자치도 군산시 수송북로 7 (현대아파트 사거리 인근)",
    phone: "063-463-7588",
    reservationUrl: "https://booking.naver.com/booking/13/bizes/918828"
};
