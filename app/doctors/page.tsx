import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award, Briefcase, Stethoscope, FileText } from "lucide-react";
import Image from "next/image";

export default function DoctorsPage() {
    return (
        <div className="min-h-screen pb-24">
            <MobileHeader />

            <main className="container max-w-screen-lg mx-auto px-4 py-6 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">의료진 소개</h1>
                    <p className="text-muted-foreground">
                        풍부한 임상 경험의 전문 한의사가 진료합니다
                    </p>
                </div>

                {/* 원장 정보 */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                                <img
                                    src="/images/yang_mid.jpg"
                                    alt="양경욱 원장"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div>
                                <CardTitle className="text-2xl">양경욱 원장</CardTitle>
                                <CardDescription className="text-base">
                                    원광대학교 한의과대학 졸업
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* 소개 */}
                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                원광대학교 한의과대학을 졸업한 후 다양한 임상 경험과 연구 활동을 통해 환자 맞춤형 치료를 실천해왔습니다.
                                대한한의학회, 약침학회, 피부미용학회, 척추신경추나의학회, 만수 사상체질학회 정회원으로 활동하며,
                                국내에서도 극히 소수만이 보유한 국제 자격인 <strong>미국 초음파사 APCA RMSK 자격증</strong>을 취득하여
                                보다 정밀하고 체계적인 진단과 치료를 제공합니다.
                            </p>
                        </div>

                        {/* 학력 */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <GraduationCap className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold text-lg">학력</h3>
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                                <li>• 원광대학교 한의과대학 졸업</li>
                            </ul>
                        </div>

                        {/* 자격 및 수료 */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Award className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold text-lg">자격 및 수료</h3>
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                                <li>• <strong>미국 초음파사 APCA RMSK 자격증</strong> (국내 소수 보유)</li>
                                <li>• <strong>추나의학 아카데미</strong></li>
                                <li>• Korean Society Chuna Manual Medicine for Spine & Nerves(KSCM) Membership Certification</li>
                                <li>• The Association of Muscle Adjustment Manual Medicine 수료</li>
                                <li>• 대한한의학회 정회원</li>
                                <li>• 약침학회 정회원</li>
                                <li>• 피부미용학회 정회원</li>
                                <li>• 척추신경추나의학회 정회원</li>
                                <li>• 만수 사상체질학회 정회원</li>
                            </ul>
                        </div>

                        {/* 경력 */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Briefcase className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold text-lg">주요 경력</h3>
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                                <li>• 현 소생한의원 원장</li>
                                <li>• 전 은혜한의원 원장</li>
                                <li>• 전 삼인당한의원 부원장</li>
                                <li>• 전 옥서보건지소 한방과장</li>
                            </ul>
                        </div>

                        {/* 전문 분야 */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Stethoscope className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold text-lg">전문 분야</h3>
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                                <li>• <strong>초음파</strong>를 통한 정밀 진단</li>
                                <li>• <strong>추나</strong>를 통한 척추·신경계 치료</li>
                                <li>• <strong>통증의 원인</strong>을 정확히 찾아내는 진단</li>
                                <li>• <strong>사상체질</strong> 진단을 결합한 맞춤형 치료</li>
                                <li>• 근골격계 질환 및 만성 통증 관리</li>
                                <li>• 체질 개선 및 건강 증진</li>
                            </ul>
                        </div>

                        {/* 언론 활동 */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <FileText className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold text-lg">언론 활동</h3>
                            </div>
                            <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                                <li>• 2014년 Issue Maker 12월호 칼럼 게재</li>
                                <li>• 한의학적 접근과 치료 사례 언론 취재</li>
                            </ul>
                        </div>

                        {/* 진료 철학 */}
                        <div className="p-5 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-xl border border-primary/20">
                            <h3 className="font-semibold mb-3 text-lg flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary rounded-full"></span>
                                진료 철학
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                질병의 근본적인 원인을 해결하는 데 집중하며, 환자의 체질을 정확히 구별하여 맞춤형 치료를 제공합니다.
                                단순한 증상 완화가 아닌, 삶의 질을 높이고 건강한 일상을 회복할 수 있도록 돕는 것을 목표로 합니다.
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed mt-3 italic">
                                "근본적이고 종합적인 치료를 통해 질병에서 자유로울 수 있도록 돕겠습니다."
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* 진료 시간 */}
                <Card>
                    <CardHeader>
                        <CardTitle>진료 시간</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="font-medium mb-1">평일</p>
                                <p className="text-sm text-muted-foreground">09:30 - 18:00</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">토요일</p>
                                <p className="text-sm text-muted-foreground">09:30 - 14:00</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1">일요일</p>
                                <p className="text-sm text-destructive">휴무</p>
                            </div>
                            <div>
                                <p className="font-medium mb-1 text-xs">공휴일(근무 또는 휴무)</p>
                            </div>
                            <div className="col-span-2 pt-2 border-t">
                                <p className="font-medium mb-1">점심시간</p>
                                <p className="text-sm text-muted-foreground">12:30 - 14:00</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <BottomTabBar />
        </div>
    );
}
