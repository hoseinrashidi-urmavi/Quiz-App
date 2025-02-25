import Link from 'next/link';
import { quiz } from './data';


export default function Home(){


   return(
    <main>

         <div className=' h-96 w-96 rounded-xl flex items-center justify-center flex-col'>

         <h1 className='text-white text-2xl font-moraba'> اپلکیشن آزمون تستی  </h1>
<Link href="/quiz">
<button className='bg-[#ff990a] text-[#010513] px-8 py-2 rounded-lg mt-4 font-moraba'>شروع آزمون</button>
</Link>

         </div>
        
    </main>
   )




}