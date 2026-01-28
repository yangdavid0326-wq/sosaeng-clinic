'use client'

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ChatInterface } from "./chat-interface";

/**
 * 모바일용 Bottom Sheet AI 채팅
 */
export function ChatBottomSheet() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* 고정 플로팅 버튼 */}
            <div className="fixed bottom-6 right-6 z-40">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button
                            size="lg"
                            className="rounded-full h-14 w-14 shadow-lg"
                        >
                            <MessageSquare className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="bottom"
                        className="h-[80vh] p-0"
                    >
                        <div className="h-full">
                            <ChatInterface />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
