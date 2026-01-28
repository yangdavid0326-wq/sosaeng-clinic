# 소생한의원 홈페이지

Next.js 14, Tailwind CSS, shadcn/ui, Supabase, Vercel AI SDK를 활용한 한의원 공식 홈페이지입니다.

## 주요 기능

- **AI 상담**: Vercel AI SDK를 활용한 실시간 AI 채팅
- **의료법 준수**: 금칙어 필터링 시스템
- **로그인 기반 후기**: Supabase Auth를 통한 인증
- **반응형 디자인**: 데스크톱 Split Screen, 모바일 Bottom Sheet
- **SEO 최적화**: Schema.org TraditionalChineseMedicineClinic 마크업

## 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

### 3. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## Supabase 설정

### 데이터베이스 스키마

#### reviews 테이블

```sql
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  title text not null,
  content text not null,
  rating integer check (rating >= 1 and rating <= 5),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RLS 정책
alter table reviews enable row level security;

create policy "Anyone can read reviews if authenticated"
  on reviews for select
  using (auth.role() = 'authenticated');

create policy "Users can insert their own reviews"
  on reviews for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reviews"
  on reviews for update
  using (auth.uid() = user_id);

create policy "Users can delete their own reviews"
  on reviews for delete
  using (auth.uid() = user_id);
```

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **인증/데이터베이스**: Supabase
- **AI**: Vercel AI SDK + OpenAI
- **언어**: TypeScript

## 프로젝트 구조

```
├── app/
│   ├── api/chat/         # AI 채팅 API
│   ├── auth/             # 로그인/회원가입
│   ├── reviews/          # 치료 후기 (로그인 필요)
│   ├── services/         # 진료 안내
│   ├── doctors/          # 의료진 소개
│   ├── location/         # 오시는 길
│   └── layout.tsx        # 루트 레이아웃
├── components/
│   ├── chat/             # AI 채팅 컴포넌트
│   ├── layout/           # 헤더/푸터
│   └── ui/               # shadcn/ui 컴포넌트
├── lib/
│   ├── content-filter.ts # 금칙어 필터링
│   ├── schema-markup.ts  # Schema.org 마크업
│   └── supabase/         # Supabase 클라이언트
└── middleware.ts         # 인증 미들웨어
```

## 배포

### Vercel 배포

```bash
vercel --prod
```

## 라이선스

© 2026 소생한의원. All rights reserved.
