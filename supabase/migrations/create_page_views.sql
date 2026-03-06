-- 방문자 기록 테이블 생성
CREATE TABLE IF NOT EXISTS page_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path TEXT NOT NULL DEFAULT '/',
    visited_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    user_agent TEXT
);

-- 인덱스 (날짜 기반 조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_page_views_visited_at ON page_views(visited_at);

-- RLS(Row Level Security) 활성화
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- 아무나 INSERT 가능 (방문자 기록)
CREATE POLICY "Anyone can insert page views"
    ON page_views
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- SELECT는 로그인한 사용자(관리자)만 가능
CREATE POLICY "Authenticated users can view page views"
    ON page_views
    FOR SELECT
    TO authenticated
    USING (true);
