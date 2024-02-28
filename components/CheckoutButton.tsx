"use client"
import { db } from '@/firebase';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import LoadSpinner from './ui/LoadSpinner';
import { useSetSubscription } from '@/store/store';
import ManageAccountButton from './ui/ManageAccountButton';

export default function CheckoutButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const subscription = useSetSubscription((state)=>state.subscription);
  const isSubscriped  = subscription?.status ==="active" && subscription.role==="pro";
  const isLoadingSubscription = subscription === undefined;
;
  const createCheckoutSession = async () => {
    if (!session?.user.id) return;
    setLoading(true);
    const docRef = await addDoc(collection(db, "customers", session.user.id, "checkout_sessions"), {
      price: "price_1Oo2XWCmJhviPqG6MSpT8Tyo",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
      role: "pro"
    });
    return onSnapshot(docRef, snap => {
      const data = snap.data();
      const error = data?.error;
      const url = data?.url;

      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
        setLoading(false);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
        setLoading(true);
      }
    });

  }
  return (
    <div className='flex flex-col  space-y-2'>
      { }
      <div className="mt-8  rounded-md bg-indigo-500 px-3 py-2 text-center    text-sm font-semibold leading-7 text-white hover:bg-indigo-200 focus-visible:outline-2 focus-visible:outline-offset-2  
    cursor-pointer disabled:opacity-80"> 
    {isSubscriped ? ( <ManageAccountButton/>): isLoadingSubscription || loading ? (<LoadSpinner/>):(
      <button onClick={() => createCheckoutSession()}>Sign Up</button>
    ) }
    </div>
    </div>
  )
}
