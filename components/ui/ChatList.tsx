import { authOptions } from '@/auth';
import { chatMembersCollectionGroupRef } from '@/lib/conveter/chatConverter';
import { timeStamp } from 'console';
import { doc, getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth'
import React from 'react'
import ChatListRow from './ChatListRow';
import ChatMessage from './ChatMessage';

async function ChatList() {
    const session = await getServerSession(authOptions);
    console.log("session", session);
    const chatSnapshots = await getDocs(chatMembersCollectionGroupRef(session?.user.id));
    const initialChats = chatSnapshots.docs.map((doc) => (
        {
            ...doc.data(),
            timestamp: null,
        }
    )

    );
    console.log("sssssssssssssssssssssssssssssssssssss", initialChats);
    return (
        <div>
         

            <ChatListRow initialChats={initialChats}/>
            {/* <ChatMessage chatId="db1175cf-f1a6-4783-8cbc-54e83ecd86cf"/> */}
        </div>
    )
}

export default ChatList