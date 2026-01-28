"use client"

import Link from "next/link";

interface PrivacyConsentProps {
    id?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    required?: boolean;
}

export function PrivacyConsent({ id = "privacy-consent", checked, onChange, required = true }: PrivacyConsentProps) {
    return (
        <div className="flex items-start space-x-3 py-4 border-t border-b border-gray-100 my-4 bg-gray-50 p-4 rounded-xl">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                required={required}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-medical-blue focus:ring-medical-blue cursor-pointer"
            />
            <div className="grid gap-1.5 leading-none">
                <label
                    htmlFor={id}
                    className="text-sm font-bold leading-none cursor-pointer text-gray-900"
                >
                    개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">
                    상담 서비스 제공을 위해 최소한의 개인정보를 수집 및 이용하는 것에 동의합니다.{" "}
                    <Link href="/privacy-policy" target="_blank" className="text-medical-blue underline underline-offset-4 font-bold">
                        [전문 보기]
                    </Link>
                </p>
            </div>
        </div>
    );
}
