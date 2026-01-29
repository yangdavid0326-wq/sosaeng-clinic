'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (password.length < 6) {
            setError("비밀번호는 최소 6자 이상이어야 합니다.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const { error } = await supabase.auth.updateUser({
                password: password,
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/login");
            }, 2000);
        } catch (err: any) {
            setError(err.message || "비밀번호 변경에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">비밀번호 재설정</CardTitle>
                    <CardDescription>
                        새로운 비밀번호를 입력해 주세요
                    </CardDescription>
                </CardHeader>
                {success ? (
                    <CardContent className="space-y-4 py-8 text-center text-green-600 font-bold">
                        비밀번호가 성공적으로 변경되었습니다.<br />
                        잠시 후 로그인 페이지로 이동합니다.
                    </CardContent>
                ) : (
                    <form onSubmit={handleUpdatePassword}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm border border-red-100">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">새 비밀번호</label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">비밀번호 확인</label>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                                {loading ? "변경 중..." : "비밀번호 저장"}
                            </Button>
                        </CardFooter>
                    </form>
                )}
            </Card>
        </div>
    );
}
