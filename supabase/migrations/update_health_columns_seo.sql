-- health_columns 테이블에 SEO 관련 컬럼 추가
-- Supabase SQL Editor에서 실행해 주세요.

-- 1. 새로운 컬럼들 추가
ALTER TABLE health_columns 
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS image_alt TEXT;

-- 2. 기존 데이터에 대한 임시 슬러그 생성 (선택 사항)
-- ID를 슬러그로 임시 설정하거나 나중에 관리자 페이지에서 수정하도록 함
UPDATE health_columns SET slug = id::text WHERE slug IS NULL;

-- 3. 슬러그 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_health_columns_slug ON health_columns(slug);
