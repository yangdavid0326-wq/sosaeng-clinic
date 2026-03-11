'use client'

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Home, LogOut, Users, CalendarDays, Calendar, BarChart2, Activity } from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface ChartData {
    label: string;
    views: number;
}

interface TopPage {
    path: string;
    view_count: number;
}

interface TopPlatform {
    platform: string;
    view_count: number;
}

interface VisitorStats {
    today: number;
    todayTop: TopPage[];
    todayPlatforms: TopPlatform[];
    todayChart: ChartData[];
    thisWeek: number;
    thisWeekTop: TopPage[];
    thisWeekPlatforms: TopPlatform[];
    thisWeekChart: ChartData[];
    thisMonth: number;
    thisMonthTop: TopPage[];
    thisMonthPlatforms: TopPlatform[];
    thisMonthChart: ChartData[];
    total: number;
    totalTop: TopPage[];
    totalPlatforms: TopPlatform[];
    totalDailyChart: ChartData[];
    totalMonthlyChart: ChartData[];
}

const getPageName = (path: string) => {
    switch (path) {
        case '/': return '홈 (메인)';
        case '/sasang-diagnosis': return '자가진단 사상체질';
        case '/musculoskeletal-diagnosis': return '근골격계 정밀 분석';
        case '/diet-diagnosis': return '다이어트 유형 진단';
        case '/growth-simulator': return '소아 성장 예측';
        case '/columns': return '건강 칼럼';
        case '/doctors': return '의료진 소개';
        case '/location': return '오시는 길';
        case '/services': return '진료 안내';
        default:
            try {
                if (path.startsWith('/columns?category=')) return `건강 칼럼: ${decodeURIComponent(path.split('=')[1])}`;
                if (path.startsWith('/post/')) return `건강 칼럼: "${decodeURIComponent(path.replace('/post/', ''))}"`;
                if (path.startsWith('/admin')) return `관리자 페이지`;
                return decodeURIComponent(path);
            } catch (e) {
                return path;
            }
    }
};

export default function AdminDashboard() {
    const [columns, setColumns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<VisitorStats>({
        today: 0, todayTop: [], todayPlatforms: [], todayChart: [],
        thisWeek: 0, thisWeekTop: [], thisWeekPlatforms: [], thisWeekChart: [],
        thisMonth: 0, thisMonthTop: [], thisMonthPlatforms: [], thisMonthChart: [],
        total: 0, totalTop: [], totalPlatforms: [], totalDailyChart: [], totalMonthlyChart: []
    });
    const [statsLoading, setStatsLoading] = useState(true);
    const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
    const [totalChartType, setTotalChartType] = useState<"daily" | "monthly">("monthly");
    const router = useRouter();
    const supabase = createClient();

    const toggleFlip = (label: string) => {
        setFlippedCards(prev => ({ ...prev, [label]: !prev[label] }));
    };

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

            const [
                todayRes, weekRes, monthRes, totalRes,
                todayTop, weekTop, monthTop, totalTop,
                todayPlatforms, weekPlatforms, monthPlatforms, totalPlatforms,
                todayChart, weekChart, monthChart, totalDailyChart, totalMonthlyChart
            ] = await Promise.all([
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
                supabase.rpc('get_top_pages', { start_time: todayStart.toISOString(), item_limit: 10 }),
                supabase.rpc('get_top_pages', { start_time: weekStart.toISOString(), item_limit: 10 }),
                supabase.rpc('get_top_pages', { start_time: monthStart.toISOString(), item_limit: 10 }),
                supabase.rpc('get_top_pages', { start_time: '2000-01-01T00:00:00Z', item_limit: 10 }),
                supabase.rpc('get_top_platforms', { start_time: todayStart.toISOString(), item_limit: 3 }),
                supabase.rpc('get_top_platforms', { start_time: weekStart.toISOString(), item_limit: 3 }),
                supabase.rpc('get_top_platforms', { start_time: monthStart.toISOString(), item_limit: 3 }),
                supabase.rpc('get_top_platforms', { start_time: '2000-01-01T00:00:00Z', item_limit: 3 }),
                supabase.rpc('get_visitor_chart_data', { time_unit: 'hour', start_time: todayStart.toISOString(), end_time: now.toISOString() }),
                supabase.rpc('get_visitor_chart_data', { time_unit: 'day', start_time: weekStart.toISOString(), end_time: now.toISOString() }),
                supabase.rpc('get_visitor_chart_data', { time_unit: 'day', start_time: monthStart.toISOString(), end_time: now.toISOString() }),
                supabase.rpc('get_visitor_chart_data', { time_unit: 'day', start_time: '2000-01-01T00:00:00Z', end_time: now.toISOString() }),
                supabase.rpc('get_visitor_chart_data', { time_unit: 'month', start_time: '2000-01-01T00:00:00Z', end_time: now.toISOString() })
            ]);

            setStats({
                today: todayRes.count ?? 0,
                todayTop: todayTop.data || [],
                todayPlatforms: todayPlatforms.data || [],
                todayChart: todayChart.data || [],
                thisWeek: weekRes.count ?? 0,
                thisWeekTop: weekTop.data || [],
                thisWeekPlatforms: weekPlatforms.data || [],
                thisWeekChart: weekChart.data || [],
                thisMonth: monthRes.count ?? 0,
                thisMonthTop: monthTop.data || [],
                thisMonthPlatforms: monthPlatforms.data || [],
                thisMonthChart: monthChart.data || [],
                total: totalRes.count ?? 0,
                totalTop: totalTop.data || [],
                totalPlatforms: totalPlatforms.data || [],
                totalDailyChart: totalDailyChart.data || [],
                totalMonthlyChart: totalMonthlyChart.data || [],
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
            topPages: stats.todayTop,
            topPlatforms: stats.todayPlatforms,
            icon: <Users className="h-5 w-5 text-blue-500" />,
            bg: "bg-blue-50",
            text: "text-blue-600",
        },
        {
            label: "이번 주 방문자",
            value: stats.thisWeek,
            topPages: stats.thisWeekTop,
            topPlatforms: stats.thisWeekPlatforms,
            icon: <CalendarDays className="h-5 w-5 text-emerald-500" />,
            bg: "bg-emerald-50",
            text: "text-emerald-600",
        },
        {
            label: "이번 달 방문자",
            value: stats.thisMonth,
            topPages: stats.thisMonthTop,
            topPlatforms: stats.thisMonthPlatforms,
            icon: <Calendar className="h-5 w-5 text-violet-500" />,
            bg: "bg-violet-50",
            text: "text-violet-600",
        },
        {
            label: "누적 방문자",
            value: stats.total,
            topPages: stats.totalTop,
            topPlatforms: stats.totalPlatforms,
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
                    {statCards.map((card) => {
                        const homePage = card.topPages?.find(p => p.path === '/');
                        const homeCount = homePage ? homePage.view_count : 0;
                        const filteredTopPages = (card.topPages || []).filter(p => p.path !== '/').slice(0, 5);

                        const isFlipped = flippedCards[card.label] || false;
                        const chartData = card.label === '오늘 방문자' ? stats.todayChart :
                            card.label === '이번 주 방문자' ? stats.thisWeekChart :
                                card.label === '이번 달 방문자' ? stats.thisMonthChart :
                                    totalChartType === 'daily' ? stats.totalDailyChart : stats.totalMonthlyChart;

                        return (
                            <div key={card.label} className="relative w-full h-full min-h-[280px] xl:min-h-[260px] cursor-pointer group" onClick={() => toggleFlip(card.label)} style={{ perspective: '1000px' }}>
                                <div className="w-full h-full absolute inset-0" style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>

                                    {/* Front Card */}
                                    <Card className="absolute inset-0 w-full h-full overflow-hidden border-0 shadow-sm flex flex-col group-hover:shadow-md transition-shadow" style={{ backfaceVisibility: 'hidden' }}>
                                        <CardContent className="p-4 flex-1 flex flex-col bg-white">
                                            <div className="flex items-start justify-between min-h-[60px]">
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
                                                {/* 방문 매체 통계 추가 (오른쪽 빈 공간) */}
                                                {!statsLoading && card.topPlatforms && card.topPlatforms.length > 0 && (
                                                    <div className="text-right">
                                                        <ul className="text-[10px] text-gray-400 space-y-[2px]">
                                                            {card.topPlatforms.map((p, idx) => (
                                                                <li key={idx} className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                                                                    <span>{p.platform}</span>
                                                                    <span className="font-bold text-gray-500 bg-gray-50 px-1 rounded">{p.view_count}건</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                            {!statsLoading && (
                                                <div className="mt-4 pt-4 border-t border-gray-100 flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">🏆 인기 페이지 TOP 5</p>
                                                        <span className="text-[10px] text-gray-400 font-medium bg-gray-50 px-1.5 py-0.5 rounded">
                                                            홈(메인) {homeCount}건
                                                        </span>
                                                    </div>
                                                    {filteredTopPages.length > 0 ? (
                                                        <ul className="space-y-1.5 list-none m-0 p-0">
                                                            {filteredTopPages.map((page, idx) => (
                                                                <li key={idx} className="flex items-center justify-between text-xs group/item w-full overflow-hidden">
                                                                    <span className="text-gray-600 truncate flex-1 flex items-center pr-2" title={getPageName(page.path)}>
                                                                        <span className="w-4 shrink-0 text-[10px] text-gray-400 font-bold">{idx + 1}.</span>
                                                                        <span className="truncate max-w-[120px] 2xl:max-w-full">{getPageName(page.path)}</span>
                                                                    </span>
                                                                    <span className="text-gray-500 font-medium shrink-0 bg-gray-50 px-1.5 py-0.5 rounded text-[10px]">{page.view_count}건</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <div className="text-xs text-center text-gray-400 py-2">
                                                            데이터가 없습니다.
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Back Card (Chart) */}
                                    <Card className="absolute inset-0 w-full h-full overflow-hidden border border-slate-700 shadow-xl flex flex-col bg-slate-900 text-white" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                        <CardContent className="p-4 flex-1 flex flex-col h-full">
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="text-sm font-bold flex items-center gap-2">
                                                    <Activity className="w-4 h-4 text-blue-400" />
                                                    {card.label} 추이
                                                </h4>
                                                {card.label === '누적 방문자' && (
                                                    <div className="flex bg-slate-800 rounded-lg p-0.5" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            className={`px-2 py-1 text-[10px] rounded-md transition-colors ${totalChartType === 'daily' ? 'bg-blue-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                                                            onClick={() => setTotalChartType('daily')}
                                                        >
                                                            일별
                                                        </button>
                                                        <button
                                                            className={`px-2 py-1 text-[10px] rounded-md transition-colors ${totalChartType === 'monthly' ? 'bg-blue-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                                                            onClick={() => setTotalChartType('monthly')}
                                                        >
                                                            달별
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 w-full min-h-0">
                                                {statsLoading ? (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                                                    </div>
                                                ) : chartData && chartData.length > 0 ? (
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                                            <XAxis dataKey="label" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                                                            <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} allowDecimals={false} />
                                                            <Tooltip
                                                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                                                                itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                                                            />
                                                            <Bar dataKey="views" name="방문수" fill="#3b82f6" radius={[2, 2, 0, 0]} maxBarSize={40} />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                                                        <BarChart2 className="w-8 h-8 opacity-20 mb-2" />
                                                        <p className="text-[10px]">데이터가 없습니다.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>

                                </div>
                            </div>
                        );
                    })}
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
