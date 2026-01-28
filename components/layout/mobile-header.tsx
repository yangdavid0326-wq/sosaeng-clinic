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
                            <div className="relative w-32 h-10">
                                <Image
                                    src="/images/gold_logo.png"
                                    alt="소생한의원 로고"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </SheetTitle>
                    </SheetHeader>
                    <nav className="mt-8 flex flex-col space-y-4">
                        <Link
                            href="/"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-lg font-medium transition-colors hover:text-primary"
                        >
                            홈
                        </Link>
                        <Link
                            href="/services"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-lg font-medium transition-colors hover:text-primary"
                        >
                            진료 안내
                        </Link>
                        <Link
                            href="/doctors"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-lg font-medium transition-colors hover:text-primary"
                        >
                            의료진 소개
                        </Link>
                        <Link
                            href="/reviews"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-lg font-medium transition-colors hover:text-primary"
                        >
                            치료 후기
                        </Link>
                        <Link
                            href="/location"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-lg font-medium transition-colors hover:text-primary"
                        >
                            오시는 길
                        </Link>
                        <div className="pt-4 border-t space-y-2">
                            {user ? (
                                <>
                                    <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full bg-primary mb-2">관리자 페이지</Button>
                                    </Link>
                                    <Button
                                        variant="outline"
                                        className="w-full text-destructive"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        로그아웃
                                    </Button>
                                </>
                            ) : (
                                <Link
                                    href="/admin/login"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Button className="w-full">로그인</Button>
                                </Link>
                            )}
                        </div>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
}
