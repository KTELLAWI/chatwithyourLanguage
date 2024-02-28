"use client"

import { useSetSubscription } from '@/store/store'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function upgradeBanner() {
    const subscription = useSetSubscription((state)=>state.subscription);
    const isPro = subscription?.role ==="pro";
    const router = useRouter();
console.log("sub",subscription);
    if (subscription === undefined || isPro) return null;
  return (
    <button onClick={()=>router.push("/register")} 
    className='w-full rounded-none bg-gradient-to-r from-[#777506] to-black text-white text-center  px05 py-2 '
    >

    Upgrade to Pro Version to unlock more features
    </button>
  )
}
