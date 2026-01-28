import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white py-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="border-b pb-6">
                    <h1 className="text-3xl font-bold text-gray-900">개인정보 처리방침</h1>
                    <p className="mt-2 text-gray-500">시행일자: 2024년 1월 1일</p>
                </div>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">1. 개인정보의 수집 및 이용 목적</h2>
                    <p className="text-gray-700 leading-relaxed">
                        소생한의원은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>진료 예약 및 상담 서비스 제공</li>
                        <li>AI 건강 진단 및 맞춤형 건강 정보 제공</li>
                        <li>진행 상황 통보 및 결과 전달</li>
                        <li>본인 확인 및 불만 처리 등 민원 처리</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">2. 수집하는 개인정보의 항목</h2>
                    <p className="text-gray-700 leading-relaxed">
                        회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집하고 있습니다.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>필수 항목: 성명, 휴대전화번호, 성별, 나이, 증상 내용</li>
                        <li>수집 방법: 홈페이지 내 상담 및 진단 폼, AI 채팅 서비스</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">3. 개인정보의 보유 및 이용 기간</h2>
                    <p className="text-gray-700 leading-relaxed">
                        소생한의원은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>진료 및 상담 관련 기록: 의료법 등 관련 법령에 따른 기간</li>
                        <li>홈페이지 서비스 이용 기록: 3년</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">4. 정보주체와 법정대리인의 권리·의무 및 그 행사방법</h2>
                    <p className="text-gray-700 leading-relaxed">
                        정보주체는 소생한의원에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900">5. 개인정보의 안전성 확보 조치</h2>
                    <p className="text-gray-700 leading-relaxed">
                        소생한의원은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>개인정보의 암호화 및 안전한 저장</li>
                        <li>해킹 등에 대비한 기술적 대책</li>
                        <li>개인정보 취급 직원의 최소화 및 교육</li>
                    </ul>
                </section>

                <div className="pt-10 border-t flex justify-center">
                    <Link href="/">
                        <button className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                            홈으로 돌아가기
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
