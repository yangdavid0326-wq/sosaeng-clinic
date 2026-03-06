'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

// 관리자 페이지는 방문자 기록에서 제외
const EXCLUDED_PATHS = ['/admin', '/admin/login', '/admin/write', '/admin/faq']

export default function VisitorTracker() {
    const pathname = usePathname()
    const supabase = createClient()

    useEffect(() => {
        // 관리자 경로는 기록하지 않음
        if (!pathname || EXCLUDED_PATHS.some(p => pathname.startsWith(p))) return

        // 같은 세션에서 같은 페이지 중복 기록 방지
        const sessionKey = `visited_${pathname}`
        if (sessionStorage.getItem(sessionKey)) return

        const recordVisit = async () => {
            try {
                await supabase.from('page_views').insert({
                    page_path: pathname,
                    user_agent: navigator.userAgent,
                })
                sessionStorage.setItem(sessionKey, '1')
            } catch (e) {
                // 기록 실패해도 사용자 경험에 영향 없도록 무시
            }
        }

        recordVisit()
    }, [pathname])

    return null
}
