'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function MobileHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isColumnOpen, setIsColumnOpen] = useState(false);
    const [isDiagnosisOpen, setIsDiagnosisOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
                router.refresh();
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase, router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsMenuOpen(false);
        router.refresh();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between">
                {/* 햄버거 메뉴 - 좌측 */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(true)}
                    aria-label="메뉴 열기"
                >
                    <Menu className="h-6 w-6" />
                </Button>

                {/* 로고 - 중앙 */}
                <Link href="/" className="flex items-center group transition-transform active:scale-95">
                    <div className="relative w-28 h-8 md:w-32 md:h-10">
                        <Image
                            src="/images/gold_logo.png"
                            alt="소생한의원 로고"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* 계정/로그인 버튼 - 우측 */}
                {user ? (
                    <Link href="/admin" className="flex items-center">
                        <Button variant="ghost" size="sm" className="font-bold text-primary flex items-center gap-1">
                            <User className="h-4 w-4" />
                            관리
                        </Button>
                    </Link>
                ) : (
                    <Link href="/admin/login" className="flex items-center">
                        <Button variant="ghost" size="sm" className="font-bold text-muted-foreground hover:text-primary transition-colors">
                            로그인
                        </Button>
                    </Link>
                )}
            </div>

            {/* 햄버거 메뉴 Drawer */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetContent side="left" className="w-[280px]">
                    <SheetHeader>
                        <SheetTitle className="flex items-center justify-center py-2">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="relative w-32 h-10 block cursor-pointer">
                                <Image
                                    src="/images/gold_logo.png"
                                    alt="소생한의원 로고"
                                    fill
                                    className="object-contain"
                                />
                            </Link>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col h-full overflow-y-auto pb-6">
                        <nav className="mt-8 flex flex-col space-y-6 flex-1 px-2">
                            <Link
                                href="/doctors"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-xl font-medium transition-colors hover:text-primary"
                            >
                                의료진 소개
                            </Link>
                            <Link
                                href="/services"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-xl font-medium transition-colors hover:text-primary"
                            >
                                진료 안내
                            </Link>
                            <Link
                                href="/location"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-xl font-medium transition-colors hover:text-primary"
                            >
                                오시는 길
                            </Link>
                            <div className="flex flex-col space-y-3">
                                <button
                                    onClick={() => setIsColumnOpen(!isColumnOpen)}
                                    className="flex items-center justify-between text-xl font-medium transition-colors hover:text-primary text-left"
                                >
                                    건강 칼럼
                                    <span className="text-sm text-gray-400">{isColumnOpen ? '▲' : '▼'}</span>
                                </button>
                                {isColumnOpen && (
                                    <div className="flex flex-col pl-4 space-y-3 border-l-2 border-gray-100 mt-3">
                                        <Link
                                            href="/columns"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base font-medium text-gray-500 transition-colors hover:text-primary"
                                        >
                                            전체
                                        </Link>
                                        {["초음파 진단", "사상체질", "다이어트", "추나 요법", "교통사고", "한약"].map((category) => (
                                            <Link
                                                key={category}
                                                href={`/columns?category=${encodeURIComponent(category)}`}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="text-base font-medium text-gray-500 transition-colors hover:text-primary"
                                            >
                                                {category}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* 자가진단 메뉴 */}
                            <div className="flex flex-col space-y-3">
                                <button
                                    onClick={() => setIsDiagnosisOpen(!isDiagnosisOpen)}
                                    className="flex items-center justify-between text-xl font-medium transition-colors hover:text-primary text-left"
                                >
                                    자가진단
                                    <span className="text-sm text-gray-400">{isDiagnosisOpen ? '▲' : '▼'}</span>
                                </button>
                                {isDiagnosisOpen && (
                                    <div className="flex flex-col pl-4 space-y-3 border-l-2 border-gray-100 mt-3">
                                        <Link
                                            href="/sasang-diagnosis"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base font-medium text-gray-500 transition-colors hover:text-primary"
                                        >
                                            사상체질 자가진단
                                        </Link>
                                        <Link
                                            href="/musculoskeletal-diagnosis"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base font-medium text-gray-500 transition-colors hover:text-primary"
                                        >
                                            근골격계 정밀 분석
                                        </Link>
                                        <Link
                                            href="/diet-diagnosis"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base font-medium text-gray-500 transition-colors hover:text-primary"
                                        >
                                            다이어트 유형 진단
                                        </Link>
                                        <Link
                                            href="/growth-simulator"
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base font-medium text-gray-500 transition-colors hover:text-primary"
                                        >
                                            소아 성장 예측
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* 하단 관리자 메뉴 */}
                        <div className="pt-6 mt-12 flex justify-end space-x-4 border-t border-gray-100">
                            {user ? (
                                <>
                                    <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="text-xs text-gray-400 hover:text-gray-600">
                                        관리자 페이지
                                    </Link>
                                    <button onClick={handleLogout} className="text-xs text-gray-400 hover:text-gray-600">
                                        로그아웃
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/admin/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-xs text-gray-400 hover:text-gray-600"
                                >
                                    로그인
                                </Link>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
}
