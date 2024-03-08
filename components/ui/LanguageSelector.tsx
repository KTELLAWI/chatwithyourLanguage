"use client"
import { LanguageSupportedMap, LanguagesSupported, useLanguage, useSetSubscription, } from '@/store/store'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname } from 'next/navigation';
import React from 'react'
import LoadSpinner from './LoadSpinner';
import Link from "next/link";

function LanguageSelector() {
    const subscription = useSetSubscription((state) => state.subscription);
    const isPro = subscription?.role === "pro" && subscription.status === "active";
    const [changLanguage,newLanguage,getLanguages,getNotSupportedLanguages] = useLanguage((state) => [state.setLanguage,state.language,state.getLanguages,state.getNotSupportedLanguages]);
   
    const changllll = (value: LanguagesSupported) => {
        console.log(value);
        changLanguage(value);
        console.log("lllllllllllllllllllllll", newLanguage);


    }
    const pathName = usePathname();
    const chatPage = pathName.includes('/chat');
    return (
        chatPage && (
            <div>
                <Select
                    onValueChange={(value: LanguagesSupported) => changllll(value)}>

                    <SelectTrigger className="flexbox text-black dark:text-white">
                        <SelectValue
                            placeholder={LanguageSupportedMap[newLanguage]}
                            className=""
                        />
                    </SelectTrigger>

                    <SelectContent>
                        {subscription === undefined ? (
                            <LoadSpinner />
                        ) : (
                            <>
                                {getLanguages(isPro).map((language, index) =>
                                    <SelectItem key={index} value={language}>
                                        {LanguageSupportedMap[language]}
                                    </SelectItem>
                                )}

                                {getNotSupportedLanguages(isPro)
                                    .map((language) => (

                                        <Link href="/register" key={language} prefetch={false} >
                                            <SelectItem
                                                key={language}
                                                value={language}
                                                disabled
                                                className="bg-gray-300 text-gray-500 mt-1 dark:text-white py-2"
                                            >
                                                {LanguageSupportedMap[language]} (pro)
                                            </SelectItem>
                                        </Link>
                                    )

                                    )}
                            </>
                        )}
                    </SelectContent>
                </Select>
            </div>
        )
    );

}

export default LanguageSelector