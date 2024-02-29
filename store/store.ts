import { Subscription } from "@/type/subscriptions";
import {create} from "zustand";

export type LanguagesSupported = 
    | "en"
    | "ar"
    | "fr"
    | "es"
    | "ru"
    | "de";

export const LanguageSupportedMap:Record<LnguagesSupported,string> = {
    en:"English",
    ar:"Arabic",
    de:"German",
    es:"Spainsh",
    ru:"Russian",
    fr:"French",


}

interface SubscriptonsState {
    subscription:Subscription | null | undefined;
    setSubscription:(subscription:Subscription|null)=> void;


}

export const useSetSubscription = create<SubscriptonsState>((set)=>({
    subscription:undefined,
    setSubscription:(subscription:Subscription |null) =>set({subscription})
}));