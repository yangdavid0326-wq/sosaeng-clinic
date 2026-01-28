'use client'

import { useIsMobile } from "@/hooks/use-media-query";
import { ChatInterface } from "@/components/chat/chat-interface";
import { ChatBottomSheet } from "@/components/chat/chat-bottom-sheet";
import { InfoPanel } from "@/components/info-panel";

/**
 * 반응형 레이아웃
 * - 데스크톱: Split Screen (좌: AI 채팅, 우: 정보창)
 * - 모바일: 정보창 우선 표시 + Bottom Sheet (AI 채팅)
 */
export function ResponsiveLayout() {
    const isMobile = useIsMobile();

    if (isMobile) {
        // 모바일: 정보창 우선 + Bottom Sheet 채팅
        return (
            <>
                <InfoPanel />
                <ChatBottomSheet />
            </>
        );
    }

    // 데스크톱: Split Screen
    return (
        <div className="grid grid-cols-2 h-[calc(100vh-4rem)] max-h-[1000px]">
            {/* 좌측: AI 채팅 */}
            <div className="border-r">
                <ChatInterface />
            </div>

            {/* 우측: 정보창 */}
            <div className="overflow-y-auto">
                <InfoPanel />
            </div>
        </div>
    );
}
