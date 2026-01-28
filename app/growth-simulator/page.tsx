'use client'

import { useState } from 'react';
import { Baby, TrendingUp, AlertCircle, Scale, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { Button } from "@/components/ui/button";

export default function GrowthSimulatorPage() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        gender: 'boy',
        age: '',
        childHeight: '',
        childWeight: '',
        dadHeight: '',
        momHeight: '',
        constitution: ''
    });
    const [result, setResult] = useState<any>(null);

    // MPH 계산 공식 (유전적 예상 키)
    const calculateMPH = () => {
        const dad = parseFloat(data.dadHeight);
        const mom = parseFloat(data.momHeight);
        let mph = data.gender === 'boy' ? (dad + mom + 13) / 2 : (dad + mom - 13) / 2;

        // 환경 변수 (한약, 영양, 수면) 추가 시 시나리오
        return {
            base: Math.round(mph * 10) / 10,
            max: Math.round((mph + 5.5) * 10) / 10, // 최적 환경 시
            min: Math.round((mph - 5.5) * 10) / 10  // 관리 부실 시
        };
    };

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
        else {
            const mphResult = calculateMPH();
            setResult(mphResult);
        }
    };

    const handleReset = () => {
        setResult(null);
        setStep(0);
        setData({
            gender: 'boy',
            age: '',
            childHeight: '',
            childWeight: '',
            dadHeight: '',
            momHeight: '',
            constitution: '태음인'
        });
    };

    const handleReservation = () => {
        window.open('https://booking.naver.com/booking/13/bizes/1101279', '_blank');
    };

    // BMI 계산 및 비만 위험도 판정
    const calculateBMI = () => {
        const height = parseFloat(data.childHeight) / 100; // cm to m
        const weight = parseFloat(data.childWeight);
        const bmi = weight / (height * height);

        // 소아청소년 BMI 기준 (간단화)
        let status: 'normal' | 'overweight' | 'obese' = 'normal';
        let color = '#22c55e'; // green
        let label = '정상';

        if (bmi >= 25) {
            status = 'obese';
            color = '#ef4444'; // red
            label = '비만';
        } else if (bmi >= 23) {
            status = 'overweight';
            color = '#f59e0b'; // amber
            label = '과체중';
        }

        return { bmi: Math.round(bmi * 10) / 10, status, color, label };
    };

    // 성장 골든타임 계산 (사춘기 시작까지)
    const calculateGoldenTime = () => {
        const age = parseInt(data.age);
        // 남아: 평균 12세, 여아: 평균 10세에 사춘기 시작
        const pubertyAge = data.gender === 'boy' ? 12 : 10;
        const yearsLeft = pubertyAge - age;

        let message = '';
        let urgency: 'high' | 'medium' | 'low' = 'low';

        if (yearsLeft <= 0) {
            message = '사춘기가 시작되었습니다. 지금이 마지막 성장 기회입니다!';
            urgency = 'high';
        } else if (yearsLeft <= 2) {
            message = `사춘기 시작까지 약 ${yearsLeft}년 남았습니다. 지금 바로 관리를 시작해야 합니다!`;
            urgency = 'high';
        } else if (yearsLeft <= 4) {
            message = `사춘기 시작까지 약 ${yearsLeft}년 남았습니다. 성장 관리를 시작하기 좋은 시기입니다.`;
            urgency = 'medium';
        } else {
            message = `사춘기 시작까지 약 ${yearsLeft}년 남았습니다. 충분한 준비 시간이 있습니다.`;
            urgency = 'low';
        }

        return { yearsLeft, message, urgency };
    };

    // 시각적 그래프를 위한 데이터 생성 (2개 선: 유전적 예상 키 vs 최적 관리 시)
    const chartData = result ? [
        {
            name: '현재',
            genetic: parseFloat(data.childHeight),
            optimal: parseFloat(data.childHeight)
        },
        {
            name: '사춘기전',
            genetic: Math.round(((parseFloat(data.childHeight) + result.base) / 2) * 10) / 10,
            optimal: Math.round(((parseFloat(data.childHeight) + result.max) / 2) * 10) / 10
        },
        {
            name: '최종예상',
            genetic: result.base,
            optimal: result.max
        },
    ] : [];

    if (result) {
        return (
            <div className="min-h-screen pb-24 bg-white">
                <MobileHeader />

                <main className="container max-w-screen-md mx-auto px-4 py-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-in zoom-in duration-500">
                        <div className="text-center p-8 border-b border-gray-100">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 rounded-full mb-4">
                                <TrendingUp className="text-amber-500 w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">우리 아이 성장 분석 결과</h2>
                            <p className="text-muted-foreground">유전적 요인과 체질적 특성을 고려한 예측입니다.</p>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-6 bg-gray-50 rounded-xl text-center">
                                    <span className="text-sm text-muted-foreground block mb-1">유전적 예상 키(MPH)</span>
                                    <span className="text-4xl font-black text-foreground">{result.base}</span>
                                    <span className="text-lg text-muted-foreground"> cm</span>
                                </div>
                                <div className="p-6 bg-primary/10 rounded-xl text-center">
                                    <span className="text-sm text-primary block mb-1">최적 관리 시 목표</span>
                                    <span className="text-4xl font-black text-primary">{result.max}</span>
                                    <span className="text-lg text-primary/70"> cm</span>
                                </div>
                            </div>

                            {/* BMI 비만 위험도 신호등 */}
                            {(() => {
                                const bmiData = calculateBMI();
                                return (
                                    <div className="p-6 rounded-xl border-2" style={{ borderColor: bmiData.color, backgroundColor: `${bmiData.color}10` }}>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="font-bold text-foreground mb-1">비만 위험도</h3>
                                                <p className="text-sm text-muted-foreground">체중 관리가 키 성장에 영향을 줍니다</p>
                                            </div>
                                            <div className="text-center">
                                                <div
                                                    className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                                                    style={{ backgroundColor: bmiData.color }}
                                                >
                                                    <span className="text-2xl font-black text-white">{bmiData.label}</span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">BMI: {bmiData.bmi}</p>
                                            </div>
                                        </div>
                                        {bmiData.status !== 'normal' && (
                                            <div className="mt-4 pt-4 border-t" style={{ borderColor: bmiData.color }}>
                                                <p className="text-sm font-medium" style={{ color: bmiData.color }}>
                                                    {bmiData.status === 'obese' && '⚠️ 비만은 성장판을 조기에 닫히게 할 수 있습니다. 체중 관리가 시급합니다.'}
                                                    {bmiData.status === 'overweight' && '⚠️ 과체중 상태입니다. 적절한 체중 관리로 최적의 성장을 도와주세요.'}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}

                            {/* 성장 골든타임 D-Day */}
                            {(() => {
                                const goldenTime = calculateGoldenTime();
                                const bgColor = goldenTime.urgency === 'high' ? 'bg-red-50' :
                                    goldenTime.urgency === 'medium' ? 'bg-amber-50' : 'bg-green-50';
                                const textColor = goldenTime.urgency === 'high' ? 'text-red-700' :
                                    goldenTime.urgency === 'medium' ? 'text-amber-700' : 'text-green-700';
                                const borderColor = goldenTime.urgency === 'high' ? 'border-red-500' :
                                    goldenTime.urgency === 'medium' ? 'border-amber-500' : 'border-green-500';

                                return (
                                    <div className={`p-6 rounded-xl border-l-4 ${bgColor} ${borderColor}`}>
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <div className={`w-16 h-16 rounded-full ${bgColor} border-2 ${borderColor} flex items-center justify-center`}>
                                                    <span className={`text-2xl font-black ${textColor}`}>
                                                        {goldenTime.yearsLeft > 0 ? `${goldenTime.yearsLeft}년` : '!'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className={`font-bold ${textColor} mb-2 flex items-center gap-2`}>
                                                    ⏰ 성장 골든타임
                                                </h3>
                                                <p className={`text-sm ${textColor} leading-relaxed`}>
                                                    {goldenTime.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* 성장 예측 그래프 */}
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                        <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                            formatter={(value: number | undefined) => value ? [`${value}cm`] : ['-']}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="genetic"
                                            stroke="#6b7280"
                                            strokeWidth={3}
                                            dot={{ r: 5, fill: '#6b7280' }}
                                            name="유전적 예상 키"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="optimal"
                                            stroke="hsl(var(--primary))"
                                            strokeWidth={4}
                                            dot={{ r: 6, fill: 'hsl(var(--primary))' }}
                                            activeDot={{ r: 8 }}
                                            name="최적 관리 시"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* 그래프 범례 */}
                            <div className="flex justify-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-0.5 bg-gray-500"></div>
                                    <span className="text-muted-foreground">유전적 예상 키</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-0.5 bg-primary"></div>
                                    <span className="text-primary font-medium">최적 관리 시</span>
                                </div>
                            </div>

                            <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-500">
                                <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-3">
                                    <AlertCircle className="w-5 h-5" /> {data.constitution} 어린이 주의사항
                                </h4>
                                <p className="text-amber-700 text-sm leading-relaxed">
                                    {data.constitution === '태음인' && "흡수력이 좋아 비만 위험이 높습니다. 체중이 키 성장을 방해하지 않도록 체지방 관리가 필수적입니다."}
                                    {data.constitution === '소양인' && "열이 상체로 쏠려 수면의 질이 떨어질 수 있습니다. 숙면을 방해하는 생활 습관 교정이 시급합니다."}
                                    {data.constitution === '소음인' && "소화기 기능이 약해 영양 흡수가 원활하지 않을 수 있습니다. 비위를 보강하는 한약 처방이 도움될 수 있습니다."}
                                    {data.constitution === '태양인' && "에너지 소모가 많아 체력 관리가 중요합니다. 충분한 영양 섭취와 규칙적인 운동으로 균형 잡힌 성장을 도와야 합니다."}
                                </p>
                            </div>

                            <div className="flex flex-col space-y-3 pt-4">
                                <Button
                                    onClick={handleReservation}
                                    className="w-full py-6 bg-foreground text-white rounded-xl font-bold hover:bg-foreground/90 transition-all"
                                >
                                    원장님께 예약하기
                                </Button>
                                <button
                                    onClick={handleReset}
                                    className="w-full py-4 text-muted-foreground font-medium hover:text-foreground transition-colors"
                                >
                                    다시 테스트하기
                                </button>
                            </div>

                            <p className="text-center text-xs text-muted-foreground/50 pt-4 border-t border-gray-100">
                                * 본 결과는 예측 가이드이며, 정확한 성장 상태는 전문의 진찰이 필요합니다.
                            </p>
                        </div>
                    </div>
                </main>

                <BottomTabBar />
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-24 bg-white">
            <MobileHeader />

            <main className="container max-w-screen-md mx-auto px-4 py-6">
                {/* 헤더 */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-50 rounded-full mb-4">
                        <span className="text-4xl">👶</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-foreground">소아 성장 예측</h1>
                    <p className="text-muted-foreground">우리 아이의 성장 가능성을 확인해보세요</p>
                </div>

                {/* 진단 카드 */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Progress Bar */}
                    <div className="h-1 bg-gray-100">
                        <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${((step + 1) / 3) * 100}%` }}
                        />
                    </div>

                    <div className="p-8">
                        {step === 0 && (
                            <div className="animate-in slide-in-from-right-10 duration-500">
                                <div className="flex items-center gap-2 mb-6 text-primary">
                                    <Baby className="w-5 h-5" />
                                    <span className="text-sm font-bold tracking-widest uppercase">Step 1</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-8 text-foreground">아이의 정보를 입력해 주세요</h2>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setData({ ...data, gender: 'boy' })}
                                            className={`flex-1 py-4 rounded-xl border-2 font-medium transition-all ${data.gender === 'boy' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-muted-foreground'}`}
                                        >
                                            남아
                                        </button>
                                        <button
                                            onClick={() => setData({ ...data, gender: 'girl' })}
                                            className={`flex-1 py-4 rounded-xl border-2 font-medium transition-all ${data.gender === 'girl' ? 'border-pink-500 bg-pink-50 text-pink-700' : 'border-gray-200 text-muted-foreground'}`}
                                        >
                                            여아
                                        </button>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="현재 나이 (세)"
                                        className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 ring-primary border border-gray-200"
                                        onChange={(e) => setData({ ...data, age: e.target.value })}
                                        value={data.age}
                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="현재 키(cm)"
                                            className="flex-1 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 ring-primary border border-gray-200"
                                            onChange={(e) => setData({ ...data, childHeight: e.target.value })}
                                            value={data.childHeight}
                                        />
                                        <input
                                            type="number"
                                            placeholder="현재 몸무게(kg)"
                                            className="flex-1 p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 ring-primary border border-gray-200"
                                            onChange={(e) => setData({ ...data, childWeight: e.target.value })}
                                            value={data.childWeight}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="animate-in slide-in-from-right-10 duration-500">
                                <div className="flex items-center gap-2 mb-6 text-emerald-500">
                                    <Users className="w-5 h-5" />
                                    <span className="text-sm font-bold tracking-widest uppercase">Step 2</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-8 text-foreground">부모님의 키를 알려주세요</h2>
                                <div className="space-y-4">
                                    <input
                                        type="number"
                                        placeholder="아버지 키(cm)"
                                        className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 ring-primary border border-gray-200"
                                        onChange={(e) => setData({ ...data, dadHeight: e.target.value })}
                                        value={data.dadHeight}
                                    />
                                    <input
                                        type="number"
                                        placeholder="어머니 키(cm)"
                                        className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 ring-primary border border-gray-200"
                                        onChange={(e) => setData({ ...data, momHeight: e.target.value })}
                                        value={data.momHeight}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-in slide-in-from-right-10 duration-500">
                                <div className="flex items-center gap-2 mb-6 text-purple-500">
                                    <Scale className="w-5 h-5" />
                                    <span className="text-sm font-bold tracking-widest uppercase">Step 3</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-8 text-foreground">아이의 평소 체질은 어떤가요?</h2>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { type: '태음인', desc: '잘 먹고 덩치가 큼' },
                                        { type: '소양인', desc: '열이 많고 급함' },
                                        { type: '소음인', desc: '적게 먹고 소화가 약함' },
                                        { type: '태양인', desc: '활동적이고 에너지 소모가 많음' }
                                    ].map((item) => (
                                        <button
                                            key={item.type}
                                            onClick={() => {
                                                setData({ ...data, constitution: item.type });
                                                handleNext();
                                            }}
                                            className="p-5 bg-gray-50 rounded-xl text-left hover:bg-primary/5 hover:border-primary border-2 border-transparent transition-all"
                                        >
                                            <span className="font-medium text-foreground">{item.type}</span>
                                            <span className="text-sm text-muted-foreground ml-2">({item.desc})</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step < 2 && (
                            <div className="mt-8">
                                <Button
                                    onClick={handleNext}
                                    disabled={
                                        (step === 0 && (!data.age || !data.childHeight || !data.childWeight)) ||
                                        (step === 1 && (!data.dadHeight || !data.momHeight))
                                    }
                                    className="w-full py-6 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    다음 단계로
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <BottomTabBar />
        </div>
    );
}
