"use client"
import useAdmin from '@/hooks/useAdmin'
import { ChatMember, chatMemberRef } from '@/lib/conveter/chatConverter'
import React, { use } from 'react'
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore'
import LoadSpinner from './LoadSpinner'
import { Badge } from './badge'
import UserAvatar from '../UserAvatar'
import AdminControls from './AdminControls'

function ChatmemberBadges({chatId}:{chatId:string}) {
    const [members,loading,error] = useCollectionData<ChatMember>(chatMemberRef(chatId))

    const adminId = useAdmin({chatId});
    if (loading && !members) return <LoadSpinner />;

    return (
      <div className="p-2 rounded-xl  flex- ">
        <div className="flex wrap justify-center md:justify-start items-center gap-2 p-2">
          {members?.map((member) => (
            <Badge
              variant="secondary"
              key={member.email}
              className="14 p-1 pl-2 pr-5 flex space-x-2"
            >
              <div className="flex items-center space-x-2">
                <UserAvatar name={member.email} image={member.image} />
              </div>
              
              <p>{member.email}</p>
              
              {member.userId === adminId && (
                <p className="text-indigo-400 animate-pulse">Admin</p>
              )}
            </Badge>
          ))}
        </div>
        {/* <AdminControls chatId={chatId}/> */}
      </div>
    );
    
}

export default ChatmemberBadges