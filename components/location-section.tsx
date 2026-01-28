'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Navigation, Phone, ExternalLink } from "lucide-react";
import Image from "next/image";

/**
 * 전북특별자치도 군산시 수송북로 7 (수송동 소생한의원)
 * 무한 로딩 원천 차단을 위해 로딩 오버레이를 제거한 최종 안정 버전
 */
export function LocationSection() {
    const handleDirections = () => {
        window.open('https://map.naver.com/v5/directions/-/군산시 수송북로 7/13266589', '_blank');
    };

    const handleCall = () => {
        window.location.href = 'tel:063-463-7588';
    };

    const handleOpenPlace = () => {
        window.open('https://map.naver.com/p/entry/place/13266589', '_blank');
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h2 className="text-3xl md:text-4xl font-bold">오시는 길</h2>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleOpenPlace}
                    className="text-primary font-bold text-xs hover:bg-gray-50 transition-colors"
                >
                    큰 지도로 보기 <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
            </div>

            <div className="relative w-full aspect-[16/11] md:aspect-video rounded-2xl overflow-hidden border-0 shadow-card bg-gray-50">

                {/* 네이버 지도 Iframe */}
                <div className="absolute inset-0">
                    <iframe
                        src="https://map.naver.com/p/entry/place/13266589?c=15.00,0,0,0,dh"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Sosaeng Map"
                    ></iframe>
                </div>

                {/* 왼쪽 가리개 - 완전 불투명 흰색 박스 */}
                <div className="absolute top-0 left-0 bottom-0 w-[450px] md:w-[480px] bg-white z-40"></div>

                {/* 브랜드 오버레이 카드 */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10 z-50 w-[340px] md:w-[400px]">
                    <Card className="bg-white border border-[#B8860B]/30 shadow-2xl p-6 md:p-8 rounded-[2rem] shadow-[#B8860B]/20 transform transition-all duration-500 hover:scale-[1.02]">
                        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-[#B8860B]/10">
                            <div className="relative w-14 h-14 bg-[#154334] rounded-xl flex items-center justify-center border border-[#B8860B]/30 overflow-hidden shadow-inner shrink-0 text-white font-bold text-2xl">
                                소
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-xl md:text-2xl font-black text-[#154334] leading-tight">소생한의원</h3>
                                <p className="text-[10px] text-[#B8860B] font-bold tracking-[0.2em] uppercase">Sosaeng Medical</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-[#B8860B] mt-0.5 shrink-0" />
                                <div className="space-y-1.5 text-sm">
                                    <div className="flex justify-between gap-8">
                                        <span className="font-bold text-[#154334]">평 일</span>
                                        <span className="text-muted-foreground font-medium">09:30 - 19:00</span>
                                    </div>
                                    <div className="flex justify-between gap-8">
                                        <span className="font-bold text-[#154334]">토요일</span>
                                        <span className="text-muted-foreground font-medium">09:30 - 13:00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#B8860B] mt-0.5 shrink-0" />
                                <div className="text-sm font-semibold text-[#154334] leading-relaxed">
                                    전북특별자치도 군산시 수송북로 7
                                    <p className="text-xs text-muted-foreground font-medium mt-1">기업은행 건물 4층</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button onClick={handleCall} variant="outline" className="h-12 border-2 border-[#B8860B]/30 text-[#B8860B] font-bold text-sm rounded-xl hover:bg-[#B8860B]/5 transition-colors">
                                <Phone className="w-4 h-4 mr-1.5" /> 전화문의
                            </Button>
                            <Button onClick={handleDirections} className="h-12 bg-[#154334] hover:bg-[#0a271e] text-white font-bold text-sm rounded-xl gap-1.5 shadow-md active:scale-95 transition-all">
                                <Navigation className="w-4 h-4 fill-current" /> 길찾기
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border-2 border-[#B8860B]/10 rounded-[2rem] p-6 shadow-sm">
                    <h4 className="font-bold text-[#154334] text-sm mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#B8860B]" /> 주차 정보
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">건물 뒤편 전용 주차장 및 주변 공영 주차장 이용이 가능합니다.</p>
                </div>
                <div className="bg-[#154334]/5 border-2 border-[#154334]/10 rounded-[2rem] p-6 shadow-sm">
                    <h4 className="font-bold text-[#154334] text-sm mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#154334]" /> 대중교통
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                        <strong className="text-[#154334]">기업은행 사거리</strong> 정류장 하차<br />
                        • 수송동전북은행방면 정류장<br />
                        • 수송동현대아파트방면 정류장
                    </p>
                </div>
            </div>
        </div>
    );
}
