import React from 'react'
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Skeleton } from './skeleton';
import { RowSpacingIcon } from '@radix-ui/react-icons';
import { Message, limitedStoredMessagesRef } from '@/lib/conveter/message';
import { useSession } from 'next-auth/react';
import { authOptions } from '@/auth';
import { useRouter } from 'next/router';
import UserAvatar from '../UserAvatar';
function ChatRow({ chatId }: { chatId: string }) {

    const { data: session } = useSession();
    const router = useRouter();

    const [messages, loading, error] = useCollectionData<Message>(limitedStoredMessagesRef(chatId));
    function prettyUUID(n = 4) {
        return chatId.substring(0, n);
    }

    const row = (message?: Message) => (
        <div key={chatId}
            onClick={() => router.push(`/chat/${chatId}`)}
            className="p-5 items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
        >
            <UserAvatar
                name={message?.user.name || session?.user.name}
                image={message?.user.image || session?.user.image}
            />

            <div className="flex-1">
                <p className="font-bold">
                    {message && "New Chat"}
                    {message ? message.user.name || session?.user.name : toString().split(" ")[0]}
                </p>

                <p className="text-gray-400 line-clamp-1">
                    {message?.translated?.["en"] || "Get the conversation started..."}
                </p>
            </div>

            <div className="text-xs text-gray-400 text-right">
                {new Date(message!.timestamp!).toLocaleTimeString()}
                {"No messages yet"}

                <p className="chat" id={prettyUUID()}></p>
            </div>
        </div>
    );

    return (
        <div>
            {
                loading && (
                    <div className='flex p-5 items-center space-x-2'>
                        <Skeleton className='h-12 w-12 rounded-full' />
                        <div className='h-12 w-12 rounded-full'>
                            <Skeleton className='h-4 w-full' />
                            <Skeleton className='h-4 w-1/4' />
                        </div>
                    </div>
                )
            }
            {messages?.length === 0 && !loading && row()}
            {messages?.map((message) => row(message))}
            { }
        </div>
    )
}

export default ChatRow