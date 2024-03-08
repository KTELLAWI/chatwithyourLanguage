import { adminDb } from "@/firebase-admin";
import { write } from "fs";
import { NextResponse } from "next/server";

export async function DELETE(req:Request) {
    
    const {chatId} = await req.json();
    const ref = adminDb.collection("chats").doc(chatId);

    const bulkWrite = adminDb.bulkWriter();
    const MAX_ATTEMPTS= 5;

    bulkWrite.onWriteError((error)=>{
        if(error.failedAttempts<MAX_ATTEMPTS)
        {
            return true;
        }
        else
        {
            console.log("Faild write a document");
            return false;

        }

    })


    try {
        await adminDb.recursiveDelete(ref,bulkWrite);
        return NextResponse.json({
            sucess:true,

        },{status:200})
    } catch (error) {
        console.error("Promise Rejected",error);
        return NextResponse.json({success:false},{status:500})
    }


    
}