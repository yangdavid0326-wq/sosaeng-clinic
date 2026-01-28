-- FAQ 테이블 생성 SQL
-- Supabase SQL Editor에서 실행해 주세요.

CREATE TABLE IF NOT EXISTS faq (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) 설정
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

-- 누구나 읽기 가능 정책
CREATE POLICY "FAQ 조회는 누구나 가능" ON faq
    FOR SELECT USING (true);

-- 관리자만 삽입/수정/삭제 가능 (사용자 인증 필요)
CREATE POLICY "관리자만 FAQ 관리 가능" ON faq
    FOR ALL USING (auth.role() = 'authenticated');

-- 카테고리 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_faq_category ON faq(category);
CREATE INDEX IF NOT EXISTS idx_faq_order ON faq(order_index);
