'use client'

import { useState } from "react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";

// 질문 데이터
const dietTypeQuestions = [
    {
        question: "평소 식사 습관은 어떤가요?",
        answers: [
            { text: "천천히 많이 먹는 편", type: "대사저하형" },
            { text: "배고픔을 못 참고 급하게 먹는다", type: "스트레스폭식형" },
            { text: "입이 짧고 조금만 먹어도 배부르다", type: "부종순환형" },
            { text: "규칙적으로 골고루 먹는 편", type: "근육부족형" },
            { text: "불규칙적으로 먹는다", type: "호르몬불균형형" }
        ]
    },
    {
        question: "아침과 저녁, 몸이 붓는 정도는 어떠신가요?",
        answers: [
            { text: "항상 몸이 무겁고 전신이 잘 붓는다", type: "대사저하형" },
            { text: "저녁이면 다리가 붓고 신발이 꽉 끼인다", type: "부종순환형" },
            { text: "스트레스 받은 날은 유독 많이 부는 편", type: "스트레스폭식형" },
            { text: "특정 부위(복부, 팔)만 살이 붙는다", type: "근육부족형" },
            { text: "붓기가 불규칙적으로 왔다갔다한다", type: "호르몬불균형형" }
        ],
        isMultiSelect: true,
        maxSelections: 2
    },
    {
        question: "스트레스를 받으면 음식 반응이 어떤가요?",
        answers: [
            { text: "기운이 없어져 보양식을 찾는다", type: "대사저하형" },
            { text: "짜증나며 매운 음식이나 자극적인 음식이 당긴다", type: "스트레스폭식형" },
            { text: "입맛이 떨어지거나 체한다", type: "부종순환형" },
            { text: "식욕에는 큰 변화가 없다", type: "근육부족형" },
            { text: "식욕이 폭발적으로 늘어난다", type: "호르몬불균형형" }
        ],
        isMultiSelect: true,
        maxSelections: 2
    },
    {
        question: "평소 소화 능력은 어떠신가요?",
        answers: [
            { text: "소화는 잘 되는데 먹는 족족 살로 간다", type: "대사저하형" },
            { text: "소화가 빨라 금방 배고픔을 느낀다", type: "스트레스폭식형" },
            { text: "소화가 잘 안 되고 자주 더부룩하다", type: "부종순환형" },
            { text: "보통이나 소화 후 쉽게 지친다", type: "근육부족형" },
            { text: "소화 능력이 시기에 따라 달라진다", type: "호르몬불균형형" }
        ],
        isMultiSelect: true,
        maxSelections: 2
    },
    {
        question: "당신의 가장 고민되는 군살 부위는 어디인가요?",
        answers: [
            { text: "전체적으로 두툼하게 붙는 나잇살과 뱃살", type: "대사저하형" },
            { text: "특정 부위(복부, 옆구리)에 집중적으로 붙는다", type: "부종순환형" },
            { text: "아래쪽(복부, 엉덩이)에 집중된다", type: "스트레스폭식형" },
            { text: "체중은 정상이나 복부에 살이 몰려있다", type: "근육부족형" },
            { text: "불규칙적으로 여러 부위에 생긴다", type: "호르몬불균형형" }
        ]
    },
    {
        question: "운동할 때 또는 활동할 때는 어떤가요?",
        answers: [
            { text: "금방 지치고 휴식을 자주 필요로 한다", type: "대사저하형" },
            { text: "에너지가 많지만 운동 후 회복이 느리다", type: "스트레스폭식형" },
            { text: "활동하면 쉽게 부어오르거나 피로해진다", type: "부종순환형" },
            { text: "조금만 운동해도 쉽게 지친다", type: "근육부족형" },
            { text: "운동 능력이 시기에 따라 크게 달라진다", type: "호르몬불균형형" }
        ]
    },
    {
        question: "평소 느끼는 피로감의 종류는 무엇인가요?",
        answers: [
            { text: "늘 몸이 무겁고 눕고만 싶은 만성 피로", type: "대사저하형" },
            { text: "잠을 많이 자도 개운하지 않다", type: "부종순환형" },
            { text: "자다가 자주 깨고 숙면을 못 한다", type: "스트레스폭식형" },
            { text: "운동 후 회복 시간이 길다", type: "근육부족형" },
            { text: "피로감이 주기적으로 변한다", type: "호르몬불균형형" }
        ],
        isMultiSelect: true,
        maxSelections: 999
    },
    {
        question: "최근 호르몬 변화나 생활의 급격한 변화가 있었나요?",
        answers: [
            { text: "특별한 변화는 없지만 예전부터 살이 잘 찔 걱정", type: "대사저하형" },
            { text: "최근 부종이 심해졌다", type: "부종순환형" },
            { text: "스트레스가 많아졌거나 불규칙한 생활을 한다", type: "스트레스폭식형" },
            { text: "근력 운동을 안 하고 있다", type: "근육부족형" },
            { text: "갱년기, 산후, 월경 불순 등의 변화가 있다", type: "호르몬불균형형" }
        ]
    }
];

// 처방 내용
const prescriptionContent: any = {
    "대사저하형": {
        mainTitle: "기초대사량 증폭",
        mainDesc: "저하된 대사 기능을 회복시키는 한약 처방으로 '살이 잘 빠지는 몸'을 만듭니다.",
        cards: [
            {
                icon: "🔥",
                title: "기초대사량 증폭",
                description: "저하된 기초대사량을 회복시켜 '살이 잘 빠지는 몸'을 만듭니다.",
                emphasized: true
            },
            {
                icon: "💪",
                title: "기혈 보강",
                description: "에너지 정체를 풀어 몸 전체의 순환을 개선합니다.",
                emphasized: false
            },
            {
                icon: "💧",
                title: "노폐물 배출",
                description: "쌓인 노폐물을 제거하여 체중 감량을 도웁니다.",
                emphasized: false
            }
        ]
    },
    "부종순환형": {
        mainTitle: "순환 및 배출",
        mainDesc: "순환 정체 부위를 파악하고 수분 대사를 돕는 치료를 병행합니다.",
        cards: [
            {
                icon: "💧",
                title: "순환 및 배출",
                description: "초음파 정밀 진단으로 순환 정체 부위를 파악하고 수분 대사를 돕는 치료를 병행합니다.",
                emphasized: true
            },
            {
                icon: "🔥",
                title: "대사 촉진",
                description: "순환 개선으로 신진대사를 정상화하고 노폐물 배출을 촉진합니다.",
                emphasized: false
            },
            {
                icon: "💪",
                title: "기혈 보강",
                description: "혈액 순환을 촉진하여 부종을 완화하고 체질을 개선합니다.",
                emphasized: false
            }
        ]
    },
    "스트레스폭식형": {
        mainTitle: "자율신경 안정",
        mainDesc: "스트레스로 예민해진 기운을 다스려 가짜 배고픔을 억제하고 식욕을 자연스럽게 조절합니다.",
        cards: [
            {
                icon: "🧠",
                title: "자율신경 안정",
                description: "스트레스로 예민해진 기운을 다스려 가짜 배고픔을 억제하고 식욕을 자연스럽게 조절합니다.",
                emphasized: true
            },
            {
                icon: "😴",
                title: "수면 개선",
                description: "호르몬 불균형을 개선하여 질 좋은 수면을 돕고 스트레스를 완화합니다.",
                emphasized: false
            },
            {
                icon: "💪",
                title: "심신 안정",
                description: "마음과 몸의 균형을 맞추어 건강한 식습관을 회복시킵니다.",
                emphasized: false
            }
        ]
    },
    "근육부족형": {
        mainTitle: "기혈 보강",
        mainDesc: "근육 생성을 방해하는 기혈 부족을 채우고 하체 근력을 강화하는 맞춤 한약을 처방합니다.",
        cards: [
            {
                icon: "💪",
                title: "기혈 보강",
                description: "근육 생성을 방해하는 기혈 부족을 채우고 하체 근력을 강화하는 맞춤 한약을 처방합니다.",
                emphasized: true
            },
            {
                icon: "🔥",
                title: "기초대사 증폭",
                description: "기초대사량을 높여 휴식 중에도 칼로리 소모를 증가시킵니다.",
                emphasized: false
            },
            {
                icon: "🎯",
                title: "체형 개선",
                description: "하체 근력 강화로 탄력 있는 피부와 바른 체형을 만듭니다.",
                emphasized: false
            }
        ]
    },
    "호르몬불균형형": {
        mainTitle: "호르몬 밸런스",
        mainDesc: "급격한 변화를 겪는 몸의 균형을 맞추어 건강한 체중 감량을 돕습니다.",
        cards: [
            {
                icon: "⚖️",
                title: "호르몬 밸런스",
                description: "급격한 변화를 겪는 몸의 균형을 맞추어 건강한 체중 감량을 돕습니다.",
                emphasized: true
            },
            {
                icon: "🔄",
                title: "주기 안정",
                description: "월경 불순이나 갱년기 증상을 완화하여 몸의 리듬을 회복시킵니다.",
                emphasized: false
            },
            {
                icon: "💪",
                title: "체질 강화",
                description: "근본적인 체질 개선으로 건강하고 지속 가능한 다이어트를 지원합니다.",
                emphasized: false
            }
        ]
    }
};

type DietType = keyof typeof prescriptionContent;

export default function DietDiagnosisPage() {
    const [screen, setScreen] = useState<'start' | 'quiz' | 'result'>('start');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [scores, setScores] = useState({
        "대사저하형": 0,
        "부종순환형": 0,
        "스트레스폭식형": 0,
        "근육부족형": 0,
        "호르몬불균형형": 0
    });

    const startQuiz = () => {
        setScreen('quiz');
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setScores({
            "대사저하형": 0,
            "부종순환형": 0,
            "스트레스폭식형": 0,
            "근육부족형": 0,
            "호르몬불균형형": 0
        });
    };

    const handleAnswerClick = (answerIndex: number) => {
        const question = dietTypeQuestions[currentQuestion];

        if (question.isMultiSelect) {
            const maxSelections = question.maxSelections || 2;
            const currentIndex = selectedAnswers.indexOf(answerIndex);

            if (currentIndex > -1) {
                setSelectedAnswers(selectedAnswers.filter(i => i !== answerIndex));
            } else if (selectedAnswers.length < maxSelections) {
                setSelectedAnswers([...selectedAnswers, answerIndex]);
            }
        } else {
            // 단일 선택 - 즉시 다음 질문으로
            const answer = question.answers[answerIndex];
            const newScores = { ...scores };
            newScores[answer.type as DietType]++;
            setScores(newScores);

            setTimeout(() => {
                if (currentQuestion < dietTypeQuestions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    setSelectedAnswers([]);
                } else {
                    showResult(newScores);
                }
            }, 300);
        }
    };

    const handleNextQuestion = () => {
        const question = dietTypeQuestions[currentQuestion];
        const newScores = { ...scores };

        selectedAnswers.forEach(answerIndex => {
            const answer = question.answers[answerIndex];
            newScores[answer.type as DietType]++;
        });

        setScores(newScores);
        setSelectedAnswers([]);

        if (currentQuestion < dietTypeQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            showResult(newScores);
        }
    };

    const showResult = (finalScores: typeof scores) => {
        setScores(finalScores);
        setScreen('result');
    };

    const resetTest = () => {
        setScreen('start');
        setCurrentQuestion(0);
        setSelectedAnswers([]);
        setScores({
            "대사저하형": 0,
            "부종순환형": 0,
            "스트레스폭식형": 0,
            "근육부족형": 0,
            "호르몬불균형형": 0
        });
    };

    const openAppointment = () => {
        window.location.href = 'https://booking.naver.com/booking/13/bizes/918828';
    };

    const progress = ((currentQuestion + 1) / dietTypeQuestions.length) * 100;
    const question = dietTypeQuestions[currentQuestion];

    // 결과 계산
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const scorePercentages: any = {};
    for (let type in scores) {
        scorePercentages[type] = Math.round((scores[type as DietType] / totalScore) * 100);
    }

    const maxType = Object.keys(scores).reduce((a, b) =>
        scores[a as DietType] > scores[b as DietType] ? a : b
    ) as DietType;

    return (
        <div className="min-h-screen pb-24 bg-white">
            <MobileHeader />

            <main className="container max-w-screen-md mx-auto px-4 py-6">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                        <span className="text-4xl">🎯</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-foreground">다이어트 유형 진단</h1>
                    <p className="text-muted-foreground">당신의 맞춤형 다이어트 유형 분석</p>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-8 min-h-[500px]">
                        {/* 시작 화면 */}
                        {screen === 'start' && (
                            <div className="text-center py-12 animate-fadeIn">
                                <h2 className="text-2xl font-bold mb-6 text-foreground">
                                    단 1분, 당신이 살찌는 진짜 원인을 찾아보세요
                                </h2>
                                <button
                                    onClick={startQuiz}
                                    className="px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-lg transition-all shadow-md hover:shadow-lg"
                                >
                                    살찌는 유형분석 시작하기
                                </button>
                            </div>
                        )}

                        {/* 진단 화면 */}
                        {screen === 'quiz' && (
                            <div className="py-6 animate-fadeIn">
                                {/* 진행률 바 */}
                                <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>

                                <p className="text-sm text-muted-foreground text-center mb-6">
                                    질문 {currentQuestion + 1} / {dietTypeQuestions.length}
                                    {question.isMultiSelect && ` (최대 ${question.maxSelections === 999 ? '여러 개' : question.maxSelections + '개'} 선택 가능)`}
                                </p>

                                <h3 className="text-xl font-semibold mb-6 text-center text-foreground">
                                    {question.question}
                                </h3>

                                <div className="space-y-3 mb-6">
                                    {question.answers.map((answer, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerClick(index)}
                                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${selectedAnswers.includes(index)
                                                    ? 'bg-primary border-primary text-white'
                                                    : 'bg-white border-gray-200 text-foreground hover:bg-gray-50 hover:border-primary'
                                                }`}
                                        >
                                            {answer.text}
                                        </button>
                                    ))}
                                </div>

                                {question.isMultiSelect && (
                                    <button
                                        onClick={handleNextQuestion}
                                        disabled={selectedAnswers.length === 0}
                                        className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        다음 질문
                                    </button>
                                )}
                            </div>
                        )}

                        {/* 결과 화면 */}
                        {screen === 'result' && (
                            <div className="py-6 animate-fadeIn">
                                {/* 결과 헤더 */}
                                <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 p-10 rounded-xl mb-8 text-center">
                                    <h2 className="text-4xl font-bold mb-3 text-foreground">{maxType}</h2>
                                    <p className="text-lg text-muted-foreground mb-6">당신의 맞춤형 다이어트 유형</p>

                                    {/* 점수 분석 */}
                                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-primary/20">
                                        {Object.keys(scorePercentages)
                                            .sort((a, b) => scorePercentages[b] - scorePercentages[a])
                                            .slice(0, 3)
                                            .map(type => (
                                                <div key={type} className="text-center p-4 bg-white rounded-lg shadow-sm">
                                                    <div className="text-sm text-muted-foreground mb-2">{type}</div>
                                                    <div className="text-3xl font-bold text-primary">{scorePercentages[type]}%</div>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {/* 처방 섹션 */}
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
                                        당신을 위한 소생 다이어트 처방
                                    </h3>

                                    {/* 메인 처방 */}
                                    <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-8 mb-6 text-center">
                                        <h4 className="text-2xl font-bold text-foreground mb-3">
                                            {prescriptionContent[maxType].mainTitle}
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {prescriptionContent[maxType].mainDesc}
                                        </p>
                                    </div>

                                    {/* 처방 카드 */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        {prescriptionContent[maxType].cards.map((card: any, index: number) => (
                                            <div
                                                key={index}
                                                className={`p-6 rounded-xl border-2 transition-all ${card.emphasized
                                                        ? 'bg-primary/5 border-primary/40 shadow-md'
                                                        : 'bg-white border-gray-200'
                                                    }`}
                                            >
                                                <div className="text-4xl mb-3">{card.icon}</div>
                                                <h5 className="text-lg font-semibold text-foreground mb-2">
                                                    {card.title}
                                                </h5>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {card.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 안내 문구 */}
                                <div className="bg-gray-50 border-l-4 border-primary p-4 rounded-lg mb-6 text-sm text-muted-foreground">
                                    💡 개인별 체질에 따라 처방이 달라질 수 있습니다. 정확한 진단을 위해 전문가 상담을 권장합니다.
                                </div>

                                {/* 액션 버튼 */}
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <button
                                        onClick={openAppointment}
                                        className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-lg transition-all shadow-md hover:shadow-lg"
                                    >
                                        ☎️ 상담 예약하기
                                    </button>
                                    <button
                                        onClick={resetTest}
                                        className="px-8 py-3 bg-white hover:bg-gray-50 text-foreground border-2 border-gray-300 rounded-lg font-semibold transition-all"
                                    >
                                        🔄 다시 진단
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <BottomTabBar />
        </div>
    );
}
