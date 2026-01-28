'use client'

import { useState } from 'react';
import { ChevronRight, Activity, MapPin, Calendar, ClipboardCheck, AlertCircle } from 'lucide-react';
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { Button } from "@/components/ui/button";
import { PrivacyConsent } from "@/components/ui/privacy-consent";
import Link from 'next/link';

// 부위별 특화 증상 정의
const PART_SPECIFIC_SYMPTOMS: Record<string, string[]> = {
    '어깨': ['날카롭게 찌르는', '팔을 올릴 때 걸리는 느낌', '팔 아래로 이어지는 방사통', '경직/결림', '야간통 (밤에 심함)'],
    '허리': ['날카롭게 찌르는', '다리로 뻗치는 방사통', '뻐근하고 묵직함', '담결림 (갑작스러운 경직)', '허리 숙일 때 심함'],
    '무릎': ['날카롭게 찌르는', '부종/압박감 (물이 찬 느낌)', '뻐근하고 묵직함', '계단 이용 시 심함', '쪼그려 앉을 때 통증'],
    '목/거북목': ['날카롭게 찌르는', '어깨로 이어지는 방사통', '경직/결림', '저린/따끔거림', '스마트폰 볼 때 심함'],
    '손목/발목': ['날카롭게 찌르는', '저린/따끔거림', '부종/압박감', '화끈거리는 열감', '특정 동작 시 심함']
};

// 증상별 임상적 의미
const SYMPTOM_MEANINGS: Record<string, { meaning: string; treatment: string }> = {
    '날카롭게 찌르는': {
        meaning: '힘줄/인대의 구조적 손상 또는 염증',
        treatment: '초음파 정밀 진단으로 손상 부위 확인'
    },
    '방사통': {
        meaning: '신경 압박 및 탈출증 의심',
        treatment: '추나 요법을 통한 공간 확보 및 정렬 교정'
    },
    '저린/따끔거림': {
        meaning: '말초 신경 포착 또는 혈액 순환 저하',
        treatment: '약침 및 한약 처방을 통한 신경 재생 도움'
    },
    '경직/결림': {
        meaning: '근육의 비정상적 수축 및 유착',
        treatment: '침/부항 치료 및 근막 이완 추나'
    },
    '부종/압박감': {
        meaning: '관절 내 삼출물 또는 활액막 증식',
        treatment: '초음파 가이드 하의 정밀 배출 및 염증 관리'
    },
    '담결림': {
        meaning: '급성 근막통증 증후군',
        treatment: '침/부항 치료 및 근막 이완 추나'
    },
    '화끈거리는 열감': {
        meaning: '급성 염증 반응',
        treatment: '한약 처방 및 염증 관리'
    },
    '뻐근하고 묵직함': {
        meaning: '만성 근육 긴장 및 피로',
        treatment: '침/부항 치료 및 한약 처방'
    }
};

export default function MusculoskeletalDiagnosisPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({
        part: '',
        symptoms: [] as string[],
        timing: '',
        redFlag: ''
    });
    const [hasAgreed, setHasAgreed] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<null | {
        diagnosis: string;
        severity: string;
        treatments: string[];
        urgency: string;
        analysis?: string;
        reservationMessage?: string;
    }>(null);

    const steps = [
        {
            id: 'part',
            title: "가장 불편한 부위는 어디인가요?",
            options: ['어깨', '허리', '무릎', '목/거북목', '손목/발목'],
            icon: <MapPin className="w-5 h-5" />
        },
        {
            id: 'symptoms',
            title: "어떤 증상이 있나요? (복수 선택 가능)",
            options: [], // 부위에 따라 동적으로 변경
            icon: <Activity className="w-5 h-5" />,
            isMultiple: true
        },
        {
            id: 'timing',
            title: "언제 가장 통증이 심해지나요?",
            options: [], // 부위에 따라 동적으로 변경
            icon: <Calendar className="w-5 h-5" />
        },
        {
            id: 'redFlag',
            title: "다음 중 해당되는 증상이 있나요?",
            options: ['힘이 빠지는 느낌', '관절이 부어오름', '감각이 무딤', '통증', '해당 없음'],
            icon: <ClipboardCheck className="w-5 h-5" />
        }
    ];

    // 부위에 따른 악화 조건
    const getTimingOptions = (part: string): string[] => {
        const timingMap: Record<string, string[]> = {
            '어깨': ['팔을 올릴 때', '밤에 자려고 누울 때', '무거운 물건을 들 때', '특정 각도로 움직일 때'],
            '허리': ['허리를 숙일 때', '10분 이상 걸을 때', '아침에 일어날 때', '오래 앉아 있을 때'],
            '무릎': ['계단을 오르내릴 때', '쪼그려 앉을 때', '오래 서 있을 때', '걸을 때마다'],
            '목/거북목': ['스마트폰을 볼 때', '아침에 일어날 때', '스트레스 받을 때', '고개를 돌릴 때'],
            '손목/발목': ['물건을 잡을 때', '걸을 때', '특정 동작 시', '밤에 자려고 누울 때']
        };
        return timingMap[part] || ['움직일 때', '가만히 있어도', '밤에', '아침에'];
    };

    // 현재 단계의 옵션 가져오기
    const getCurrentOptions = () => {
        const currentStep = steps[step];
        if (currentStep.id === 'symptoms' && answers.part) {
            return PART_SPECIFIC_SYMPTOMS[answers.part] || [];
        }
        if (currentStep.id === 'timing' && answers.part) {
            return getTimingOptions(answers.part);
        }
        return currentStep.options;
    };

    const handleAnswer = (value: string) => {
        const currentId = steps[step].id;

        if (currentId === 'symptoms') {
            // 복수 선택 처리
            const currentSymptoms = [...answers.symptoms];
            const index = currentSymptoms.indexOf(value);
            if (index > -1) {
                currentSymptoms.splice(index, 1);
            } else {
                currentSymptoms.push(value);
            }
            setAnswers({ ...answers, symptoms: currentSymptoms });
        } else {
            setAnswers({ ...answers, [currentId]: value });
            if (step < steps.length - 1) {
                setStep(step + 1);
            } else {
                handleFinalSubmit();
            }
        }
    };

    const handleNextStep = () => {
        if (answers.symptoms.length > 0) {
            if (step < steps.length - 1) {
                setStep(step + 1);
            } else {
                handleFinalSubmit();
            }
        }
    };

    // 로컬 분석 함수 (API 실패 시 폴백용)
    const analyzeSymptoms = () => {
        const { part, symptoms, timing, redFlag } = answers;

        let severity = '경증';
        let diagnosis = '';
        const treatments: string[] = [];
        let urgency = '일반 진료';
        let analysis = '';
        let reservationMessage = '';

        // 방사통이 있는 경우
        if (symptoms.some(s => s.includes('방사통'))) {
            severity = '중등도-중증';
            urgency = '정밀 진단 권고';

            if (part === '허리' && timing.includes('허리를 숙일 때')) {
                diagnosis = '요추 추간판 탈출증(디스크) 의심';
                analysis = `${part} 부위의 방사통과 ${timing}에 심해지는 통증은 신경근 압박의 가능성이 있습니다. 조기에 정밀 진단을 받으시는 것이 권장됩니다.`;
                treatments.push('추나 요법을 통한 신경 압박 해소가 도움이 될 수 있습니다');
                treatments.push('초음파 정밀 진단으로 탈출 정도를 확인하는 것이 권장됩니다');
            } else if (part === '어깨' && symptoms.includes('팔 아래로 이어지는 방사통')) {
                diagnosis = '경추 디스크 또는 회전근개 대파열 의심';
                analysis = `${part} 부위의 방사통은 경추 신경근 압박 또는 회전근개 손상의 가능성이 있습니다. 정밀 검사가 필요한 상태입니다.`;
                treatments.push('초음파 정밀 진단으로 파열 정도를 확인하는 것이 도움이 될 수 있습니다');
                treatments.push('추나 요법을 통한 정렬 교정이 권장됩니다');
            } else if (part === '목/거북목') {
                diagnosis = '경추 추간판 탈출증 또는 신경근병증 의심';
                analysis = `${part} 부위의 방사통은 경추 신경 압박의 가능성을 시사합니다. 전문적인 진찰이 필요합니다.`;
                treatments.push('추나 요법을 통한 경추 정렬 교정이 도움이 될 수 있습니다');
                treatments.push('초음파 정밀 진단이 권장됩니다');
            }
        }

        // 날카로운 통증 + 부종
        if (symptoms.includes('날카롭게 찌르는') && (symptoms.includes('부종/압박감') || redFlag === '관절이 부어오름')) {
            severity = '중등도-중증';
            urgency = '정밀 진단 강력 권고';

            if (part === '어깨') {
                diagnosis = '석회성 건염 또는 회전근개 파열 의심';
                analysis = `${part} 부위의 날카로운 통증과 부종은 구조적 손상의 가능성이 있습니다. 정밀 진단이 강력히 권장됩니다.`;
                treatments.push('초음파 정밀 진단으로 석회 침착 및 파열을 확인하는 것이 도움이 될 수 있습니다');
                treatments.push('초음파 가이드 하의 정밀 치료가 권장됩니다');
            } else if (part === '무릎') {
                diagnosis = '반월상 연골 손상 또는 활액막염 의심';
                analysis = `${part} 부위의 부종과 통증은 연골 손상 또는 염증의 가능성이 있습니다. 조기 치료가 중요합니다.`;
                treatments.push('초음파 정밀 진단으로 연골 손상을 확인하는 것이 도움이 될 수 있습니다');
                treatments.push('초음파 가이드 하의 삼출물 배출이 권장됩니다');
            } else {
                diagnosis = '인대/힘줄의 구조적 손상(파열) 의심';
                analysis = `${part} 부위의 증상은 구조적 손상의 가능성을 시사합니다. 정밀 검사가 필요합니다.`;
                treatments.push('초음파 정밀 진단으로 손상 부위를 확인하는 것이 권장됩니다');
            }
        }

        // 경직/결림 + 야간통
        if (symptoms.includes('경직/결림') && (symptoms.includes('야간통') || timing.includes('밤에'))) {
            if (part === '어깨') {
                diagnosis = diagnosis || '유착성 관절낭염(오십견) 의심';
                analysis = `${part} 부위의 경직과 야간통은 관절낭 유착의 가능성이 있습니다. 관절 가동 범위 회복 치료가 필요합니다.`;
                treatments.push('침/부항 치료 및 근막 이완 추나가 도움이 될 수 있습니다');
                treatments.push('관절 가동 범위 회복 치료가 권장됩니다');
            }
        }

        // 담결림
        if (symptoms.includes('담결림')) {
            diagnosis = diagnosis || '급성 근막통증 증후군';
            severity = '경증-중등도';
            analysis = `${part} 부위의 담결림은 급성 근육 경련의 가능성이 있습니다. 조기 치료로 빠른 회복이 가능합니다.`;
            treatments.push('침/부항 치료로 급성 통증을 완화하는 것이 도움이 될 수 있습니다');
            treatments.push('근막 이완 추나가 권장됩니다');
        }

        // 기본 진단
        if (!diagnosis) {
            if (symptoms.includes('뻐근하고 묵직함')) {
                diagnosis = `만성 ${part} 근육 긴장 및 피로`;
                analysis = `${part} 부위의 만성적인 근육 긴장이 관찰됩니다. 지속적인 관리가 필요합니다.`;
                treatments.push('침/부항 치료가 도움이 될 수 있습니다');
                treatments.push('한약 처방이 권장됩니다');
            } else {
                diagnosis = `${part} 통증 (정밀 진단 필요)`;
                analysis = `${part} 부위의 증상에 대한 정밀 진단이 필요합니다. 전문의 상담을 권장드립니다.`;
                treatments.push('초음파 정밀 진단이 권장됩니다');
            }
        }

        // 예약 권유 문구
        if (severity === '중등도-중증') {
            reservationMessage = '귀하의 증상은 조기에 정밀 진단을 받으시는 것이 중요합니다. 미국 초음파 자격(RMSK)을 보유한 양경욱 원장님의 정확한 진찰을 통해 통증의 근본 원인을 파악하고 맞춤 치료를 받으시길 권장드립니다.';
        } else {
            reservationMessage = '정확한 진단을 위해 양경욱 원장님께 직접 상담을 받으시길 권장드립니다. 조기 치료로 더 빠른 회복이 가능합니다.';
        }

        return { diagnosis, severity, treatments, urgency, analysis, reservationMessage };
    };

    const handleFinalSubmit = async () => {
        setIsAnalyzing(true);

        try {
            // OpenRouter API 호출 시도
            const response = await fetch('/api/musculoskeletal-analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    part: answers.part,
                    symptoms: answers.symptoms,
                    timing: answers.timing,
                    redFlag: answers.redFlag
                })
            });

            if (!response.ok) {
                throw new Error('API 호출 실패');
            }

            const data = await response.json();

            // API 응답에 에러가 있는 경우 로컬 분석 사용
            if (data.error) {
                console.warn('API 에러, 로컬 분석 사용:', data.error);
                const localResult = analyzeSymptoms();
                setResult(localResult);
            } else {
                setResult(data);
            }
        } catch (error) {
            console.warn('API 호출 실패, 로컬 분석 사용:', error);
            // API 실패 시 로컬 분석 사용
            const localResult = analyzeSymptoms();
            setResult(localResult);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setStep(0);
        setAnswers({
            part: '',
            symptoms: [],
            timing: '',
            redFlag: ''
        });
        setHasAgreed(false);
    };

    const handleReservation = () => {
        window.open('https://booking.naver.com/booking/13/bizes/1101279', '_blank');
    };

    if (result) {
        return (
            <div className="min-h-screen pb-24 bg-white">
                <MobileHeader />

                <main className="container max-w-screen-md mx-auto px-4 py-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in zoom-in duration-500">
                        <div className="text-center p-8 border-b border-gray-100">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                <Activity className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">분석 결과: {result.urgency}</h2>
                            <p className="text-muted-foreground">{result.diagnosis}</p>
                            <div className="inline-block mt-3 px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                중증도: {result.severity}
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary">
                                <h3 className="font-semibold text-lg mb-3 text-foreground flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    의심 소견
                                </h3>
                                {result.analysis ? (
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        {result.analysis}
                                    </p>
                                ) : (
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        입력하신 <strong>{answers.part}</strong> 부위의 <strong>{answers.symptoms.join(', ')}</strong> 증상과
                                        <strong> {answers.timing}</strong>에 심해지는 통증 패턴으로 보아,
                                        <strong className="text-primary"> {result.diagnosis}</strong>로 판단됩니다.
                                    </p>
                                )}

                                {/* 증상별 임상적 의미 - 항상 표시 */}
                                {answers.symptoms && answers.symptoms.length > 0 && (
                                    <div className="space-y-2 mt-4 pt-4 border-t border-gray-200">
                                        <h4 className="font-semibold text-sm text-foreground mb-2">증상별 임상적 의미:</h4>
                                        {answers.symptoms.map((symptom, index) => {
                                            const key = symptom.includes('방사통') ? '방사통' :
                                                symptom.includes('저린') ? '저린/따끔거림' :
                                                    symptom.includes('경직') ? '경직/결림' :
                                                        symptom.includes('부종') ? '부종/압박감' :
                                                            symptom.includes('담결림') ? '담결림' :
                                                                symptom.includes('화끈') ? '화끈거리는 열감' :
                                                                    symptom.includes('뻐근') ? '뻐근하고 묵직함' :
                                                                        symptom.includes('날카') ? '날카롭게 찌르는' : '';

                                            const meaning = SYMPTOM_MEANINGS[key];
                                            if (!meaning) return null;

                                            return (
                                                <div key={index} className="text-sm bg-white p-3 rounded-lg border border-gray-100">
                                                    <p className="font-medium text-foreground">• {symptom}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">→ {meaning.meaning}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-semibold text-lg text-foreground">권장 치료 방법</h3>
                                {result.treatments.map((treatment, index) => (
                                    <div key={index} className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <p className="text-sm text-foreground flex items-start gap-2">
                                            <span className="text-primary font-bold">✓</span>
                                            {treatment}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* AI 맞춤형 예약 권유 문구 */}
                            {result.reservationMessage && (
                                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-5 rounded-xl border border-primary/20">
                                    <p className="text-sm text-foreground leading-relaxed">
                                        {result.reservationMessage}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col space-y-3 pt-4">
                                <Button
                                    onClick={handleReservation}
                                    className="w-full py-6 bg-foreground text-white rounded-xl font-bold hover:bg-foreground/90 transition-all"
                                >
                                    원장님께 정밀 진단 예약하기
                                </Button>
                                <button
                                    onClick={handleReset}
                                    className="w-full py-4 text-muted-foreground font-medium hover:text-foreground transition-colors"
                                >
                                    다시 테스트하기
                                </button>
                            </div>

                            <p className="text-center text-xs text-muted-foreground/50 pt-4 border-t border-gray-100">
                                * 본 결과는 진단 전 가이드이며, 정확한 상태는 미국 초음파 자격(RMSK)을 보유한 원장님의 진찰이 필요합니다.
                            </p>
                        </div>
                    </div>
                </main>

                <BottomTabBar />
            </div>
        );
    }

    const currentOptions = getCurrentOptions();
    const isMultipleChoice = steps[step].id === 'symptoms';

    return (
        <div className="min-h-screen pb-24 bg-white">
            <MobileHeader />

            <main className="container max-w-screen-md mx-auto px-4 py-6">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                        <span className="text-4xl">🦴</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-foreground">근골격계 정밀 분석</h1>
                    <p className="text-muted-foreground">통증의 원인을 정확히 파악합니다</p>
                </div>

                {/* 진단 카드 */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Progress Bar */}
                    <div className="h-1 bg-gray-100">
                        <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        />
                    </div>

                    {isAnalyzing ? (
                        <div className="py-20 text-center animate-pulse">
                            <Activity className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                            <h3 className="text-xl font-medium text-muted-foreground">통증 원인을 정밀 분석 중입니다...</h3>
                        </div>
                    ) : (
                        <div className="p-8 animate-in slide-in-from-right-10 duration-500">
                            <div className="flex items-center gap-2 mb-6 text-primary">
                                {steps[step].icon}
                                <span className="text-sm font-bold tracking-widest uppercase">Step {step + 1}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-8 leading-tight">
                                {steps[step].title}
                            </h2>
                            <div className="space-y-3">
                                {currentOptions.map((option) => {
                                    const isSelected = isMultipleChoice ? answers.symptoms.includes(option) : answers.part === option;
                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleAnswer(option)}
                                            className={`w-full group flex items-center justify-between p-5 border rounded-xl text-left transition-all duration-200 ${isSelected
                                                ? 'border-primary bg-primary/10 shadow-md'
                                                : 'bg-white border-gray-200 hover:border-primary hover:bg-primary/5'
                                                }`}
                                        >
                                            <span className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                                                {option}
                                            </span>
                                            {isSelected ? (
                                                <span className="text-primary font-bold">✓</span>
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {step === 0 && (
                                <div className="mt-8 border-t pt-4">
                                    <PrivacyConsent
                                        checked={hasAgreed}
                                        onChange={setHasAgreed}
                                    />
                                </div>
                            )}

                            {/* 복수 선택 또는 첫 단계인 경우 버튼 표시 */}
                            {(isMultipleChoice || step === 0) && (
                                <div className="mt-6">
                                    <Button
                                        onClick={step === 0 ? () => {
                                            if (!hasAgreed) {
                                                alert('개인정보 수집 및 이용에 동의해주셔야 진단이 가능합니다.');
                                                return;
                                            }
                                            if (answers.part) {
                                                setStep(step + 1);
                                            } else {
                                                alert('부위를 선택해주세요.');
                                            }
                                        } : handleNextStep}
                                        disabled={(step === 0 && (!answers.part || !hasAgreed)) || (isMultipleChoice && answers.symptoms.length === 0)}
                                        className="w-full py-6 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {step === 0 ? '진단 시작하기' : `다음 단계로 (${answers.symptoms.length}개 선택됨)`}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <BottomTabBar />
        </div>
    );
}
