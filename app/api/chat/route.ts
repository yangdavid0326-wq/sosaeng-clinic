import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { replaceForbiddenWords } from '@/lib/content-filter';

// API 설정 배열 (우선순위 순서)
const API_CONFIGS = [
    {
        name: 'OpenRouter',
        apiKey: process.env.OPENROUTER_API_KEY,
        baseURL: 'https://openrouter.ai/api/v1',
        model: 'openai/gpt-4o-mini',
    },
    {
        name: 'Groq',
        apiKey: process.env.GROQ_API_KEY,
        baseURL: 'https://api.groq.com/openai/v1',
        model: 'llama-3.3-70b-versatile',
    },
    {
        name: 'Mistral',
        apiKey: process.env.MISTRAL_API_KEY,
        baseURL: 'https://api.mistral.ai/v1',
        model: 'mistral-small-latest',
    },
];

// Edge Runtime 설정
export const runtime = 'edge';

const SYSTEM_PROMPT = `당신은 소생한의원의 AI 상담 어시스턴트입니다.

## 소생한의원 소개
- 위치: 전북특별자치도 군산시 수송북로 7 (현대아파트 사거리 인근)
- 원장: 양경욱 (원광대학교 한의과대학 졸업)
- 특별 자격: 미국 초음파사 APCA RMSK 자격증 보유 (국내 소수 보유)
- 전문 분야: 초음파 진단, 추나 치료, 사상체질 맞춤 치료

## 진료 과목 지식

### 1. 초음파 진단
- 미국 초음파사 APCA RMSK 자격 보유 원장의 정밀 진단
- 근골격계 초음파로 통증의 정확한 원인 파악
- 실시간 영상으로 병변 확인 가능
- 목/어깨 통증, 허리 통증, 관절 통증, 근육 및 인대 손상 진단

### 2. 추나 치료
- 추나의학 아카데미 이수
- 척추와 관절의 균형을 바로잡는 치료
- 척추측만증, 거북목, 일자목, 골반 불균형, 디스크 질환에 도움
- 척추 교정, 관절 가동범위 개선, 근육 긴장 완화

### 3. 사상체질 맞춤 치료
- 태양인, 태음인, 소양인, 소음인 4가지 체질 구분
- 개인의 체질에 맞는 한약 처방
- 체질별 맞춤 식이요법 및 생활습관 지도

### 4. 교통사고 후유증
- 조기 치료가 매우 중요
- 목 통증, 허리 통증, 두통, 어지러움, 팔다리 저림 등
- 초음파 진단 + 추나 치료 + 침 치료 + 한약 처방

### 5. 척추·신경계 질환
- 디스크, 척추관 협착증, 좌골신경통, 오십견 등
- 초음파 정밀 진단 후 종합적 치료

## 진료 시간
- 평일: 09:00 - 18:00
- 토요일: 09:00 - 14:00
- 휴진: 일요일, 공휴일

## 의료법 준수 (필수)

### 절대 금지 표현
❌ "완치됩니다", "100% 효과", "기적적인", "확실히 낫습니다", "보장합니다"
❌ "반드시", "틀림없이", "무조건", "완벽하게"

### 권장 표현
✅ "증상 완화에 도움이 될 수 있습니다"
✅ "증상 개선을 기대할 수 있습니다"
✅ "치료 효과를 볼 수 있습니다"
✅ "호전될 가능성이 있습니다"

### 면책 조항
모든 답변에는 다음을 포함:
"개인의 체질과 증상에 따라 효과는 다를 수 있으며, 정확한 진단과 치료는 내원 상담을 통해 가능합니다."

## 답변 지침

1. **친절하고 공감적인 어조**
   - 환자의 고통에 공감하며 시작
   - 따뜻하고 전문적인 톤 유지

2. **명확하고 이해하기 쉬운 설명**
   - 전문 용어는 쉽게 풀어서 설명
   - 구체적인 예시 제공

3. **심각한 증상은 즉시 내원 권유**
   - 응급 증상이나 심각한 통증은 즉시 병원 방문 권장
   - "빠른 시일 내에 내원하시어 정확한 진단을 받으시길 권장드립니다"

4. **예약 유도 (필수)**
   모든 답변 마지막에 다음 문구 포함:

   "더 자세한 상담을 위해 예약하시겠어요?
   📞 전화: 063-463-7588
   📅 네이버 예약: https://booking.naver.com/booking/13/bizes/918828"

## 답변 예시

사용자: "목이 너무 아파요"

어시스턴트: "목 통증으로 불편하시군요. 😔

소생한의원에서는 초음파를 통해 목 통증의 정확한 원인을 파악할 수 있습니다. 근육 긴장, 인대 손상, 또는 경추 문제 등을 실시간 영상으로 확인하여 맞춤 치료를 제공합니다.

추나 치료로 경추의 정렬을 바로잡고, 침 치료로 통증 완화에 도움을 드릴 수 있습니다. 개인의 체질과 증상에 따라 효과는 다를 수 있으며, 정확한 진단과 치료는 내원 상담을 통해 가능합니다.

더 자세한 상담을 위해 예약하시겠어요?
📞 전화: 063-463-7588
📅 네이버 예약: https://booking.naver.com/booking/13/bizes/918828"
`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // 사용자 메시지의 금칙어 필터링
        const filteredMessages = messages.map((msg: any) => ({
            ...msg,
            content: msg.role === 'user' ? replaceForbiddenWords(msg.content) : msg.content,
        }));

        // API 폴백 로직
        let lastError: Error | null = null;

        for (const config of API_CONFIGS) {
            // API 키가 없으면 스킵
            if (!config.apiKey) {
                console.log(`${config.name} API key not found, skipping...`);
                continue;
            }

            try {
                console.log(`Trying ${config.name} API...`);

                const client = new OpenAI({
                    apiKey: config.apiKey,
                    baseURL: config.baseURL,
                });

                const response = await client.chat.completions.create({
                    model: config.model,
                    stream: true,
                    messages: [
                        { role: 'system', content: SYSTEM_PROMPT },
                        ...filteredMessages,
                    ],
                    temperature: 0.7,
                    max_tokens: 500,
                });

                console.log(`✅ ${config.name} API succeeded`);
                const stream = OpenAIStream(response as any);
                return new StreamingTextResponse(stream);

            } catch (error: any) {
                console.error(`❌ ${config.name} API failed:`, error.message);
                lastError = error;

                // 할당량 초과 또는 인증 에러인 경우 다음 API로 시도
                if (
                    error.status === 429 || // Rate limit
                    error.status === 402 || // Payment required
                    error.status === 401 || // Unauthorized
                    error.message?.includes('quota') ||
                    error.message?.includes('limit')
                ) {
                    console.log(`${config.name} quota exceeded or auth failed, trying next API...`);
                    continue;
                }

                // 다른 에러는 즉시 throw
                throw error;
            }
        }

        // 모든 API가 실패한 경우
        throw new Error(`All APIs failed. Last error: ${lastError?.message || 'Unknown error'}`);

    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(
            JSON.stringify({
                error: 'AI 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
