'use client'

import { useRouter } from "next/navigation";
import { CategoryFilter } from "./category-filter";

const CATEGORIES = ["초음파 진단", "사상체질", "다이어트", "추나 요법", "교통사고", "한약"];

export function ColumnsFilter({ initialCategory }: { initialCategory: string }) {
    const router = useRouter();

    const handleCategorySelect = (category: string) => {
        if (category === "전체") {
            router.push("/columns");
        } else {
            router.push(`/columns?category=${encodeURIComponent(category)}`);
        }
    };

    return (
        <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={initialCategory || "전체"}
            onSelectCategory={handleCategorySelect}
        />
    );
}
