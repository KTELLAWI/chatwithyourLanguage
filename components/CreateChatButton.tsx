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
import { useToast } from './ui/use-toast'
import { v4 as uuidv4 } from 'uuid';

export default function CreateChatButton({ isLarge }: { isLarge?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // adding toast 
  const toast= useToast();
  const subscription = useSetSubscription((state) => state.subscription);



  const createNewChat = async () => {
    if (!session) return;

    toast.toast
    ({
      title: "chat is being created",
      description: "Hold tight while we create your new chat",
      duration: 3000,
    });
    setLoading(true);
    ///sent toadt noti


    const chatId = uuidv4();
    await setDoc(chatRef(chatId, session.user.id), {
      userId: session.user.id,
      email: session.user.email,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    }).then(() => {
      toast.toast({
        title:"Success",
        description:"your chat has been created",
        duration:3000,
        
      })
      router.push(`/chat/${chatId}`)
    }
    ).catch((error

    ) => {
      console.log("error",error);
      toast.toast({
        title: "Error",
        description: "your chat has not been created",
        duration: 3000,
      });
    ///  router.push(`/chat/${chatId}`);
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
