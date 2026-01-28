'use client'

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            <button
                onClick={() => onSelectCategory("전체")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === "전체"
                        ? "bg-medical-blue text-white shadow-lg"
                        : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                    }`}
            >
                전체
            </button>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                            ? "bg-medical-blue text-white shadow-lg"
                            : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
