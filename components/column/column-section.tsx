'use client'

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ColumnCard } from "./column-card";
import { CategoryFilter } from "./category-filter";

const CATEGORIES = ["초음파 진단", "사상체질", "다이어트", "추나 요법", "교통사고", "한약"];

export function ColumnSection() {
    const [columns, setColumns] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchColumns() {
            const { data, error } = await supabase
                .from("health_columns")
                .select("*")
                .order("created_at", { ascending: false });

            if (data) {
                setColumns(data);
            }
            setLoading(false);
        }

        fetchColumns();
    }, []);

    const filteredColumns = selectedCategory === "전체"
        ? columns
        : columns.filter((col) => col.category === selectedCategory);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-foreground">
                        양경욱 원장의 <span className="text-medical-blue">건강 칼럼</span>
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl">
                        소생한의원에서 전해드리는 올바른 건강 정보입니다.
                    </p>
                </div>
            </div>

            <CategoryFilter
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-3xl"></div>
                    ))}
                </div>
            ) : filteredColumns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredColumns.map((col) => (
                        <ColumnCard
                            key={col.id}
                            title={col.title}
                            slug={col.slug || col.id}
                            category={col.category}
                            thumbnailUrl={col.thumbnail_url}
                            imageAlt={col.image_alt}
                            createdAt={col.created_at}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                    <p className="text-muted-foreground">등록된 칼럼이 없습니다.</p>
                </div>
            )}
        </div>
    );
}
