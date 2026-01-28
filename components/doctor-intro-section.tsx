import { Card, CardContent } from "@/components/ui/card";
import { Award, Briefcase, Stethoscope } from "lucide-react";
import Image from "next/image";

/**
 * 메인 페이지용 의료진 소개 섹션 - 프리미엄 메디컬 브랜딩
 */
export function DoctorIntroSection() {
    return (
        <section className="space-y-8">
            <div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground">의료진 소개</h2>
                <p className="text-muted-foreground text-lg md:text-xl">
                    풍부한 임상 경험과 전문성으로 환자분들의 건강을 책임집니다
                </p>
            </div>

            <Card className="overflow-hidden bg-white border-0 shadow-premium rounded-3xl">
                <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* 원장님 사진 */}
                        <div className="relative h-[500px] md:h-full overflow-hidden bg-gray-100">
                            <Image
                                src="/images/yang_mid.jpg"
                                alt="양경욱 원장"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* 원장님 정보 */}
                        <div className="p-8 md:p-12 space-y-8">
                            {/* 헤더 */}
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-primary uppercase tracking-wider">
                                    Director
                                </p>
                                <h3 className="text-4xl md:text-5xl font-black">양경욱 원장</h3>
                                <p className="text-muted-foreground text-lg">원광대학교 한의과대학 졸업</p>
                            </div>

                            {/* Professional Credentials 배지 - 골드 엠블럼 UI */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* RMSK 자격증 배지 (골드 엠블럼) */}
                                <div className="relative overflow-hidden rounded-[2rem] bg-[#0F2C23] p-1 shadow-2xl group border border-[#B8860B]/30 hover:border-[#B8860B] transition-colors duration-500">
                                    <div className="absolute inset-0 bg-[#B8860B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="bg-[#0F2C23] rounded-[1.8rem] p-5 relative z-10 h-full flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#B8860B] to-[#8B4513] p-[2px] shadow-lg shrink-0">
                                            <div className="w-full h-full rounded-full bg-[#0F2C23] flex items-center justify-center border border-[#B8860B]/50">
                                                <Award className="w-7 h-7 text-[#B8860B]" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[#B8860B] font-black text-lg tracking-tight leading-none mb-1">APCA RMSK</p>
                                            <p className="text-white/90 text-xs font-bold mb-1">미국 초음파사 자격증</p>
                                            <p className="text-white/50 text-[10px] tracking-wide">INTERNATIONAL CERTIFIED</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 추나의학 배지 */}
                                <div className="relative overflow-hidden rounded-[2rem] bg-[#F5F5F0] p-1 shadow-premium group border-2 border-transparent hover:border-medical-blue/20 transition-all duration-500">
                                    <div className="rounded-[1.8rem] p-5 relative z-10 h-full flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-medical-blue/10 flex items-center justify-center shrink-0">
                                            <Stethoscope className="w-7 h-7 text-medical-blue" />
                                        </div>
                                        <div>
                                            <p className="text-medical-blue font-black text-lg tracking-tight leading-none mb-1">척추신경추나</p>
                                            <p className="text-medical-wood font-bold text-xs mb-1">대한추나의학회 수료</p>
                                            <p className="text-muted-foreground/60 text-[10px] tracking-wide">SPECIALIST</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 전문 분야 */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Stethoscope className="h-6 w-6 text-primary" />
                                    <h4 className="font-black text-lg">전문 분야</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span><strong>초음파</strong> 정밀 진단</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span><strong>추나</strong> 치료</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span><strong>통증의 원인</strong> 진단</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span><strong>사상체질</strong> 맞춤 치료</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span>척추·신경계 질환</span>
                                    </div>
                                </div>
                            </div>

                            {/* 진료 철학 */}
                            <div className="p-6 bg-sand-light rounded-2xl border border-gray-100">
                                <h4 className="font-black mb-3 text-base">진료 철학</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    질병의 근본적인 원인을 해결하는 데 집중하며, 환자의 체질을 정확히 구별하여 맞춤형 치료를 제공합니다.
                                    단순한 증상 완화가 아닌, 삶의 질을 높이고 건강한 일상을 회복할 수 있도록 돕는 것을 목표로 합니다.
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="pt-2">
                                <a
                                    href="/doctors"
                                    className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors font-bold"
                                >
                                    상세 약력 보기
                                    <svg
                                        className="ml-1 h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
