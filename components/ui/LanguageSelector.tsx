import { LanguageSupportedMap, LanguagesSupported, useLanguageStore, useSetSubscription,  } from '@/store/store'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname } from 'next/navigation';
import React from 'react'
import LoadSpinner from './LoadSpinner';
import Link from 'next/navigation';

function LanguageSelector() {
    const [language,setLanguage,getLanguages,getNotSupportedLanguages]=useLanguageStore((state)=>[state.language,state.getLanguages,state.getNotSupportedLanguages,state.setLanguage])
    // const [language, setLanguage, getLanguages, getNotSupportedLanguages] = useLanguageStore((state) => [state.language, state.getLanguages, state.getNotSupportedLanguages, state.setLanguage]);
    const subscription = useSetSubscription((state) => state.subscription);
    // const isPro = subscription?.role === "pro" && subscription.status === "active";

    const pathName = usePathname();
    const chatPage = pathName.includes('/chat');
    return (
        chatPage && (
            <div>
                <Select
                    onValueChange={(value:LanguagesSupported) => setLanguage(value)}>

                    <SelectTrigger className="flexbox text-black dark:text-white">
                        <SelectValue
                            placeholder={LanguageSupportedMap[language]}
                            className=""
                        />
                    </SelectTrigger>

                    <SelectContent>
                        {subscription === undefined ? (
                            <LoadSpinner />
                        ) : (
                            <>
                                {getLanguages(isPro).map((language) =>
                                    <SelectItem key={language} value={language}>
                                        {LanguageSupportedMap[language]}
                                    </SelectItem>
                                )}

                                {getNotSupportedLanguages()
                                .map((language) =>
                                    <Link href="/register" key={language.prefetch(false)}>
                                        <SelectItem
                                            key={language}
                                            value={language}
                                            disabled
                                            className="bg-gray-300 text-gray-500 dark:text-white py-2"
                                        >
                                            {LanguageSupportedMap[language]} (pro)
                                        </SelectItem>
                                    </Link>
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