'use client'

import { useState } from "react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import Link from "next/link";
import { PrivacyConsent } from "@/components/ui/privacy-consent";

// 질문 데이터
const questions = [
    {
        id: 1,
        text: "당신의 전체 체형은 어떤가요?",
        answers: [
            { text: "상체 발달, 어깨 넓음", scores: { 태양인: 3, 소양인: 1, 태음인: 0, 소음인: 0 } },
            { text: "하체 발달, 엉덩이 둥함", scores: { 태양인: 0, 소양인: 0, 태음인: 3, 소음인: 1 } },
            { text: "상체가 더 발달", scores: { 태양인: 2, 소양인: 2, 태음인: 0, 소음인: 1 } },
            { text: "균형잡혀있음", scores: { 태양인: 1, 소양인: 2, 태음인: 1, 소음인: 2 } }
        ]
    },
    {
        id: 2,
        text: "얼굴 모양은 어떤가요?",
        answers: [
            { text: "사각턱, 이마 좋음", scores: { 태양인: 3, 소양인: 0, 태음인: 0, 소음인: 1 } },
            { text: "넓은 얼굴, 통통한 편", scores: { 태양인: 0, 소양인: 1, 태음인: 3, 소음인: 0 } },
            { text: "약간 길쭉한 얼굴", scores: { 태양인: 2, 소양인: 2, 태음인: 0, 소음인: 1 } },
            { text: "갸름한 얼굴", scores: { 태양인: 0, 소양인: 0, 태음인: 0, 소음인: 3 } }
        ]
    },
    {
        id: 3,
        text: "안색은 어떤가요?",
        answers: [
            { text: "희고 맑음", scores: { 태양인: 3, 소양인: 1, 태음인: 0, 소음인: 0 } },
            { text: "붉은편, 열기 많음", scores: { 태양인: 0, 소양인: 3, 태음인: 0, 소음인: 0 } },
            { text: "약간 어두운편", scores: { 태양인: 0, 소양인: 0, 태음인: 3, 소음인: 1 } },
            { text: "창백한 편", scores: { 태양인: 0, 소양인: 0, 태음인: 0, 소음인: 3 } }
        ]
    },
    {
        id: 4,
        text: "온도에 민감한 정도는?",
        answers: [
            { text: "따뜻한 것을 선호", scores: { 태양인: 0, 소양인: 0, 태음인: 2, 소음인: 3 } },
            { text: "찬 것을 선호", scores: { 태양인: 3, 소양인: 3, 태음인: 0, 소음인: 0 } },
            { text: "열이 많아 더위를 탐", scores: { 태양인: 2, 소양인: 3, 태음인: 0, 소음인: 0 } },
            { text: "추위에 약함", scores: { 태양인: 0, 소양인: 0, 태음인: 1, 소음인: 3 } }
        ]
    },
    {
        id: 5,
        text: "소화 기능은 어떤가요?",
        answers: [
            { text: "소화 잘 됨", scores: { 태양인: 1, 소양인: 3, 태음인: 3, 소음인: 0 } },
            { text: "스트레스에 약해짐", scores: { 태양인: 0, 소양인: 0, 태음인: 0, 소음인: 3 } },
            { text: "과식 후 부담스러움", scores: { 태양인: 3, 소양인: 1, 태음인: 0, 소음인: 1 } },
            { text: "보통", scores: { 태양인: 1, 소양인: 1, 태음인: 1, 소음인: 1 } }
        ]
    },
    {
        id: 6,
        text: "배변 습관은 어떤가요?",
        answers: [
            { text: "규칙적, 쾌변", scores: { 태양인: 1, 소양인: 3, 태음인: 2, 소음인: 0 } },
            { text: "변비가 있음", scores: { 태양인: 0, 소양인: 0, 태음인: 3, 소음인: 1 } },
            { text: "설사하기 쉬움", scores: { 태양인: 2, 소양인: 0, 태음인: 0, 소음인: 3 } },
            { text: "일정하지 않음", scores: { 태양인: 1, 소양인: 1, 태음인: 1, 소음인: 1 } }
        ]
    },
    {
        id: 7,
        text: "성격 및 기질은?",
        answers: [
            { text: "정의감 강함, 원칙적", scores: { 태양인: 3, 소양인: 1, 태음인: 0, 소음인: 0 } },
            { text: "사교적, 활동적", scores: { 태양인: 1, 소양인: 3, 태음인: 1, 소음인: 0 } },
            { text: "온화, 느긋한 편", scores: { 태양인: 0, 소양인: 0, 태음인: 3, 소음인: 1 } },
            { text: "예민, 신중함", scores: { 태양인: 0, 소양인: 0, 태음인: 0, 소음인: 3 } }
        ]
    },
    {
        id: 8,
        text: "활동성은 어떤가요?",
        answers: [
            { text: "활동적, 에너지 많음", scores: { 태양인: 3, 소양인: 3, 태음인: 0, 소음인: 0 } },
            { text: "안정적, 차분한 편", scores: { 태양인: 0, 소양인: 0, 태음인: 3, 소음인: 2 } },
            { text: "일정 수준 유지", scores: { 태양인: 1, 소양인: 1, 태음인: 1, 소음인: 1 } },
            { text: "피로하기 쉬움", scores: { 태양인: 0, 소양인: 0, 태음인: 0, 소음인: 3 } }
        ]
    },
    {
        id: 9,
        text: "스트레스 반응은?",
        answers: [
            { text: "화내기 쉬움", scores: { 태양인: 3, 소양인: 1, 태음인: 0, 소음인: 0 } },
            { text: "빨리 잊음", scores: { 태양인: 1, 소양인: 3, 태음인: 1, 소음인: 0 } },
            { text: "오래 앙금이 남음", scores: { 태양인: 0, 소양인: 0, 태음인: 3, 소음인: 1 } },
            { text: "불안감, 걱정함", scores: { 태양인: 0, 소양인: 0, 태음인: 0, 소음인: 3 } }
        ]
    },
    {
        id: 10,
        text: "땀 흘리는 정도는?",
        answers: [
            { text: "땀이 별로 안 남", scores: { 태양인: 3, 소양인: 1, 태음인: 0, 소음인: 0 } },
            { text: "땀이 잘 남", scores: { 태양인: 1, 소양인: 3, 태음인: 2, 소음인: 0 } },
            { text: "가슴, 상체에 땀", scores: { 태양인: 0, 소양인: 3, 태음인: 0, 소음인: 1 } },
            { text: "약간 나는 편", scores: { 태양인: 0, 소양인: 0, 태음인: 1, 소음인: 2 } }
        ]
    },
    {
        id: 11,
        text: "수면의 질은 어떤가요?",
        answers: [
            { text: "깊게 잠, 잘 자는 편", scores: { 태양인: 1, 소양인: 1, 태음인: 3, 소음인: 0 } },
            { text: "얕은 잠, 자주 깸", scores: { 태양인: 1, 소양인: 1, 태음인: 0, 소음인: 3 } },
            { text: "적당함", scores: { 태양인: 1, 소양인: 1, 태음인: 1, 소음인: 1 } },
            { text: "아침 잠이 많음", scores: { 태양인: 0, 소양인: 0, 태음인: 3, 소음인: 0 } }
        ]
    },
    {
        id: 12,
        text: "피부 상태는?",
        answers: [
            { text: "밝고 맑음", scores: { 태양인: 3, 소양인: 1, 태음인: 0, 소음인: 1 } },
            { text: "기름기 있음", scores: { 태양인: 1, 소양인: 3, 태음인: 2, 소음인: 0 } },
            { text: "건조한 편", scores: { 태양인: 2, 소양인: 0, 태음인: 0, 소음인: 3 } },
            { text: "민감한 편", scores: { 태양인: 0, 소양인: 1, 태음인: 1, 소음인: 3 } }
        ]
    },
    {
        id: 13,
        text: "손발 상태는?",
        answers: [
            { text: "따뜻하고 건조", scores: { 태양인: 3, 소양인: 2, 태음인: 0, 소음인: 0 } },
            { text: "찬 편", scores: { 태양인: 0, 소양인: 0, 태음인: 1, 소음인: 3 } },
            { text: "부으면서 무거움", scores: { 태양인: 0, 소양인: 0, 태음인: 3, 소음인: 1 } },
            { text: "보통", scores: { 태양인: 1, 소양인: 1, 태음인: 1, 소음인: 1 } }
        ]
    },
    {
        id: 14,
        text: "사교성은 어떤가요?",
        answers: [
            { text: "처음 만난 사람과도 금방 친해짐", scores: { 태양인: 1, 소양인: 3, 태음인: 1, 소음인: 0 } },
            { text: "사람 만나기 좋아함", scores: { 태양인: 2, 소양인: 3, 태음인: 0, 소음인: 0 } },
            { text: "편한 사람들과만 지냄", scores: { 태양인: 0, 소양인: 0, 태음인: 3, 소음인: 1 } },
            { text: "조용하고 내향적", scores: { 태양인: 0, 소양인: 0, 태음인: 0, 소음인: 3 } }
        ]
    },
    {
        id: 15,
        text: "식욕은 어떤가요?",
        answers: [
            { text: "적은 편", scores: { 태양인: 3, 소양인: 1, 태음인: 0, 소음인: 1 } },
            { text: "좋은 편", scores: { 태양인: 1, 소양인: 2, 태음인: 3, 소음인: 0 } },
            { text: "먹고 싶은 것이 자주 바뀜", scores: { 태양인: 1, 소양인: 2, 태음인: 1, 소음인: 1 } },
            { text: "불규칙함", scores: { 태양인: 0, 소양인: 0, 태음인: 1, 소음인: 3 } }
        ]
    }
];

// 체질 정보
const constitutionInfo = {
    태양인: {
        hangul: "太陽人",
        description: "폐가 크고 간이 작은 체질로, 신체 외부로 발산하는 기운이 강합니다.",
        characteristics: [
            "체형: 상체 발달, 어깨 넓음, 가슴 펼쳐짐",
            "얼굴: 사각턱, 이마 좋음, 희고 맑은 안색",
            "성격: 정의감 강함, 원칙적, 시비지심(공공성 중시)",
            "약점: 하체 약함, 대장기능 약함, 손발 차가움 주의",
            "추천: 신선한 해산물, 채소 중심, 가볍고 담백한 음식"
        ],
        color: "#3B82F6"
    },
    소양인: {
        hangul: "少陽人",
        description: "비가 크고 신이 작은 체질로, 상체에 열이 많고 하체가 냉한 편입니다.",
        characteristics: [
            "체형: 상체 발달, 가슴 넓음, 하체 약함",
            "얼굴: 약간 긴 얼굴, 붉은 안색, 눈 밝음",
            "성격: 사교적, 활동적, 사양지심(규칙 중시)",
            "약점: 신장 약함, 설사하기 쉬움, 대사 빠름",
            "추천: 생선, 신선 채소, 냉한 성질의 음식 추천"
        ],
        color: "#F59E0B"
    },
    태음인: {
        hangul: "太陰人",
        description: "간이 크고 폐가 작은 체질로, 소화기능이 좋고 체중이 늘기 쉽습니다.",
        characteristics: [
            "체형: 하체 발달, 엉덩이 크고 통통함, 골격 큼",
            "얼굴: 넓은 얼굴, 통통한 편, 약간 어두운 안색",
            "성격: 온화하고 느긋함, 수오지심(의리 중시)",
            "장점: 소화 잘 됨, 기력 좋음, 묵직한 체격",
            "주의: 체중 관리, 고혈압/당뇨 주의, 과식 피하기"
        ],
        color: "#10B981"
    },
    소음인: {
        hangul: "少陰人",
        description: "신이 크고 비가 작은 체질로, 소화기능이 약하고 예민한 편입니다.",
        characteristics: [
            "체형: 하체 발달, 갸름한 얼굴, 마른 편",
            "얼굴: 갸름하고 유순한 인상, 창백한 안색",
            "성격: 예민하고 신중함, 측은지심(배려심 많음)",
            "약점: 소화 약함, 추위 탐, 피로하기 쉬움",
            "추천: 따뜻한 음식, 소화 잘 되는 음식, 소량 많은 식사"
        ],
        color: "#8B5CF6"
    }
};

type Constitution = keyof typeof constitutionInfo;

export default function SasangDiagnosisPage() {
    const [screen, setScreen] = useState<'start' | 'quiz' | 'result'>('start');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [scores, setScores] = useState({ 태양인: 0, 소양인: 0, 태음인: 0, 소음인: 0 });
    const [hasAgreed, setHasAgreed] = useState(false);

    const startQuiz = () => {
        if (!hasAgreed) {
            alert("개인정보 수집 및 이용에 동의해주셔야 진단이 가능합니다.");
            return;
        }
        setScreen('quiz');
        setCurrentQuestion(0);
        setAnswers({});
        setScores({ 태양인: 0, 소양인: 0, 태음인: 0, 소음인: 0 });
    };

    const selectAnswer = (answerIndex: number) => {
        const question = questions[currentQuestion];
        const newAnswers = { ...answers };
        const newScores = { ...scores };

        // 이전 답변 점수 제거
        if (newAnswers[currentQuestion] !== undefined) {
            const prevAnswer = question.answers[newAnswers[currentQuestion]];
            Object.keys(newScores).forEach((constitution) => {
                newScores[constitution as Constitution] -= prevAnswer.scores[constitution as Constitution];
            });
        }

        // 새 답변 점수 추가
        newAnswers[currentQuestion] = answerIndex;
        const answer = question.answers[answerIndex];
        Object.keys(newScores).forEach((constitution) => {
            newScores[constitution as Constitution] += answer.scores[constitution as Constitution];
        });

        setAnswers(newAnswers);
        setScores(newScores);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setScreen('result');
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const restartQuiz = () => {
        setScreen('start');
        setCurrentQuestion(0);
        setAnswers({});
        setScores({ 태양인: 0, 소양인: 0, 태음인: 0, 소음인: 0 });
    };

    const openAppointment = () => {
        window.location.href = 'https://booking.naver.com/booking/13/bizes/918828';
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const question = questions[currentQuestion];

    // 결과 계산
    const maxScore = Math.max(...Object.values(scores));
    const result = Object.keys(scores).find(key => scores[key as Constitution] === maxScore) as Constitution;

    return (
        <div className="min-h-screen pb-24 bg-white">
            <MobileHeader />

            <main className="container max-w-screen-md mx-auto px-4 py-6">
                {/* 시작 화면 */}
                {screen === 'start' && (
                    <div className="text-center py-12 animate-fadeIn">
                        <h1 className="text-4xl font-bold mb-4 text-foreground">🧘 사상체질 자가진단</h1>
                        <p className="text-muted-foreground mb-6 text-lg">
                            정확한 진단 전, 나의 상태를 간편하게 체크해보세요.<br />
                            순서대로 진행되며 최종 결과가 나옵니다.
                        </p>
                        <div className="bg-gray-50 border-l-4 border-primary p-4 rounded-lg mb-8 text-left">
                            <p className="text-sm text-foreground">
                                💡 <strong>참고:</strong> 본 자가진단은 일반적인 사상체질 특성을 바탕으로 한 참고용 도구입니다.
                                정확한 체질 진단을 위해서는 한의원 방문하여 전문 한의사 진료를 받으시기를 권장합니다.
                            </p>
                        </div>

                        <div className="max-w-sm mx-auto mb-8 text-left">
                            <PrivacyConsent
                                checked={hasAgreed}
                                onChange={setHasAgreed}
                                id="sasang-privacy"
                            />
                        </div>
                        <button
                            onClick={startQuiz}
                            className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold text-lg transition-all shadow-md hover:shadow-lg"
                        >
                            진단 시작하기
                        </button>
                    </div>
                )}

                {/* 진단 화면 */}
                {screen === 'quiz' && (
                    <div className="py-6 animate-fadeIn">
                        {/* 진행률 바 */}
                        <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 via-amber-500 via-green-500 to-purple-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="text-sm text-muted-foreground mb-2 font-semibold">
                            질문 {currentQuestion + 1} / {questions.length}
                        </div>
                        <h2 className="text-2xl font-bold mb-6 text-foreground">{question.text}</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {question.answers.map((answer, index) => (
                                <button
                                    key={index}
                                    onClick={() => selectAnswer(index)}
                                    className={`p-4 rounded-lg border-2 transition-all min-h-[80px] flex items-center justify-center text-center font-medium ${answers[currentQuestion] === index
                                        ? 'bg-primary border-primary text-white shadow-md'
                                        : 'bg-white border-gray-200 text-foreground hover:border-primary hover:bg-gray-50'
                                        }`}
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-4 justify-end">
                            {currentQuestion > 0 && (
                                <button
                                    onClick={previousQuestion}
                                    className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition-all"
                                >
                                    이전
                                </button>
                            )}
                            <button
                                onClick={nextQuestion}
                                disabled={answers[currentQuestion] === undefined}
                                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {currentQuestion === questions.length - 1 ? '결과 보기' : '다음'}
                            </button>
                        </div>
                    </div>
                )}

                {/* 결과 화면 */}
                {screen === 'result' && (
                    <div className="py-6 text-center animate-fadeIn">
                        <h2 className="text-3xl font-bold mb-6 text-foreground">진단 완료! 🎉</h2>

                        <div
                            className="p-8 rounded-2xl mb-8 text-white shadow-lg"
                            style={{ backgroundColor: constitutionInfo[result].color }}
                        >
                            <div className="text-4xl font-bold mb-2">{result}</div>
                            <div className="text-lg opacity-95">{constitutionInfo[result].hangul}</div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 text-foreground">체질별 점수</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.keys(scores).map((constitution) => (
                                    <div
                                        key={constitution}
                                        className={`p-4 rounded-lg text-center ${constitution === result
                                            ? 'bg-primary text-white shadow-md scale-105'
                                            : 'bg-gray-100 border border-gray-200'
                                            }`}
                                    >
                                        <div className="font-semibold text-sm mb-2">{constitution}</div>
                                        <div className="text-2xl font-bold">
                                            {scores[constitution as Constitution]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
                            <h3 className="text-xl font-bold mb-4 text-foreground">{result}의 특징</h3>
                            <p className="text-muted-foreground mb-4">{constitutionInfo[result].description}</p>
                            {constitutionInfo[result].characteristics.map((char, index) => (
                                <div key={index} className="py-2 border-b border-gray-200 last:border-0">
                                    <span className="font-semibold text-foreground">• </span>
                                    <span className="text-foreground">{char}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 border-l-4 border-primary p-4 rounded-lg mb-8 text-left">
                            <p className="text-sm text-foreground">
                                ⚕️ <strong>정확한 진단을 위해</strong><br />
                                본 자가진단 결과는 참고용입니다. 더 정확한 사상체질 진단과 맞춤 처방을 위해
                                한의원을 방문하여 전문 한의사와 상담하시기를 권장합니다.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <button
                                onClick={openAppointment}
                                className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-lg transition-all shadow-md hover:shadow-lg"
                            >
                                ☎️ 상담 예약하기
                            </button>
                            <button
                                onClick={restartQuiz}
                                className="px-8 py-3 bg-white hover:bg-gray-50 text-foreground border-2 border-foreground rounded-lg font-semibold transition-all"
                            >
                                다시 진단하기
                            </button>
                        </div>
                    </div>
                )}
            </main>

            <BottomTabBar />
        </div>
    );
}
