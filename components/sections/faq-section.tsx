'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle, Loader2 } from 'lucide-react';
import { FAQ_DATA as LOCAL_FAQ_DATA } from '@/lib/faq-data';
import { cn } from '@/lib/utils';

interface FAQ {
    id?: string;
    category: string;
    question: string;
    answer: string;
}

const CATEGORIES = ["전체", "진료 안내", "예약/비용", "치료/한약", "기타"];

export function FAQSection() {
    const [faqs, setFaqs] = useState<FAQ[]>(LOCAL_FAQ_DATA);
    const [activeCategory, setActiveCategory] = useState("전체");
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await fetch('/api/faq');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setFaqs(data);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch FAQs:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    const filteredFaqs = activeCategory === "전체"
        ? faqs
        : faqs.filter(faq => faq.category === activeCategory);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-white" id="faq">
            <div className="container max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">
                        자주 묻는 질문
                    </h2>
                    <p className="text-gray-500 text-lg">
                        환자분들이 궁금해하시는 핵심 정보를 모았습니다.
                    </p>
                </div>

                {/* 카테고리 탭 */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                setOpenIndex(null);
                            }}
                            className={cn(
                                "px-5 py-2.5 rounded-full text-sm font-bold transition-all border",
                                activeCategory === cat
                                    ? "bg-primary text-white border-primary shadow-md"
                                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQ 리스트 */}
                <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className={cn(
                                "border rounded-2xl transition-all duration-300 overflow-hidden",
                                openIndex === index
                                    ? "border-primary/30 ring-1 ring-primary/10 shadow-lg bg-primary/[0.02]"
                                    : "border-gray-100 hover:border-gray-200 bg-white"
                            )}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                            >
                                <div className="flex items-center gap-4">
                                    <span className={cn(
                                        "hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black",
                                        openIndex === index ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
                                    )}>
                                        Q
                                    </span>
                                    <h3 className={cn(
                                        "text-base md:text-lg font-bold leading-tight",
                                        openIndex === index ? "text-primary" : "text-gray-800"
                                    )}>
                                        {faq.question}
                                    </h3>
                                </div>
                                <div className={cn(
                                    "flex-shrink-0 ml-4 transition-transform duration-300 p-1 rounded-full",
                                    openIndex === index ? "bg-primary/10 text-primary rotate-180" : "bg-gray-50 text-gray-400"
                                )}>
                                    <ChevronDown className="h-5 w-5" />
                                </div>
                            </button>

                            <div className={cn(
                                "grid transition-all duration-300 ease-in-out",
                                openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            )}>
                                <div className="overflow-hidden">
                                    <div className="p-5 md:p-6 pt-0 border-t border-gray-50/50">
                                        <div className="flex gap-4">
                                            <span className="hidden md:block text-xs font-black text-gray-300 mt-1">A</span>
                                            <div className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                                {faq.answer.split('\n').map((line, i) => (
                                                    <p key={i} className={line.trim() === "" ? "h-2" : ""}>
                                                        {line.includes('**') ? (
                                                            line.split('**').map((part, pi) => (
                                                                pi % 2 === 1 ? <strong key={pi} className="text-gray-900">{part}</strong> : part
                                                            ))
                                                        ) : line}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200 text-center">
                    <p className="text-gray-500 mb-4">원하시는 답변을 찾지 못하셨나요?</p>
                    <a
                        href="tel:02-1234-5678"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-700 hover:shadow-md transition-all"
                    >
                        <HelpCircle className="h-5 w-5 text-primary" />
                        전화로 직접 문의하기
                    </a>
                </div>
            </div>
        </section>
    );
}
