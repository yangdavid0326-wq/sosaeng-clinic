/**
 * 의료법 준수를 위한 금칙어 필터링 시스템
 * '완치', '기적' 등의 과장 광고 방지
 */

// 금칙어 목록 (의료법 위반 가능성이 있는 단어)
const FORBIDDEN_WORDS = [
    "완치",
    "기적",
    "100%",
    "무조건",
    "특효",
    "최고",
    "만병통치",
    "즉시",
    "즉각",
    "보장",
    "확실",
    "효과 보장"
];

/**
 * 텍스트에 금칙어가 포함되어 있는지 검사
 */
export function containsForbiddenWords(text: string): boolean {
    return FORBIDDEN_WORDS.some(word => text.includes(word));
}

/**
 * 금칙어를 찾아 배열로 반환
 */
export function findForbiddenWords(text: string): string[] {
    return FORBIDDEN_WORDS.filter(word => text.includes(word));
}

/**
 * 금칙어를 대체 표현으로 치환
 */
export function replaceForbiddenWords(text: string): string {
    let result = text;

    const replacements: Record<string, string> = {
        "완치": "증상 개선",
        "기적": "긍정적 변화",
        "100%": "높은 비율",
        "무조건": "일반적으로",
        "특효": "효과적",
        "최고": "우수한",
        "만병통치": "다양한 증상에 도움",
        "즉시": "빠르게",
        "즉각": "신속하게",
        "보장": "목표",
        "확실": "기대",
        "효과 보장": "효과 기대"
    };

    Object.entries(replacements).forEach(([forbidden, replacement]) => {
        result = result.replace(new RegExp(forbidden, "g"), replacement);
    });

    return result;
}

/**
 * 텍스트 검증 결과 반환
 */
export interface ValidationResult {
    isValid: boolean;
    forbiddenWords: string[];
    message: string;
}

export function validateContent(text: string): ValidationResult {
    const forbiddenWords = findForbiddenWords(text);
    const isValid = forbiddenWords.length === 0;

    return {
        isValid,
        forbiddenWords,
        message: isValid
            ? "내용이 적합합니다."
            : `다음의 표현은 의료법에 위배될 수 있습니다: ${forbiddenWords.join(", ")}`
    };
}
