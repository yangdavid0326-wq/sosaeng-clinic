import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Pill, Activity } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="min-h-screen pb-24">
            <MobileHeader />

            <main className="container max-w-screen-lg mx-auto px-4 py-6 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">진료 안내</h1>
                    <p className="text-muted-foreground">
                        전문적인 한방 치료로 건강한 삶을 지원합니다
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 침술 치료 */}
                    <Card>
                        <CardHeader>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                <Stethoscope className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>침술 치료</CardTitle>
                            <CardDescription>경락을 통한 전통 침술 요법</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• 통증 완화 및 경락 순환 개선</li>
                                <li>• 근골격계 질환 개선 지원</li>
                                <li>• 스트레스 및 피로 경감</li>
                                <li>• 면역력 강화 지원</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* 한약 처방 */}
                    <Card>
                        <CardHeader>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                <Pill className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>한약 처방</CardTitle>
                            <CardDescription>개인 체질에 맞는 맞춤 한약</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• 체질 분석 후 맞춤 처방</li>
                                <li>• 소화기 질환 개선 지원</li>
                                <li>• 성장기 어린이 건강 관리</li>
                                <li>• 여성 건강 케어</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* 추나요법 */}
                    <Card>
                        <CardHeader>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                <Activity className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>추나요법</CardTitle>
                            <CardDescription>척추와 관절의 균형 교정</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• 척추 측만증 교정 지원</li>
                                <li>• 목·허리 디스크 관리</li>
                                <li>• 체형 불균형 교정</li>
                                <li>• 거북목·일자목 개선 지원</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* 물리치료 */}
                    <Card>
                        <CardHeader>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                <Activity className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>물리치료</CardTitle>
                            <CardDescription>현대 의료 장비를 통한 치료</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• 초음파 치료</li>
                                <li>• 전기 자극 치료</li>
                                <li>• 온열 치료</li>
                                <li>• 냉각 치료</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* 뜸 치료 */}
                    <Card>
                        <CardHeader>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                <Stethoscope className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>뜸 치료</CardTitle>
                            <CardDescription>전통 온열 요법</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• 혈액 순환 개선</li>
                                <li>• 냉증 완화</li>
                                <li>• 관절 통증 경감</li>
                                <li>• 소화 기능 개선 지원</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* 부항 치료 */}
                    <Card>
                        <CardHeader>
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                                <Activity className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>부항 치료</CardTitle>
                            <CardDescription>어혈 제거 및 순환 개선</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• 어혈 제거</li>
                                <li>• 근육 긴장 완화</li>
                                <li>• 노폐물 배출 촉진</li>
                                <li>• 통증 경감</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <BottomTabBar />
        </div>
    );
}
