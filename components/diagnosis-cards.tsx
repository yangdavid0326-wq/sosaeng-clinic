'use client'

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Scale, Activity, Baby } from "lucide-react";

export function DiagnosisCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 사상체질 자가진단 */}
            <Link href="/sasang-diagnosis">
                <Card className="cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] rounded-3xl shadow-premium border-0 bg-white h-full group">
                    <CardHeader>
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/20">
                            <User className="h-7 w-7 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-black">사상체질 자가진단</CardTitle>
                        <CardDescription className="text-base text-muted-foreground/80">
                            나의 체질을 확인하고 맞춤 건강 정보를 받아보세요
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full h-12 border-0 bg-gray-50 text-foreground font-bold hover:bg-primary hover:text-white transition-all rounded-xl">
                            진단 시작하기
                        </Button>
                    </CardContent>
                </Card>
            </Link>

            {/* 근골격계 정밀 분석 */}
            <Link href="/musculoskeletal-diagnosis">
                <Card className="cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] rounded-3xl shadow-premium border-0 bg-white h-full group">
                    <CardHeader>
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:bg-blue-100">
                            <Activity className="h-7 w-7 text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl font-black">근골격계 정밀 분석</CardTitle>
                        <CardDescription className="text-base text-muted-foreground/80">
                            통증의 원인을 정확히 파악하고 맞춤 치료를 받아보세요
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full h-12 border-0 bg-gray-50 text-foreground font-bold hover:bg-blue-600 hover:text-white transition-all rounded-xl">
                            진단 시작하기
                        </Button>
                    </CardContent>
                </Card>
            </Link>

            {/* 다이어트 유형 진단 */}
            <Link href="/diet-diagnosis">
                <Card className="cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] rounded-3xl shadow-premium border-0 bg-white h-full group">
                    <CardHeader>
                        <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:bg-purple-100">
                            <Scale className="h-7 w-7 text-purple-600" />
                        </div>
                        <CardTitle className="text-2xl font-black">다이어트 유형 진단</CardTitle>
                        <CardDescription className="text-base text-muted-foreground/80">
                            당신의 맞춤형 다이어트 유형을 분석해드립니다
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full h-12 border-0 bg-gray-50 text-foreground font-bold hover:bg-purple-600 hover:text-white transition-all rounded-xl">
                            진단 시작하기
                        </Button>
                    </CardContent>
                </Card>
            </Link>

            {/* 소아 성장 예측 */}
            <Link href="/growth-simulator">
                <Card className="cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] rounded-3xl shadow-premium border-0 bg-white h-full group">
                    <CardHeader>
                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:bg-amber-100">
                            <Baby className="h-7 w-7 text-amber-600" />
                        </div>
                        <CardTitle className="text-2xl font-black">소아 성장 예측</CardTitle>
                        <CardDescription className="text-base text-muted-foreground/80">
                            우리 아이의 성장 가능성을 확인해보세요
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full h-12 border-0 bg-gray-50 text-foreground font-bold hover:bg-amber-600 hover:text-white transition-all rounded-xl">
                            예측 시작하기
                        </Button>
                    </CardContent>
                </Card>
            </Link>
        </div>
    );
}
