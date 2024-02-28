"use client"
import { subscriptionRef } from '@/lib/conveter/subscription';
import { useSetSubscription } from '@/store/store';
import { onSnapshot } from 'firebase/firestore';
import { stat } from 'fs';
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

export default function SubscriptioProvider({children}:{
  children:React.ReactNode
}) {
const {data:session} = useSession();
const setSubscription = useSetSubscription((state)=>state.setSubscription)
useEffect(
  ()=>{
    if(!session) return;
      return  onSnapshot(subscriptionRef(session.user.id),(snapshot)=>{

        if(snapshot.empty){
          console.log("user has no subscription");
          setSubscription(null);
          
        }
        else{
          console.log("user has subscription ");
          setSubscription(snapshot.docs[0].data());

        }
      },
      (error) =>{
        console.log("Error getting documents",error);
      }
      )}
,[session,setSubscription])

 

  return (
    <>{children}</>
  )
}
