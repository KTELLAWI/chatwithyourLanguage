import { Subscription } from "@/type/subscriptions";
import { Languages } from "lucide-react";
import { create } from "zustand";

export type LanguagesSupported =
    | "en"
    | "ar"
    | "fr"
    | "es"
    | "ru"
    | "de";

export const LanguageSupportedMap: Record<LanguagesSupported, string> = {
    en: "English",
    ar: "Arabic",
    de: "German",
    es: "Spainsh",
    ru: "Russian",
    fr: "French",


}
interface LanguageState {
    language: LanguagesSupported,
    setLanguage: (language: LanguagesSupported) => void,
    getLanguages: (isPro: boolean) => LanguagesSupported[],
    getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];

}
const LANGUAGES_IN_FREE = 2
export const useLanguageStore = create<LanguageState>((set, get) => ({
    language: "en",
    setLanguage: (language: LanguagesSupported) => set({ language }),
    getLanguages: (isPro: boolean) => {
        if (isPro) {
            return Object.keys(LanguageSupportedMap) as LanguagesSupported[];
        }
        return Object.keys(LanguageSupportedMap).slice(
            0, LANGUAGES_IN_FREE
        ) as LanguagesSupported[];
    },
    getNotSupportedLanguages: (isPro: boolean) => {

        if (isPro) {
            return [];
        }
        return Object.keys(LanguageSupportedMap).slice(
            LANGUAGES_IN_FREE
        ) as LanguagesSupported[];
    }

}))

interface SubscriptonsState {
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null) => void;


}

export const useSetSubscription = create<SubscriptonsState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({ subscription })
}));