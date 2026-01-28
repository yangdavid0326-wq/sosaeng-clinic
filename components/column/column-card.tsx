'use client'

import Image from "next/image";
import Link from "next/link";


interface ColumnCardProps {
    title: string;
    slug: string;
    category: string;
    thumbnailUrl: string;
    imageAlt?: string;
    createdAt: string;
}

export function ColumnCard({ title, slug, category, thumbnailUrl, imageAlt, createdAt }: ColumnCardProps) {
    return (
        <Link href={`/post/${slug}`} className="block group">
            <div className="flex flex-col md:flex-row gap-6 p-4 rounded-3xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="relative w-full md:w-48 aspect-video md:aspect-square flex-shrink-0 overflow-hidden rounded-2xl">
                    <Image
                        src={thumbnailUrl || "/images/placeholder.jpg"}
                        alt={imageAlt || title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="flex flex-col justify-between py-2 text-left">
                    <div className="space-y-3">
                        <span className="inline-block px-3 py-1 rounded-full bg-medical-blue/5 text-medical-blue text-xs font-bold">
                            {category}
                        </span>
                        <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-medical-blue transition-colors">
                            {title}
                        </h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                        {new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(createdAt))}
                    </p>
                </div>
            </div>
        </Link>
    );
}
