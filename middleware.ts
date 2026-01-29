import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    // 세션 정보를 가져와서 쿠키를 갱신합니다.
    const { data: { session } } = await supabase.auth.getSession()

    const { pathname } = req.nextUrl

    // 보호된 경로 확인 (/reviews, /admin 등)
    if (pathname.startsWith('/reviews') || pathname.startsWith('/admin')) {
        // IP 제한 체크 (관리자 경로만)
        if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
            const allowedIps = (process.env.ALLOWED_ADMIN_IPS?.split(',') || [])
                .map(ip => ip.trim())
                .filter(ip => ip.length > 0);
            const clientIp = req.headers.get('x-forwarded-for') || req.ip;

            // allowedIps가 설정되어 있고, 클라이언트 IP가 포함되어 있지 않으면 차단
            // 로컬 개발 환경(::1, 127.0.0.1)은 기본 허용 고려
            if (allowedIps.length > 0 && clientIp && !allowedIps.includes(clientIp)) {
                console.warn(`Unauthorized IP access attempt: ${clientIp}`);
                return new NextResponse('Access Denied: Unauthorized IP', { status: 403 });
            }
        }

        // /admin/login 페이지는 예외
        if (pathname === '/admin/login') {
            return res
        }

        if (!session) {
            // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
            const loginUrl = pathname.startsWith('/admin') ? '/admin/login' : '/auth/login'
            const redirectUrl = req.nextUrl.clone()
            redirectUrl.pathname = loginUrl
            return NextResponse.redirect(redirectUrl)
        }
    }

    return res
}

export const config = {
    matcher: ['/reviews/:path*', '/admin/:path*']
}
