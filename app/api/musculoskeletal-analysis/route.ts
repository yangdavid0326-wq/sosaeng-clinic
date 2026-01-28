import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { part, symptoms, timing, redFlag } = await req.json();

        // OpenRouter API 요청
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            },
            body: JSON.stringify({
                model: 'anthropic/claude-3.5-sonnet',
                messages: [
                    {
                        role: 'system',
                        content: `너는 군산 소생한의원 양경욱 원장의 전문 지식을 학습한 AI 상담사입니다.

**원장님 전문 분야:**
- 미국 초음파 자격(RMSK) 보유
- 척추 추나 요법 전문가
- 근골격계 질환 정밀 진단 및 치료

**역할:**
환자가 보내준 [부위, 증상, 악화조건, 특이증상] 데이터를 바탕으로 의심되는 질환을 추론하고, 초음파 RMSK 자격과 추나 요법의 강점을 살려 왜 이 환자에게 정밀 진단이 필요한지 논리적으로 설명해야 합니다.

**의료법 준수 가이드라인:**
1. '확진' 대신 '의심 소견'이라는 표현을 사용합니다.
2. 모든 문장은 '~에 도움을 줄 수 있습니다' 또는 '~가 권장됩니다'로 끝냅니다.
3. 단정적 진단을 피하고 '~가능성이 있습니다' 등의 표현을 사용합니다.
4. 반드시 전문의 진찰의 필요성을 강조합니다.

**답변 형식 (JSON):**
{
  "diagnosis": "의심 질환명 (예: 요추 추간판 탈출증 의심)",
  "severity": "경증 | 경증-중등도 | 중등도-중증",
  "urgency": "일반 진료 | 정밀 진단 권고 | 정밀 진단 강력 권고",
  "analysis": "환자 증상에 대한 상세 분석 (3-4문장, 의료법 준수 표현 사용)",
  "treatments": ["치료 방법 1", "치료 방법 2", "치료 방법 3"],
  "reservationMessage": "환자의 상태에 맞춘 맞춤형 예약 권유 문구 (2-3문장)"
}

**치료 방법 예시:**
- "초음파 정밀 진단으로 힘줄과 인대의 손상 정도를 실시간으로 확인하는 것이 도움이 될 수 있습니다"
- "추나 요법을 통한 척추 정렬 교정으로 신경 압박을 해소하는 것이 권장됩니다"
- "침/부항 치료와 한약 처방으로 염증을 관리하는 것이 도움이 될 수 있습니다"

**예약 권유 문구 예시:**
"귀하의 증상은 조기에 정밀 진단을 받으시는 것이 중요합니다. 미국 초음파 자격(RMSK)을 보유한 양경욱 원장님의 정확한 진찰을 통해 통증의 근본 원인을 파악하고 맞춤 치료를 받으시길 권장드립니다."

답변은 반드시 JSON 형식으로만 제공하고, 다른 텍스트는 포함하지 마세요.`
                    },
                    {
                        role: 'user',
                        content: `환자 정보:
- 불편한 부위: ${part}
- 증상: ${symptoms.join(', ')}
- 악화 조건: ${timing}
- 추가 증상: ${redFlag}

위 정보를 바탕으로 의심 질환을 분석하고, JSON 형식으로 답변해주세요.`
                    }
                ],
                temperature: 0.7,
                max_tokens: 1500
            })
        });

        if (!response.ok) {
            throw new Error('OpenRouter API 호출 실패');
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        // JSON 파싱
        let result;
        try {
            // JSON 마커 제거 후 파싱
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                result = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('JSON 형식을 찾을 수 없습니다');
            }
        } catch (parseError) {
            console.error('JSON 파싱 오류:', content);
            // 기본 응답 반환
            result = {
                diagnosis: `${part} 통증 (정밀 진단 필요)`,
                severity: '중등도',
                urgency: '정밀 진단 권고',
                analysis: `입력하신 ${part} 부위의 ${symptoms.join(', ')} 증상과 ${timing}에 심해지는 통증 패턴으로 보아, 전문적인 진찰이 필요한 상태로 판단됩니다. 정확한 진단을 위해 초음파 정밀 검사가 도움이 될 수 있습니다.`,
                treatments: [
                    '초음파 정밀 진단으로 손상 부위를 확인하는 것이 권장됩니다',
                    '추나 요법을 통한 정렬 교정이 도움이 될 수 있습니다',
                    '침/부항 치료와 한약 처방이 권장됩니다'
                ],
                reservationMessage: '귀하의 증상은 조기에 정밀 진단을 받으시는 것이 중요합니다. 미국 초음파 자격(RMSK)을 보유한 양경욱 원장님의 정확한 진찰을 통해 통증의 근본 원인을 파악하고 맞춤 치료를 받으시길 권장드립니다.'
            };
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('API 에러:', error);
        return NextResponse.json(
            {
                error: 'AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
                diagnosis: '분석 오류',
                severity: '알 수 없음',
                urgency: '일반 진료',
                analysis: '죄송합니다. 현재 AI 분석 서비스에 일시적인 문제가 발생했습니다. 직접 상담을 통해 정확한 진단을 받으시길 권장드립니다.',
                treatments: ['전문의 상담이 필요합니다'],
                reservationMessage: '정확한 진단을 위해 양경욱 원장님께 직접 상담을 받으시길 권장드립니다.'
            },
            { status: 500 }
        );
    }
}
