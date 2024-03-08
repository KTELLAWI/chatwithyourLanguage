import { Subscription } from "@/type/subscriptions";
import { create } from "zustand";

export type LanguagesSupported =
    | "en"
    | "ar"
    | "fr"
    | "es"
    | "ru"
    | "de"
    | "tr";

export const LanguageSupportedMap: Record<LanguagesSupported, string> = {
    en: "English",
    ar: "Arabic",
    de: "German",
    es: "Spainsh",
    ru: "Russian",
    fr: "French",
    tr:"Turkish"


}
const LANGUAGES_IN_FREE = 2;

interface LanguageState {
    language: LanguagesSupported;
    setLanguage: (language: LanguagesSupported) => void;
    getLanguages: (isPro: boolean) => LanguagesSupported[];
    getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];

}
// interface StatOfLanguage {
//     language: LanguagesSupported;
//     setLanguage: (language:LanguagesSupported) => void; 
//     getLanguages: (isPro: boolean) => LanguagesSupported[];
//     getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
// }
export const useLanguage = create<LanguageState>()((set, get) => ({
    language: "tr",
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
})
);
// export const useLanguageStore = create<LanguageState>()((set) => ({
//     language: "en",
//     setTheLanguage: ()=> null,
//     getLanguages: (isPro: boolean) => {
//         if (isPro) {
//             return Object.keys(LanguageSupportedMap) as LanguagesSupported[];
//         }
//         return Object.keys(LanguageSupportedMap).slice(
//             0, LANGUAGES_IN_FREE
//         ) as LanguagesSupported[];
//     },
//     getNotSupportedLanguages: (isPro: boolean) => {

//         if (isPro) {
//             return [];
//         }
//         return Object.keys(LanguageSupportedMap).slice(
//             LANGUAGES_IN_FREE
//         ) as LanguagesSupported[];
//     }

// }));

interface SubscriptonsState {
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null) => void;


}

export const useSetSubscription = create<SubscriptonsState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({ subscription })
}));