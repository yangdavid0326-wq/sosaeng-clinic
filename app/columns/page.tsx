import { createClient } from "@/lib/supabase/server";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { ColumnCard } from "@/components/column/column-card";
import { ColumnsFilter } from "@/components/column/columns-filter";

export const dynamic = 'force-dynamic';

export default async function ColumnsPage({
    searchParams,
}: {
    searchParams: { category?: string }
}) {
    const supabase = createClient();
    const category = searchParams.category || "전체";

    let query = supabase
        .from("health_columns")
        .select("*")
        .order("created_at", { ascending: false });

    if (category && category !== "전체") {
        query = query.eq("category", category);
    }

    const { data: columns, error } = await query;

    return (
        <div className="min-h-screen pb-24 bg-white">
            <MobileHeader />
            <main className="container max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl font-black mb-4">건강 칼럼</h1>
                    <p className="text-muted-foreground text-lg">소생한의원에서 전해드리는 전문적인 건강 정보입니다.</p>
                </div>

                <div className="mb-12">
                    <ColumnsFilter initialCategory={category} />
                </div>

                {error ? (
                    <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <p className="text-muted-foreground">칼럼 데이터를 불러오는 중 오류가 발생했습니다.</p>
                    </div>
                ) : columns && columns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {columns.map((col) => (
                            <ColumnCard
                                key={col.id}
                                title={col.title}
                                slug={col.slug || col.id}
                                category={col.category}
                                thumbnailUrl={col.thumbnail_url}
                                imageAlt={col.image_alt}
                                createdAt={col.created_at}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <p className="text-muted-foreground">해당 카테고리에 등록된 칼럼이 없습니다.</p>
                    </div>
                )}
            </main>
            <BottomTabBar />
        </div>
    );
}
