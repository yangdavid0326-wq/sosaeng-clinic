'use client'

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // 관리자 대시보드로 강제 리다이렉트 (새로고침 포함)
            window.location.href = "/admin";
        } catch (err: any) {
            setError(err.message || "로그인에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">관리자 로그인</CardTitle>
                    <CardDescription>
                        건강 칼럼 관리를 위해 로그인하세요
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                이메일
                            </label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium">
                                비밀번호
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                            {loading ? "로그인 중..." : "로그인"}
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="text-sm text-muted-foreground"
                            onClick={async () => {
                                if (!email) {
                                    alert("이메일을 입력해 주세요.");
                                    return;
                                }
                                setLoading(true);
                                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                                    redirectTo: `${window.location.origin}/auth/update-password`,
                                });
                                setLoading(false);
                                if (error) {
                                    alert("오류가 발생했습니다: " + error.message);
                                } else {
                                    alert("비밀번호 재설정 메일이 발송되었습니다. 이메일을 확인해 주세요.");
                                }
                            }}
                        >
                            비밀번호를 잊으셨나요?
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
