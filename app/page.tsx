import PricingCards from '@/components/PricingCards'
import Image from 'next/image'

export default function Home() {
  return (
 <>
 <div className='justify-center '>
 <PricingCards redirect={true} />
 </div> 
 </>

  );
}
