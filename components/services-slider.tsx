'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Pill, Activity } from "lucide-react";
import Image from "next/image";

const services = [
    {
        icon: Stethoscope,
        image: "/images/ultrasound_machine.jpg",
        title: "초음파 진단",
        description: "정밀 초음파 기기를 통한 검사",
        details: ["연부조직 손상 확인", "실시간 염증 관찰", "정확한 약침 시술 유도"]
    },
    {
        icon: Activity,
        image: "/images/treatment_room.jpg",
        title: "추나요법",
        description: "척추와 관절의 균형 교정",
        details: ["척추 측만증 교정", "목·허리 디스크 관리", "체형 불균형 교정"]
    },
    {
        icon: Pill,
        image: "/images/herbal_medicine.png",
        title: "맞춤 한약",
        description: "개인 체질에 맞는 처방",
        details: ["체질 분석 후 처방", "소화기 질환 개선", "면역력 강화"]
    },
    {
        icon: Activity,
        image: "/images/physical_therapy.jpg",
        title: "물리치료",
        description: "체계적인 통증 케어",
        details: ["간섭파 치료", "심부 온열 요법", "근육 이완 요법"]
    },
    {
        icon: Stethoscope,
        image: "/images/pharmacopuncture.png",
        title: "약침 치료",
        description: "한약재 추출물을 경혈에 주입",
        details: ["강력한 항염증 효과", "신경통 완화", "근육통 해소"]
    },
    {
        icon: Activity,
        image: "/images/treatment_room_3.jpg",
        title: "교통사고",
        description: "후유증 없는 자동차보험 진료",
        details: ["어혈 제거", "입원실 운영(연계)", "한방 물리요법"]
    },
];

export function ServicesSlider() {
    return (
        <div className="w-full">
            {/* 모바일: 세로 스크롤, 데스크톱: 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, index) => {
                    const Icon = service.icon;
                    return (
                        <Card key={index} className="group cursor-pointer hover:shadow-premium transition-all duration-500 rounded-[2rem] shadow-premium border-0 bg-white hover:-translate-y-1 overflow-hidden">
                            <CardHeader className="pb-4">
                                {service.image ? (
                                    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 relative shadow-inner">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 bg-medical-blue/5 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:bg-medical-blue/10">
                                        <Icon className="h-8 w-8 text-medical-blue" />
                                    </div>
                                )}
                                <CardTitle className="text-2xl font-black tracking-tight text-medical-blue">{service.title}</CardTitle>
                                <CardDescription className="text-base font-bold text-muted-foreground/70">{service.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2.5 text-sm text-medical-wood font-bold">
                                    {service.details.map((detail, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-medical-wood/60 shrink-0" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
