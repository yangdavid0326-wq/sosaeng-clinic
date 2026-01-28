'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Menu } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                {/* 로고 */}
                <Link href="/" className="flex items-center">
                    <div className="relative w-32 h-10">
                        <Image
                            src="/images/gold_logo.png"
                            alt="소생한의원 로고"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* 데스크톱 네비게이션 */}
                <nav className="hidden md:flex items-center space-x-6">
                    <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary">
                        진료 안내
                    </Link>
                    <Link href="/doctors" className="text-sm font-medium transition-colors hover:text-primary">
                        의료진 소개
                    </Link>
                    <Link href="/reviews" className="text-sm font-medium transition-colors hover:text-primary">
                        치료 후기
                    </Link>
                    <Link href="/location" className="text-sm font-medium transition-colors hover:text-primary">
                        오시는 길
                    </Link>
                </nav>

                {/* 우측 버튼 */}
                <div className="flex items-center space-x-4">
                    <Link href="/auth/login">
                        <Button variant="outline" size="sm" className="hidden md:inline-flex">
                            로그인
                        </Button>
                    </Link>

                    {/* 모바일 메뉴 버튼 */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* 모바일 메뉴 */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t">
                    <nav className="container py-4 flex flex-col space-y-3">
                        <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary">
                            진료 안내
                        </Link>
                        <Link href="/doctors" className="text-sm font-medium transition-colors hover:text-primary">
                            의료진 소개
                        </Link>
                        <Link href="/reviews" className="text-sm font-medium transition-colors hover:text-primary">
                            치료 후기
                        </Link>
                        <Link href="/location" className="text-sm font-medium transition-colors hover:text-primary">
                            오시는 길
                        </Link>
                        <Link href="/auth/login">
                            <Button variant="outline" size="sm" className="w-full">
                                로그인
                            </Button>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
