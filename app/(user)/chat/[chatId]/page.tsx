import { authOptions } from "@/auth";
import AdminControls from "@/components/ui/AdminControls";
import ChatInput from "@/components/ui/ChatInput";
import ChatList from "@/components/ui/ChatList";
import ChatMessage from "@/components/ui/ChatMessage";
import ChatmemberBadges from "@/components/ui/ChatmemberBadges";
import { chatMemberRef } from "@/lib/conveter/chatConverter";
import { messageRef, sortedMessageRef } from "@/lib/conveter/message";
import { Item } from "@radix-ui/react-dropdown-menu";
import { doc, getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    chatId: string;
  }
}
export default async function ChatPage({ params: { chatId } }: Props) {
  const session = await getServerSession(authOptions);
  const initialMessage = (await getDocs(sortedMessageRef(chatId))).docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      timestamp: null,//data?.timestamp?.toISOString,
    }
  });
  //  vv

 const hasAccess = (await getDocs(chatMemberRef(chatId))).docs.map((doc)=>doc.id).includes(session?.user.id);

 if (!hasAccess) redirect("/chat?error=permession");
  return (
    <>
    <div className="flex flex-wrap justify-between">
    <ChatmemberBadges chatId={chatId}/>
    <AdminControls chatId={chatId}/>
    
    </div>
    <div className="flex flex-col ">
    
    </div>
  
      <div className="flex-1">
        <ChatMessage
          chatId={chatId}
           initialMessage={initialMessage}
         session={session!}
        />
      </div>
      {/* <ChatList/> */}
      <ChatInput chatId={chatId} />
     


    </>

  );
}
