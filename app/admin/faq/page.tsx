'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, GripVertical } from 'lucide-react';
import { MobileHeader } from "@/components/layout/mobile-header";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FAQ_DATA } from '@/lib/faq-data';

interface FAQ {
    id?: string;
    category: string;
    question: string;
    answer: string;
    order_index: number;
}

const CATEGORIES = ["진료 안내", "예약/비용", "치료/한약", "기타"];

export default function AdminFAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const res = await fetch('/api/faq');
            const data = await res.json();
            if (data.length > 0) {
                setFaqs(data);
            } else {
                // 데이터가 없으면 초기 데이터로 채움 (또는 비워둠)
                setFaqs(FAQ_DATA);
            }
        } catch (error) {
            console.error('Failed to fetch FAQs:', error);
            setFaqs(FAQ_DATA);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingFaq) return;

        try {
            const method = editingFaq.id ? 'PUT' : 'POST';
            const res = await fetch('/api/faq', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingFaq),
            });

            if (res.ok) {
                setEditingFaq(null);
                fetchFaqs();
            }
        } catch (error) {
            alert('저장 실패: ' + error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;

        try {
            const res = await fetch(`/api/faq?id=${id}`, { method: 'DELETE' });
            if (res.ok) fetchFaqs();
        } catch (error) {
            alert('삭제 실패');
        }
    };

    return (
        <div className="min-h-screen pb-24 bg-gray-50">
            <MobileHeader />
            <main className="container max-w-4xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold">FAQ 관리</h1>
                        <p className="text-sm text-muted-foreground">홈페이지 하단 자주 묻는 질문을 수정하고 추가합니다.</p>
                    </div>
                    <button
                        onClick={() => setEditingFaq({ category: "진료 안내", question: "", answer: "", order_index: faqs.length + 1 })}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-bold shadow-md hover:bg-primary/90 transition-all self-start"
                    >
                        <Plus className="h-5 w-5" /> 새 질문 추가
                    </button>
                </div>

                {/* 편집 모달/폼 */}
                {editingFaq && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <Card className="w-full max-w-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>{editingFaq.id ? "FAQ 수정" : "새 FAQ 추가"}</CardTitle>
                                <button onClick={() => setEditingFaq(null)}><X className="h-6 w-6" /></button>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSave} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">카테고리</label>
                                        <select
                                            value={editingFaq.category}
                                            onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                                            className="w-full border rounded-lg p-2"
                                        >
                                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">질문</label>
                                        <input
                                            type="text"
                                            value={editingFaq.question}
                                            onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                                            className="w-full border rounded-lg p-2"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">답변 (마크다운 **굵게** 지원)</label>
                                        <textarea
                                            rows={6}
                                            value={editingFaq.answer}
                                            onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                                            className="w-full border rounded-lg p-2"
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button type="button" onClick={() => setEditingFaq(null)} className="px-4 py-2 border rounded-lg">취소</button>
                                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg">저장하기</button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* 목록 */}
                <div className="space-y-4">
                    {CATEGORIES.map(cat => (
                        <div key={cat} className="space-y-2">
                            <h2 className="text-lg font-bold text-gray-400 mt-6 mb-2">{cat}</h2>
                            {faqs.filter(f => f.category === cat).map((faq) => (
                                <div key={faq.id || faq.question} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
                                    <div className="flex-grow">
                                        <p className="font-bold text-gray-800">{faq.question}</p>
                                        <p className="text-sm text-gray-500 line-clamp-1">{faq.answer}</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <button
                                            onClick={() => setEditingFaq(faq)}
                                            className="p-2 text-gray-400 hover:text-primary transition-all"
                                        >
                                            <Pencil className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => faq.id && handleDelete(faq.id)}
                                            className="p-2 text-gray-400 hover:text-destructive transition-all"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </main>
            <BottomTabBar />
        </div>
    );
}
