"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { MessageSquarePlus } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSetSubscription } from '@/store/store'
import { limitToLast, serverTimestamp, setDoc } from 'firebase/firestore'
import { chatRef } from '@/lib/conveter/chatConverter'
import LoadSpinner from './ui/LoadSpinner'

export default function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // adding toast 
  const subscription = useSetSubscription((state) => state.subscription);



  const createNewChat = async () => {
    if (!session) {
      return;
    }
    setLoading(true);
    ///sent toadt noti
    // toast({
    //   titiel:"chat is being created",
    //   description:"Hold tight while we create your new chat",
    //   duration:3000,
    // })

    const chatId = "fff";//uuidv4();
    await setDoc(chatRef(chatId, session.user.id), {
      userId: session.user.id,
      email: session.user.email,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    }).then(() => {
      //toast({
      //   titiel:"sucess",
      //   description:"your chat has been created",
      //   duration:3000,
      // })
      router.push(`/chat/${chatId}`)
    }
    ).catch((

    ) => {
      // /toast({
      //   titiel:"sucess",
      //   description:"your chat has been created",
      //   duration:3000,
      // })
      router.push(`/chat/${chatId}`);
    }

    ).finally(() => {
      setLoading(false);
    });

  }
  if (isLarge)
    return (
      <Button variant={"ghost"} onClick={createNewChat}>

        {loading ? <LoadSpinner /> : "create New chat "}
      </Button>
    );
  return (
    <Button variant={"default"} onClick={createNewChat}>

      <MessageSquarePlus />
    </Button>
  )
}
