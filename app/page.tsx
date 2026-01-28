import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { CompactChatWidget } from "@/components/chat/compact-chat-widget";
import { DiagnosisCards } from "@/components/diagnosis-cards";
import { ServicesSlider } from "@/components/services-slider";
import { LocationSection } from "@/components/location-section";
import { DoctorIntroSection } from "@/components/doctor-intro-section";
import { ColumnSection } from "@/components/column/column-section";
import { FAQSection } from "@/components/sections/faq-section";
import { Footer } from "@/components/layout/footer";
import Image from "next/image";

export default function Home() {
    return (
        <div className="min-h-screen pb-24 bg-white">
            {/* 모바일 헤더 */}
            <MobileHeader />

            {/* 메인 컨텐츠 - 프리미엄 섹션 구조 */}
            <main className="w-full">
                {/* 히어로 섹션 - 2컬럼 레이아웃 */}
                <section className="relative overflow-hidden min-h-[600px] flex items-center">
                    {/* 배경 레이어: 로비 이미지 블러 처리 */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/lobby_main.jpg"
                            alt="소생한의원 로비"
                            fill
                            className="object-cover opacity-30 blur-[4px]"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                    </div>

                    <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10 py-16 md:py-0">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                            {/* 좌측: 슬로건 및 성함 */}
                            <div className="flex-1 text-center md:text-left space-y-6 md:space-y-8 order-2 md:order-1">
                                <div className="space-y-2">
                                    <p className="text-medical-wood font-bold tracking-[0.2em] text-sm md:text-base uppercase">
                                        Sosaeng Oriental Clinic
                                    </p>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-600">
                                        기운을 되살리는
                                    </h2>
                                    <h1 className="text-5xl md:text-7xl font-black text-medical-blue leading-tight tracking-tight">
                                        소생한의원
                                    </h1>
                                </div>
                                <div className="pt-4 flex flex-col md:flex-row items-center md:items-end gap-3 md:gap-4">
                                    <span className="text-2xl md:text-3xl font-bold text-gray-800">원장</span>
                                    <span className="text-4xl md:text-5xl font-black text-medical-wood">양경욱</span>
                                    <span className="text-lg md:text-xl text-gray-500 font-medium pb-1">입니다</span>
                                </div>
                                <div className="w-20 h-1 bg-medical-blue rounded-full mx-auto md:mx-0 mt-8"></div>
                            </div>

                            {/* 우측: 원장님 사진 */}
                            <div className="flex-1 flex justify-center md:justify-end order-1 md:order-2">
                                <div className="relative w-64 h-64 md:w-[450px] md:h-[600px]">
                                    {/* 사진 배경 장식 */}
                                    <div className="absolute -inset-4 bg-medical-blue/5 rounded-[3rem] -rotate-3 transition-transform duration-700 hover:rotate-0"></div>
                                    <div className="absolute -inset-4 border border-medical-wood/20 rounded-[3rem] rotate-3 transition-transform duration-700 hover:rotate-0"></div>

                                    <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-white">
                                        <Image
                                            src="/images/yang_main.jpg"
                                            alt="양경욱 원장"
                                            fill
                                            sizes="(max-width: 768px) 256px, 450px"
                                            className="object-cover object-top hover:scale-105 transition-transform duration-1000"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI 상담창 - 화이트 배경 */}
                <section className="bg-white py-16 md:py-20">
                    <div className="container max-w-7xl mx-auto px-6 md:px-12">
                        <CompactChatWidget />
                    </div>
                </section>

                {/* 자가진단 - 연한 그레이 배경 */}
                <section className="bg-gray-50 py-16 md:py-24">
                    <div className="container max-w-7xl mx-auto px-6 md:px-12 space-y-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground">자가진단</h2>
                            <p className="text-muted-foreground text-lg md:text-xl">
                                정확한 진단 전, 나의 상태를 가볍게 체크해보세요.
                            </p>
                        </div>
                        <DiagnosisCards />
                    </div>
                </section>

                {/* 의료진 소개 - 화이트 배경 */}
                <section className="bg-white py-16 md:py-24">
                    <div className="container max-w-7xl mx-auto px-6 md:px-12">
                        <DoctorIntroSection />
                    </div>
                </section>

                {/* 진료 과목 - 연한 그레이 배경 */}
                <section className="bg-gray-50 py-16 md:py-24">
                    <div className="container max-w-7xl mx-auto px-6 md:px-12 space-y-12">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground">진료 과목</h2>
                            <p className="text-muted-foreground text-lg md:text-xl">
                                소생한의원만의 전문적인 치료 프로그램입니다.
                            </p>
                        </div>
                        <ServicesSlider />
                    </div>
                </section>

                {/* 오시는 길 - 화이트 배경 */}
                <section className="bg-white py-16 md:py-24">
                    <div className="container max-w-7xl mx-auto px-6 md:px-12">
                        <LocationSection />
                    </div>
                </section>

                {/* 건강 칼럼 - 화이트 배경 */}
                <section className="bg-white py-16 md:py-24">
                    <div className="container max-w-7xl mx-auto px-6 md:px-12">
                        <ColumnSection />
                    </div>
                </section>

                {/* 진료 시간 안내 - 샌드 라이트 배경 */}
                <section className="bg-sand-light py-16 md:py-20">
                    <div className="container max-w-7xl mx-auto px-6 md:px-12">
                        <div className="bg-white rounded-3xl p-10 md:p-14 shadow-premium border border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                                <div className="space-y-5">
                                    <h2 className="text-3xl md:text-4xl font-black flex items-center gap-4">
                                        <span className="w-2 h-10 bg-primary rounded-full"></span>
                                        진료 시간 안내
                                    </h2>
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        점심시간에도 상담 예약이 가능합니다.<br />
                                        평일 및 토요일 모두 09:30 진료 시작합니다.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-x-10 gap-y-6 flex-grow max-w-md">
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-primary uppercase tracking-wider">Weekday</p>
                                        <p className="text-xl font-bold">09:30 - 18:00</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-accent uppercase tracking-wider">Saturday</p>
                                        <p className="text-xl font-bold">09:30 - 14:00</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lunch</p>
                                        <p className="text-xl font-bold">12:30 - 14:00</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-xs font-bold text-destructive/80 uppercase tracking-wider">Holiday</p>
                                        <p className="text-xl font-bold text-destructive/70 text-sm">일요일 휴무 / 공휴일(근무 또는 휴무)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ 섹션 */}
                <FAQSection />

                {/* 푸터 */}
                <Footer />
            </main>

            {/* 하단 Sticky 탭바 */}
            <BottomTabBar />
        </div>
    );
}
