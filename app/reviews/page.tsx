import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default async function ReviewsPage() {
    const supabase = createClient();

    // 인증 확인
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect("/auth/login");
    }

    // 후기 데이터 조회
    const { data: reviews, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen pb-24">
            <MobileHeader />

            <main className="container max-w-screen-lg mx-auto px-4 py-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">치료 후기</h1>
                    <p className="text-muted-foreground">
                        환자분들의 소중한 후기를 확인하세요
                    </p>
                </div>

                {error ? (
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-center text-muted-foreground">
                                후기를 불러오는 중 오류가 발생했습니다.<br />
                                Supabase 설정을 확인해주세요.
                            </p>
                        </CardContent>
                    </Card>
                ) : reviews && reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review: any) => (
                            <Card key={review.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">{review.title}</CardTitle>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < review.rating
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-muted"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <CardDescription>
                                        {new Date(review.created_at).toLocaleDateString("ko-KR")}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                        {review.content}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-center text-muted-foreground">
                                아직 작성된 후기가 없습니다.
                            </p>
                        </CardContent>
                    </Card>
                )}
            </main>

            <BottomTabBar />
        </div>
    );
}
