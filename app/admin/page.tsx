'use client'

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Home, LogOut, Users, CalendarDays, Calendar, BarChart2 } from "lucide-react";
import Link from "next/link";

interface VisitorStats {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
}

export default function AdminDashboard() {
    const [columns, setColumns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<VisitorStats>({ today: 0, thisWeek: 0, thisMonth: 0, total: 0 });
    const [statsLoading, setStatsLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        async function checkUser() {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/admin/login");
            }
        }

        async function fetchColumns() {
            const { data, error } = await supabase
                .from("health_columns")
                .select("*")
                .order("created_at", { ascending: false });

            if (data) {
                setColumns(data);
            }
            setLoading(false);
        }

        async function fetchStats() {
            const now = new Date();

            // 오늘 시작 (한국 시간 기준 오늘 00:00)
            const todayStart = new Date(now);
            todayStart.setHours(0, 0, 0, 0);

            // 이번 주 시작 (월요일 기준)
            const weekStart = new Date(now);
            const day = weekStart.getDay();
            const diff = (day === 0 ? -6 : 1 - day);
            weekStart.setDate(weekStart.getDate() + diff);
            weekStart.setHours(0, 0, 0, 0);

            // 이번 달 시작
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

            const [todayRes, weekRes, monthRes, totalRes] = await Promise.all([
                supabase
                    .from("page_views")
                    .select("id", { count: "exact", head: true })
                    .gte("visited_at", todayStart.toISOString()),
                supabase
                    .from("page_views")
                    .select("id", { count: "exact", head: true })
                    .gte("visited_at", weekStart.toISOString()),
                supabase
                    .from("page_views")
                    .select("id", { count: "exact", head: true })
                    .gte("visited_at", monthStart.toISOString()),
                supabase
                    .from("page_views")
                    .select("id", { count: "exact", head: true }),
            ]);

            setStats({
                today: todayRes.count ?? 0,
                thisWeek: weekRes.count ?? 0,
                thisMonth: monthRes.count ?? 0,
                total: totalRes.count ?? 0,
            });
            setStatsLoading(false);
        }

        checkUser();
        fetchColumns();
        fetchStats();
    }, [router, supabase]);

    const handleDelete = async (id: string) => {
        if (confirm("정말로 이 글을 삭제하시겠습니까?")) {
            const { error } = await supabase
                .from("health_columns")
                .delete()
                .eq("id", id);

            if (!error) {
                setColumns(columns.filter(col => col.id !== id));
            } else {
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const statCards = [
        {
            label: "오늘 방문자",
            value: stats.today,
            icon: <Users className="h-5 w-5 text-blue-500" />,
            bg: "bg-blue-50",
            text: "text-blue-600",
        },
        {
            label: "이번 주 방문자",
            value: stats.thisWeek,
            icon: <CalendarDays className="h-5 w-5 text-emerald-500" />,
            bg: "bg-emerald-50",
            text: "text-emerald-600",
        },
        {
            label: "이번 달 방문자",
            value: stats.thisMonth,
            icon: <Calendar className="h-5 w-5 text-violet-500" />,
            bg: "bg-violet-50",
            text: "text-violet-600",
        },
        {
            label: "누적 방문자",
            value: stats.total,
            icon: <BarChart2 className="h-5 w-5 text-amber-500" />,
            bg: "bg-amber-50",
            text: "text-amber-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* 헤더 */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
                        <Link href="/">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Home className="h-4 w-4" /> 홈페이지
                            </Button>
                        </Link>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive gap-2">
                        <LogOut className="h-4 w-4" /> 로그아웃
                    </Button>
                </div>

                {/* 방문자 통계 카드 */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {statCards.map((card) => (
                        <Card key={card.label} className="overflow-hidden border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-xl ${card.bg}`}>
                                        {card.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">{card.label}</p>
                                        {statsLoading ? (
                                            <div className="h-7 w-12 bg-gray-100 rounded animate-pulse mt-1" />
                                        ) : (
                                            <p className={`text-2xl font-bold ${card.text}`}>
                                                {card.value.toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* 게시글 관리 */}
                <div className="flex justify-between items-center">
                    <p className="text-muted-foreground">건강 칼럼 게시글을 관리합니다.</p>
                    <Link href="/admin/write">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" /> 새 칼럼 작성
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-24 bg-white rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {columns.length > 0 ? (
                            columns.map((col) => (
                                <Card key={col.id} className="overflow-hidden">
                                    <CardContent className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {col.thumbnail_url && (
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                    <img src={col.thumbnail_url} alt="" className="object-cover w-full h-full" />
                                                </div>
                                            )}
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
                                                        {col.category}
                                                    </span>
                                                    <span className="text-xs text-gray-400">
                                                        {new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(col.created_at))}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-gray-900 line-clamp-1">{col.title}</h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link href={`/admin/write?id=${col.id}`}>
                                                <Button variant="outline" size="icon">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="icon" className="text-destructive" onClick={() => handleDelete(col.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="py-20 text-center bg-white rounded-2xl border-2 border-dashed border-gray-100 italic text-gray-400">
                                작성된 게시글이 없습니다.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
