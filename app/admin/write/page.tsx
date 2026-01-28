'use client'

import { useState, useEffect, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Save, Loader2, Upload, X, ImageIcon } from "lucide-react";
import Link from "next/link";
import { processImage } from "@/lib/image-utils";

const CATEGORIES = ["초음파 진단", "사상체질", "다이어트", "추나 요법", "교통사고", "한약"];

function WriteForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const supabase = createClient();

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(!!id);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: CATEGORIES[0],
        thumbnail_url: "",
        image_alt: "",
        content: "",
        meta_title: "",
        meta_description: "",
    });

    useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                const { data, error } = await supabase
                    .from("health_columns")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (data) {
                    setFormData({
                        title: data.title,
                        slug: data.slug || "",
                        category: data.category,
                        thumbnail_url: data.thumbnail_url || "",
                        image_alt: data.image_alt || "",
                        content: data.content || "",
                        meta_title: data.meta_title || "",
                        meta_description: data.meta_description || "",
                    });
                }
                setInitialLoading(false);
            }
            fetchPost();
        }
    }, [id, supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const postData = {
            ...formData,
            updated_at: new Date().toISOString(),
        };

        let error;
        if (id) {
            const { error: updateError } = await supabase
                .from("health_columns")
                .update(postData)
                .eq("id", id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("health_columns")
                .insert([postData]);
            error = insertError;
        }

        if (error) {
            alert("저장 중 오류가 발생했습니다: " + error.message);
        } else {
            router.push("/admin");
            router.refresh();
        }
        setLoading(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 0. 즉시 미리보기 생성 (사용자 경험 개선)
        const localPreviewUrl = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, thumbnail_url: localPreviewUrl }));

        setUploading(true);
        try {
            // 1. 이미지 압축 및 리사이징 (WebP)
            const compressedBlob = await processImage(file);

            // 2. Supabase Storage 업로드
            const fileName = `${formData.slug || Date.now()}-${Math.random().toString(36).substring(2, 7)}.webp`;
            const filePath = `thumbnails/${fileName}`;

            const { data, error: uploadError } = await supabase.storage
                .from('health-columns')
                .upload(filePath, compressedBlob, {
                    contentType: 'image/webp',
                    upsert: true
                });

            if (uploadError) throw uploadError;

            // 3. Public URL 가져오기
            const { data: { publicUrl } } = supabase.storage
                .from('health-columns')
                .getPublicUrl(filePath);

            // 4. 최종 URL 반영 (로컬 프리뷰 해제)
            setFormData(prev => ({ ...prev, thumbnail_url: publicUrl }));
            URL.revokeObjectURL(localPreviewUrl);

            alert("이미지가 성공적으로 최적화되어 업로드되었습니다.");
        } catch (error: any) {
            console.error("Upload error details:", error);
            // 오류 발생 시 로컬 미리보기 유지할지 취소할지 결정 (여기선 유지)
            alert("이미지 업로드 중 오류가 발생했습니다. (SQL 정책이나 버킷 이름을 다시 확인해 주세요): " + error.message);
        } finally {
            setUploading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-medical-blue" />
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{id ? "칼럼 수정" : "새 칼럼 작성"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                        <h3 className="font-bold text-medical-blue">기본 정보</h3>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">제목</label>
                            <Input
                                required
                                value={formData.title}
                                onChange={(e) => {
                                    const title = e.target.value;
                                    setFormData({
                                        ...formData,
                                        title,
                                        slug: formData.slug || title.toLowerCase().replace(/[^a-z0-9가-힣]/g, '-').replace(/-+/g, '-')
                                    });
                                }}
                                placeholder="칼럼 제목을 입력하세요"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">URL 슬러그 (영문/숫자/한글 가능)</label>
                            <Input
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="gunsan-chuna-therapy"
                            />
                            <p className="text-[10px] text-muted-foreground">sosaeng-hospital.com/post/슬러그 형식으로 주소가 생성됩니다.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">카테고리</label>
                        <select
                            className="w-full h-10 px-3 py-2 bg-white border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-4 p-4 border rounded-lg bg-gray-50/50">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-medical-blue">미디어 및 SEO</h3>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-medium">썸네일 이미지</label>

                            {/* 이미지 미리보기 및 업로드 UI */}
                            <div className="flex flex-col md:flex-row gap-4 items-start">
                                <div className="relative w-full md:w-48 aspect-video rounded-xl bg-white border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden group">
                                    {formData.thumbnail_url ? (
                                        <>
                                            <img src={formData.thumbnail_url} alt="Thumbnail" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, thumbnail_url: "" }))}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-gray-400 flex flex-col items-center gap-2">
                                            <ImageIcon className="h-8 w-8" />
                                            <span className="text-xs italic">이미지 없음</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 space-y-3 w-full">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploading}
                                            className="hidden"
                                            id="thumbnail-upload"
                                        />
                                        <label
                                            htmlFor="thumbnail-upload"
                                            className={`flex items-center justify-center gap-2 w-full h-12 rounded-xl border-2 border-medical-blue/30 text-medical-blue font-bold cursor-pointer hover:bg-medical-blue/5 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {uploading ? (
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                            ) : (
                                                <Upload className="h-5 w-5" />
                                            )}
                                            {uploading ? "압축 및 업로드 중..." : "이미지 선택 (자동 압축)"}
                                        </label>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-muted-foreground">직접 URL 입력 (또는 업로드 결과)</label>
                                        <Input
                                            value={formData.thumbnail_url}
                                            onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                                            placeholder="https://example.com/image.jpg"
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-muted-foreground">이미지 대체 텍스트(Alt Text)</label>
                                        <Input
                                            value={formData.image_alt}
                                            onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })}
                                            placeholder="군산 소생한의원 내부 전경"
                                            className="h-8 text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 space-y-4 border-t border-gray-100">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">SEO 메타 제목 (입력 안하면 원본 제목 사용)</label>
                                <Input
                                    value={formData.meta_title}
                                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                    placeholder="검색 엔진 노출용 제목"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">SEO 메타 설명</label>
                                <Textarea
                                    value={formData.meta_description}
                                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                    placeholder="검색 결과에 노출될 짧은 요약글"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">내용 (이미지 업로드 기능은 추후 확장 예정)</label>
                        <Textarea
                            rows={15}
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="본문 내용을 입력하세요"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Link href="/admin">
                            <Button type="button" variant="outline">취소</Button>
                        </Link>
                        <Button type="submit" disabled={loading} className="gap-2">
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="h-4 w-4" />
                            )}
                            저장하기
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

export default function WritePage() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <Link href="/admin">
                    <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent -ml-2 mb-2">
                        <ChevronLeft className="h-4 w-4" /> 목록으로 돌아가기
                    </Button>
                </Link>
                <Suspense fallback={<div>Loading...</div>}>
                    <WriteForm />
                </Suspense>
            </div>
        </div>
    );
}
