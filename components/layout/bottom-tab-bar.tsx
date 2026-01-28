'use client'

import { Phone, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BottomTabBar() {
    const handleCall = () => {
        window.location.href = 'tel:063-463-7588';
    };

    const handleReservation = () => {
        // 네이버 예약 페이지로 이동
        window.open('https://booking.naver.com/booking/13/bizes/918828', '_blank');
    };

    const handleLocation = () => {
        // 네이버 지도 군산 소생한의원 위치로 이동
        window.open('https://map.naver.com/v5/entry/address/35.967885,126.711554', '_blank');
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] rounded-[2rem] overflow-hidden">
                <div className="grid grid-cols-3 gap-1 p-2">
                    {/* 전화 버튼 */}
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1.5 h-auto py-3 rounded-2xl hover:bg-primary/5 transition-all group active:scale-95"
                        onClick={handleCall}
                    >
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-primary/10">
                            <Phone className="h-5 w-5 stroke-[2] text-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-[10px] font-black text-foreground/70 group-hover:text-primary tracking-tight">전화상담</span>
                    </Button>

                    {/* 예약 버튼 */}
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1.5 h-auto py-3 rounded-2xl hover:bg-primary/5 transition-all group active:scale-95"
                        onClick={handleReservation}
                    >
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm shadow-primary/20">
                            <Calendar className="h-5 w-5 stroke-[2] text-white" />
                        </div>
                        <span className="text-[10px] font-black text-primary tracking-tight">네이버 예약</span>
                    </Button>

                    {/* 위치 버튼 */}
                    <Button
                        variant="ghost"
                        className="flex flex-col items-center gap-1.5 h-auto py-3 rounded-2xl hover:bg-primary/5 transition-all group active:scale-95"
                        onClick={handleLocation}
                    >
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center transition-colors group-hover:bg-primary/10">
                            <MapPin className="h-5 w-5 stroke-[2] text-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-[10px] font-black text-foreground/70 group-hover:text-primary tracking-tight">오시는길</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
