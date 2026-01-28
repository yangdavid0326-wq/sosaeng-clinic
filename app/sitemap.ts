import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = createClient();
    const baseUrl = 'https://sosang-hospital.com';

    // 기본 페이지들
    const routes = [
        '',
        '/services',
        '/doctors',
        '/location',
    ].map((route) => ({
        url: baseUrl + route,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 칼럼 포스트들 추가
    const { data: posts } = await supabase
        .from('health_columns')
        .select('slug, updated_at');

    const postRoutes = (posts || []).map((post) => ({
        url: baseUrl + '/post/' + (post.slug || ''),
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...routes, ...postRoutes];
}
