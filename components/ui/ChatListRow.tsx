import { ChatMember } from '@/lib/conveter/chatConverter'
import React from 'react'
import ChatRow from './ChatRow'

function ChatListRow({initialChats}:{initialChats: ChatMember[]}) {
  return (
    <div>
        { initialChats.map((chat)=>(
            <ChatRow chatId={chat.chatId}/>
        ))
        }
        </div>
  )
}

export default ChatListRow