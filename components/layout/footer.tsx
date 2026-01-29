import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 한의원 정보 */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">소생한의원</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                            전통 한의학과 현대 의료 기술을 접목한 한의원
                        </p>
                        <p className="text-sm text-muted-foreground">
                            대표자: 양경욱<br />
                            사업자등록번호: 401-91-07825
                        </p>
                    </div>

                    {/* 연락처 */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">연락처</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                            전화: 063-467-7510
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                            주소: 전북 군산시 수송북로 7 k빌딩 4층 소생한의원(기업은행 4층)
                        </p>
                        <p className="text-sm text-muted-foreground">
                            진료시간: 평일 9:30~19:00 / 토요일 9:30~13:00 / 공휴일 근무 또는 휴무로 변동 / 일요일 휴무
                        </p>
                    </div>

                    {/* 링크 */}
                    <div>
                        <h3 className="font-bold text-lg mb-4">바로가기</h3>
                        <div className="flex flex-col space-y-2">
                            <Link href="/privacy-policy" className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors">
                                개인정보처리방침
                            </Link>
                            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                이용약관
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; 2026 소생한의원. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
