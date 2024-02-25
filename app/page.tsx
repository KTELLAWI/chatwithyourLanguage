import PricingCards from '@/components/PricingCards'
import Image from 'next/image'

export default function Home() {
  return (
 <>
 <div className=' flex  justify-center '>
 <PricingCards redirect={true} />
 </div> 
 </>

  );
}
