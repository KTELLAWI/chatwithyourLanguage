import { db } from "@/firebase";
import { Subscription } from "@/type/subscriptions";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot,SnapshotOptions, collection, doc, query,where } from "firebase/firestore";



export interface ChatMember {
    userId:string,
    email:string,
    timestamp:Date | null,
    isAdmin:boolean,
    chatId:string,
    image:string

}

const chatMemberConverter:FirestoreDataConverter<ChatMember>={

 toFirestore:function (member:ChatMember):DocumentData{
    return {
        userId: member.userId,
            email: member.email,
            timestamp: member.timestamp ,
            isAdmin: !!member.isAdmin,
            chatId: member.chatId,
            image: member.image,

 }
},
 fromFirestore :function(snapshot:QueryDocumentSnapshot,options:SnapshotOptions) : ChatMember {
    
    const data = snapshot.data(options);
   return {
            userId: snapshot.id,
            email: data.email,
            timestamp: data.timestamp.toDate() ,
            isAdmin: data.isAdmin,
            chatId: data.chatId,
            image: data.image,
   }

  //  return sub;
     
 },


}
export const chatRef=(chatId:string,userId:string)=>doc(db,"chats",chatId,"members",userId).withConverter(chatMemberConverter);

export const chatMemberRef=(chatId:string)=> collection(db,"chats",chatId,"members").withConverter(chatMemberConverter);
export const chatMemberAdminRef=(chatId:string)=> query(collection(db,"chats",chatId,"members"),where("isAdmin","==" ,true)).withConverter(chatMemberConverter);
export const chatMembersCollectionGroupRef=(userId:string)=>query(collection(db,"members",),where("userId", "==", userId)).withConverter(chatMemberConverter);