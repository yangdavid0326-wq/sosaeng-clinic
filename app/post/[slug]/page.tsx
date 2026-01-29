import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Footer } from "@/components/layout/footer";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostingSchema } from "@/lib/schema-markup";
import { ChevronLeft, Calendar, User } from "lucide-react";

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const supabase = createClient();
    const { data: post } = await supabase
        .from("health_columns")
        .select("title, meta_title, meta_description, thumbnail_url")
        .eq("slug", params.slug)
        .eq("slug", params.slug)
        .single();

    if (!post) {
        const { data: postById } = await supabase
            .from("health_columns")
            .select("title, meta_title, meta_description, thumbnail_url")
            .eq("id", params.slug)
            .single();
        if (postById) {
            // Found by ID
            return {
                title: `${postById.meta_title || postById.title} | 소생한의원 건강칼럼`,
                description: postById.meta_description,
                openGraph: {
                    title: postById.meta_title || postById.title,
                    description: postById.meta_description,
                    images: postById.thumbnail_url ? [postById.thumbnail_url] : [],
                },
            };
        }
    }

    if (!post) return { title: "포스트를 찾을 수 없습니다" };

    return {
        title: `${post.meta_title || post.title} | 소생한의원 건강칼럼`,
        description: post.meta_description,
        openGraph: {
            title: post.meta_title || post.title,
            description: post.meta_description,
            images: post.thumbnail_url ? [post.thumbnail_url] : [],
        },
    };
}

export default async function ColumnDetailPage({ params }: Props) {
    const supabase = createClient();
    let { data: post } = await supabase
        .from("health_columns")
        .select("*")
        .eq("slug", params.slug)
        .single();

    if (!post) {
        const { data: postById } = await supabase
            .from("health_columns")
            .select("*")
            .eq("id", params.slug)
            .single();
        if (postById) {
            post = postById;
        }
    }

    if (!post) {
        notFound();
    }

    const blogSchema = getBlogPostingSchema({
        title: post.title,
        slug: post.slug,
        description: post.meta_description || post.content?.substring(0, 150),
        imageUrl: post.thumbnail_url,
        datePublished: post.created_at,
        dateModified: post.updated_at,
    });

    return (
        <div className="min-h-screen bg-white pb-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />
            <MobileHeader />

            <main className="container max-w-4xl mx-auto px-6 py-12 md:py-20">
                {/* 뒤로가기 */}
                <Link href="/#faq" className="inline-flex items-center gap-2 text-muted-foreground hover:text-medical-blue mb-8 transition-colors group">
                    <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    칼럼 목록으로
                </Link>

                <article className="space-y-10">
                    {/* 헤더 */}
                    <div className="space-y-6 text-center md:text-left">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-medical-blue/5 text-medical-blue text-sm font-bold">
                            {post.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span className="font-medium text-gray-700">양경욱 원장</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(post.created_at))}</span>
                            </div>
                        </div>
                    </div>

                    {/* 썸네일 */}
                    {post.thumbnail_url && (
                        <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100">
                            <Image
                                src={post.thumbnail_url}
                                alt={post.image_alt || post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* 본문 */}
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                        {post.content?.split('\n').map((line: string, i: number) => (
                            <p key={i} className={line.trim() === "" ? "h-4" : ""}>
                                {line}
                            </p>
                        ))}
                    </div>

                    {/* 푸터 영역 (태그 등) */}
                    <div className="pt-10 border-t border-gray-100 flex justify-center">
                        <Link href="/#faq" className="px-10 py-4 bg-medical-blue text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                            더 많은 건강 정보 보기
                        </Link>
                    </div>
                </article>
            </main>

            <Footer />
            <BottomTabBar />
        </div>
    );
}
