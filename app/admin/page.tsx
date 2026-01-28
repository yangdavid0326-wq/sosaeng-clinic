'use client'

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Home, LogOut } from "lucide-react";
import Link from "next/link";


export default function AdminDashboard() {
    const [columns, setColumns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
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

        checkUser();
        fetchColumns();
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

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto space-y-6">
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
