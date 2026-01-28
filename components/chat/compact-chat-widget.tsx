'use client'

import { useChat } from 'ai/react';
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Loader2, ChevronDown, ChevronUp, X } from "lucide-react";
import { replaceForbiddenWords } from "@/lib/content-filter";
import { PrivacyConsent } from "@/components/ui/privacy-consent";
import Image from "next/image";

/**
 * 인라인 확장 가능한 AI 상담 위젯
 */
export function CompactChatWidget() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [hasAgreed, setHasAgreed] = useState(false);
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
    });

    // 확장 시 입력창에 자동 포커스
    useEffect(() => {
        if (isExpanded && !isMinimized && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isExpanded, isMinimized]);

    // 새 메시지가 추가되면 스크롤을 맨 아래로
    useEffect(() => {
        if (messagesEndRef.current && !isMinimized) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isMinimized]);

    const handleFilteredSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!hasAgreed) {
            alert('개인정보 수집 및 이용에 동의해주셔야 상담이 가능합니다.');
            return;
        }

        const filteredInput = replaceForbiddenWords(input);

        if (filteredInput !== input) {
            alert('일부 표현이 의료법에 위배될 수 있어 수정되었습니다.');
        }

        handleSubmit(e);
    };

    const handleExpand = () => {
        setIsExpanded(true);
        setIsMinimized(false);
    };

    const handleCollapse = () => {
        setIsExpanded(false);
        setIsMinimized(false);
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className={`bg-white rounded-[2.5rem] shadow-premium border-0 transition-all duration-500 overflow-hidden ${isExpanded ? 'scale-[1.01]' : 'hover:scale-[1.01]'
            }`}>
            {/* 헤더 */}
            {!isExpanded ? (
                // 축소 상태 헤더 (클릭 가능)
                <div
                    className="p-8 cursor-pointer group"
                    onClick={handleExpand}
                >
                    <div className="flex items-center gap-6">
                        {/* 원장 사진 */}
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-primary/20 shadow-sm transition-transform group-hover:scale-110 duration-500">
                                <Image
                                    src="/images/yang_profile.jpg"
                                    alt="양원장"
                                    width={64}
                                    height={64}
                                    className="object-cover w-full h-full"
                                    priority
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-black text-foreground tracking-tight">온라인 진료 도우미</h3>
                            </div>
                            <p className="text-sm text-muted-foreground/80 leading-relaxed font-medium">
                                궁금하신 점을 물어보세요.<br />
                                24시간 언제든지 답변해 드립니다.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                // 확장 상태 헤더
                <div className="p-6 border-b border-gray-50 bg-sand-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border-2 border-primary/20 shadow-sm">
                            <Image
                                src="/images/yang_profile.jpg"
                                alt="양원장"
                                width={40}
                                height={40}
                                className="object-cover w-full h-full"
                                priority
                            />
                        </div>
                        <div>
                            <h3 className="font-black text-foreground tracking-tight">온라인 진료 도우미</h3>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                <p className="text-[11px] text-muted-foreground font-bold">궁금하신 점을 상세히 답변해 드립니다</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {messages.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleMinimize}
                                className="h-8 px-2 font-bold text-muted-foreground hover:text-primary transition-colors"
                            >
                                {isMinimized ? (
                                    <>
                                        <ChevronDown className="h-4 w-4 mr-1" />
                                        <span className="text-xs">펼치기</span>
                                    </>
                                ) : (
                                    <>
                                        <ChevronUp className="h-4 w-4 mr-1" />
                                        <span className="text-xs">접기</span>
                                    </>
                                )}
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCollapse}
                            className="h-9 w-9 p-0 rounded-full hover:bg-gray-100"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            )}

            {/* 확장 상태 콘텐츠 */}
            {isExpanded && (
                <>
                    {/* 메시지 목록 */}
                    {!isMinimized && (
                        <div className="overflow-y-auto p-6 space-y-6 bg-white relative" style={{ maxHeight: '450px' }}>
                            {/* 배경 로고 패턴 */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/images/gold_logo.png')] bg-center bg-no-repeat bg-contain transform scale-50"></div>

                            <div className="relative z-10 space-y-6">
                                {messages.length === 0 ? (
                                    <div className="h-48 flex items-center justify-center">
                                        <div className="text-center space-y-3">
                                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce duration-[2000ms]">
                                                <Send className="w-6 h-6 text-primary" />
                                            </div>
                                            <p className="text-foreground font-black text-lg tracking-tight">
                                                무엇을 도와드릴까요?
                                            </p>
                                            <p className="text-sm text-muted-foreground/70 font-medium">
                                                증상이나 진료, 예약 안내 등 <br />
                                                편하게 대화를 시작해보세요.
                                            </p>

                                            <div className="mt-8 pt-4 text-left max-w-sm mx-auto">
                                                <PrivacyConsent
                                                    checked={hasAgreed}
                                                    onChange={setHasAgreed}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] px-5 py-3.5 rounded-[1.5rem] shadow-sm tracking-tight ${message.role === 'user'
                                                    ? 'bg-primary text-white rounded-br-none font-bold'
                                                    : 'bg-gray-50 text-foreground rounded-bl-none font-medium border border-gray-100'
                                                    }`}
                                            >
                                                <p className="text-[15px] whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                            </div>
                                        </div>
                                    ))
                                )}

                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="max-w-[85%] px-5 py-3.5 bg-gray-50 rounded-[1.5rem] rounded-bl-none shadow-sm border border-gray-100">
                                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                    )}

                    {/* 입력창 */}
                    <div className="p-6 border-t border-gray-50 bg-white relative z-20">
                        <form onSubmit={handleFilteredSubmit} className="flex gap-3">
                            <Input
                                ref={inputRef}
                                value={input}
                                onChange={handleInputChange}
                                placeholder="메시지를 입력하세요..."
                                disabled={isLoading}
                                className="flex-1 h-12 px-6 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-[15px] font-medium focus:ring-2 focus:ring-primary/20"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={isLoading || !input.trim()}
                                className="rounded-2xl w-12 h-12 shadow-md hover:shadow-lg transition-all active:scale-95 bg-primary text-white"
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </form>
                        <p className="text-[10px] text-muted-foreground/60 text-center mt-4 font-bold tracking-widest uppercase flex items-center justify-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Secure & Confidental Medical Assistant
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
