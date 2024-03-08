import ChatList from "@/components/ui/ChatList";
import ChatMessage from "@/components/ui/ChatMessage";
import ChatPermissionError from "@/components/ui/ChatPermissionError";

type Props = {
    param:{};
    searchParams:{
        error:string;
        
    };
};
export default function ChatsPage({searchParams:{error}}:Props ) {
    return (
   <>
  {
    error &&  (
        <ChatPermissionError/>
    )
  }
   <ChatList/>
   
   </>
  
    );
  }
  