import { authOptions } from '@/auth';
import PricingCards from '@/components/PricingCards'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Register(){
  const session =  await getServerSession(authOptions);

  return (
    <div>
      <PricingCards redirect={false}/>
    </div>
  )
}
