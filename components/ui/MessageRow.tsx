"use client"
import React, { useEffect, useRef } from 'react'
import UserAvatar from '../UserAvatar'
import LoadSpinner from './LoadSpinner'
import { useLanguage } from '@/store/store'
import { Message, sortedMessageRef } from '@/lib/conveter/message'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { MessageCircleIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'

function MessageRow({message,isSender,chatId}:{message?:Message,isSender?:boolean,chatId:string}) {
    const divRef = useRef<HTMLDivElement>(null);
    const { data: session } = useSession();  
      const language = useLanguage((state) => state.language);
    const [messages, loading, error] = useCollectionData<Message>(
        sortedMessageRef(chatId),
        // {
        //     initialValue: initialMessage,
        // }
    );

    useEffect(() => {
        // if (messagesEndRef.current) {
        //     console.log("ddddddddddddddddddddddddddddddddddddvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
        //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        // }
        if (divRef.current) {
            if (messages?.length == 0 || messages?.length! <= 3) {
                window.scrollTo(0, 0);

            }
            else {
                divRef.current.scrollIntoView({ behavior: 'smooth' });
            }

        }

    }, [divRef,messages]) 
  return (
    <div className='p-5 flex-1 '>
            {
                !loading && 
                messages?.length === 0 && (
                    <div className="flex flex-1  flex-col justify-center items-center p-28 rounded-xl space-y-2 bg-indigo-400 text-white font-extralight">
                        <MessageCircleIcon className="h-10 w-10" />
                        <span className="font-bold">Invite a friend</span>
                        <span className="font-bold text-green-400">
                            Send your first message in any language
                            to get started!
                        </span>
                        <p>The AI will auto-detect & translate it all for you!</p>
                    </div>
                )
            }
  
    {messages?.map((message, index) => {
                const isSender =message.user.id === session?.user.id;
                return( 
                    <div key={index} className="flex my-2 ">
                    <div
                    className={`flex-col relative space-y-2 w-fit line-clamp-1 mx-2 rounded-lg ${isSender
                            ? "ml-auto bg-violet-600 text-white rounded-br-none p-2"
                            : "bg-gray-100 dark:text-gray-900 dark:bg-slate-700 rounded-bl-none"
                        }`}
                >
                    <p className={`text-xs italic font-extralight line-clamp-1 ${isSender ? "text-right" : "text-left"} `}>
                    
                        {message?.user?.name.split(" ")[0]}
                    </p>
                    <div className="flex space-x-2">
                        <p>{message.translated?.[language] || message.input}</p>
                        {!message.translated && <LoadSpinner />}
                    </div>
                </div>
            
                <UserAvatar
                    name={message.user.name}
                    image={message.user.image}
                    className={`${isSender && "order-1"}`}
                />

                </div>
                )})}
                <div ref={divRef}>

</div>
    
    </div>
  )
}

export default MessageRow