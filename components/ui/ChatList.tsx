import { authOptions } from '@/auth';
import { chatMembersCollectionGroupRef } from '@/lib/conveter/chatConverter';
import { timeStamp } from 'console';
import { doc, getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth'
import React from 'react'
import ChatListRow from './ChatListRow';

async function ChatList() {
    const session = await getServerSession(authOptions);
    console.log("session",session);
    const chatSnapshots = await getDocs(chatMembersCollectionGroupRef(session?.user.id!));
  const initialChats = chatSnapshots.docs.map((doc)=>(
    {
        ...doc.data(),
        timestamp:null,
      }
  )
 
  );
    return (
    <div>
        <ChatListRow initialChats={initialChats}/>
        </div>
  )
}

export default ChatList