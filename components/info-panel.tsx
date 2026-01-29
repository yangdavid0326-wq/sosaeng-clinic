import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Users, MapPin, Clock } from "lucide-react";

/**
 * 정보 패널 (우측 또는 모바일 메인)
 * 진료 안내, 의료진 소개, 오시는 길 등
 */
export function InfoPanel() {
    return (
        <div className="p-6 space-y-6">
            {/* 히어로 섹션 */}
            <div className="text-center py-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                <h1 className="text-4xl font-bold mb-4">소생한의원</h1>
                <p className="text-lg text-muted-foreground">
                    건강한 삶의 시작, 소생한의원과 함께하세요
                </p>
            </div>

            {/* 진료 안내 */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Stethoscope className="h-5 w-5" />
                        진료 안내
                    </CardTitle>
                    <CardDescription>
                        전문적인 한방 치료를 제공합니다
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div>
                        <h4 className="font-semibold mb-1">침술치료</h4>
                        <p className="text-sm text-muted-foreground">
                            전통 침술로 경락의 흐름을 개선하고 통증을 완화합니다
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">한약 처방</h4>
                        <p className="text-sm text-muted-foreground">
                            개인 체질에 맞는 한약으로 근본적인 증상 개선을 돕습니다
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-1">추나요법</h4>
                        <p className="text-sm text-muted-foreground">
                            척추와 관절의 균형을 바로잡아 통증을 경감시킵니다
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* 의료진 소개 */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        의료진 소개
                    </CardTitle>
                    <CardDescription>
                        풍부한 경험의 전문 의료진
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">원장 한의사</h4>
                            <p className="text-sm text-muted-foreground">
                                - 경희대학교 한의과대학 졸업<br />
                                - 대한한의사협회 정회원<br />
                                - 20년 이상의 임상 경험
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 진료 시간 */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        진료 시간
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium">평일</span>
                            <span className="text-muted-foreground">09:30 - 19:00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">토요일</span>
                            <span className="text-muted-foreground">09:30 - 13:00</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">일요일</span>
                            <span className="text-destructive">휴무</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-xs">공휴일(근무 또는 휴무)</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                            <span className="font-medium">점심시간</span>
                            <span className="text-muted-foreground">12:30 - 14:00</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 오시는 길 */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        오시는 길
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 text-sm">
                        <p className="font-medium">전북 군산시 수송북로 7 k빌딩 4층 소생한의원(기업은행 4층)</p>
                        <p className="text-muted-foreground">
                            버스: 원광대 한방병원 하차 도보 이동<br />
                            건물 내 주차 가능(대형 SUV 주의)
                        </p>
                        <p className="text-muted-foreground">
                            문의: 063-467-7510
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
