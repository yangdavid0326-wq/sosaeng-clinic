import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, Train, Bus, Car } from "lucide-react";

export default function LocationPage() {
    return (
        <div className="min-h-screen pb-24">
            <MobileHeader />

            <main className="container max-w-screen-lg mx-auto px-4 py-6 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">오시는 길</h1>
                    <p className="text-muted-foreground">
                        소생한의원으로 찾아오시는 길을 안내합니다
                    </p>
                </div>

                {/* 주소 정보 */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <CardTitle>주소 및 연락처</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="font-semibold mb-1">주소</p>
                            <p className="text-muted-foreground">
                                전북특별자치도 군산시 수송북로 7<br />
                                기업은행 건물 4층
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Phone className="h-4 w-4 text-primary" />
                                <p className="font-semibold">전화번호</p>
                            </div>
                            <p className="text-muted-foreground">063-463-7588</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="h-4 w-4 text-primary" />
                                <p className="font-semibold">진료 시간</p>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <p>평일: 09:30 - 19:00</p>
                                <p>토요일: 09:30 - 13:00</p>
                                <p>일요일: 휴무</p>
                                <p>공휴일: 근무 또는 휴무 (전화 문의)</p>
                                <p>점심시간: 12:30 - 14:00</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 교통 안내 */}
                <Card>
                    <CardHeader>
                        <CardTitle>교통편 안내</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* 지하철 */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Train className="h-4 w-4 text-primary" />
                                <p className="font-semibold">지하철</p>
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                                <li>• 주변 공영 주차장 및 건물 내 주차장 이용 가능</li>
                                <li>• 주차 공간 협소 시 안내 데스크 문의</li>
                            </ul>
                        </div>

                        {/* 버스 */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Bus className="h-4 w-4 text-primary" />
                                <p className="font-semibold">버스</p>
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                                <li>• 간선/지선 다양한 노선 운영</li>
                                <li>• **기업은행 사거리** 정류장 하차</li>
                            </ul>
                        </div>

                        {/* 자가용 */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Car className="h-4 w-4 text-primary" />
                                <p className="font-semibold">자가용</p>
                            </div>
                            <div className="text-sm text-muted-foreground ml-6">
                                <p className="mb-1">건물 지하 주차장 이용 가능</p>
                                <p className="text-xs">
                                    * 주차 공간이 협소하오니 대중교통 이용을 권장드립니다
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 지도 */}
                <Card>
                    <CardHeader>
                        <CardTitle>지도</CardTitle>
                        <CardDescription>
                            아래 지도를 참고하여 방문해주세요
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <p className="text-sm text-muted-foreground text-center">
                                지도 API를 연결하시면 여기에 표시됩니다<br />
                                (카카오맵 또는 네이버 지도 API)
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>

            <BottomTabBar />
        </div>
    );
}
