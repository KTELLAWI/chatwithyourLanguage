import ChatList from "@/components/ui/ChatList";

type prop = {
    param?:{};
    searhParams?:{
        error?:string,
        
    };
};
export default function ChatsPage({}:prop ) {
    return (
   <>
   <div className='flex  justify-center '>
   </div> 
   <ChatList/>
   </>
  
    );
  }
  