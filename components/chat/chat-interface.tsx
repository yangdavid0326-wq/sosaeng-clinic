'use client'

import { useChat } from 'ai/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { replaceForbiddenWords } from "@/lib/content-filter";

/**
 * AI 채팅 인터페이스
 * Vercel AI SDK의 useChat 훅 사용
 */
export function ChatInterface() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
    });

    // 금칙어 필터링을 적용한 제출
    const handleFilteredSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const filteredInput = replaceForbiddenWords(input);

        if (filteredInput !== input) {
            alert('일부 표현이 의료법에 위배될 수 있어 수정되었습니다.');
        }

        handleSubmit(e);
    };

    return (
        <div className="flex flex-col h-full">
            {/* 헤더 */}
            <div className="p-4 border-b bg-muted/40">
                <h2 className="text-lg font-semibold">AI 상담</h2>
                <p className="text-sm text-muted-foreground">
                    궁금한 점을 편하게 물어보세요
                </p>
            </div>

            {/* 메시지 목록 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-muted-foreground mb-4">
                                안녕하세요! 소생한의원 AI 상담입니다.
                            </p>
                            <p className="text-sm text-muted-foreground">
                                증상이나 진료에 대해 궁금한 점을 물어보세요.
                            </p>
                        </div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            <Card
                                className={`max-w-[80%] p-4 ${message.role === 'user'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                    }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </Card>
                        </div>
                    ))
                )}

                {isLoading && (
                    <div className="flex justify-start">
                        <Card className="max-w-[80%] p-4 bg-muted">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </Card>
                    </div>
                )}
            </div>

            {/* 입력창 */}
            <div className="p-4 border-t">
                <form onSubmit={handleFilteredSubmit} className="flex gap-2">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder="메시지를 입력하세요..."
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
