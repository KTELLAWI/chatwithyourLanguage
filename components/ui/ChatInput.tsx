"use client"
import { useSetSubscription } from '@/store/store';
import { useSession } from 'next-auth/react'
import React from 'react'
import { useRef, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { User, limitedMessageRef, messageRef } from '@/lib/conveter/message';
import { toast, useToast } from './use-toast';
import { Router } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { ToastAction } from './toast';
import { Button } from './button';


const formscheme = z.object({
    input: z.string().max(1000),
});

function ChatInput({ chatId }: { chatId: string }) {
    const { toast } = useToast();
    const { data: session } = useSession();
    const subscription = useSetSubscription((state) => state.subscription);
    const router = useRouter();

    const form = useForm<z.infer<typeof formscheme>>({
        resolver: zodResolver(formscheme),
        defaultValues: {
            input: ""
        }
    });

    async function onSubmit(values: z.infer<typeof formscheme>) {
    
         const inputValues= values.input.trim();
        form.reset();

        if (inputValues.length == 0) {
            return;
        }
        if (!session?.user) {
            return;
        }

        //const message = (await getDocs(limitedMessageRef(chatId))).docs.map((doc) => doc.data()).length;
       // const isPro = subscription?.role === "pro" && subscription.status == "active";

        // if (!isPro && message > 20) {
        //     toast({
        //         title: "Free Plan Is Expired",
        //         description: "You have Exceeded your free plan limit , upgrade your plan for unlimited messages",
        //         variant: "destructive",
        //         action: (
        //             <ToastAction altText="Upgrade"
        //                 onClick={() => router.push("/register")}>

        //             </ToastAction>
        //         )


        //     })
        //     return;
        // }

        const userToStore: User = {
            id: session.user.id!,
            name: session.user.name!,
            email: session.user.email!,
            image: session.user.image || "",

        }

     addDoc(messageRef(chatId), {
            
             input:inputValues,
             timestamp:serverTimestamp(),
            user: userToStore,
        });


    }


    return (
        <div className="sticky bottom-0">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full border-x-2 border-t-2 border-x-green-500 border-t-green-500 space-x-2 p-1 rounded-t-xl  mx-auto bg-white border dark:bg-slate-800">
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem className='w-full'>
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Input className='border-b-2 border-b-green-500 w-[100%] flex-1  focus:border-none bg-transparent dark:placeholder:text-white/70' placeholder= "Enter message in ANY language..."{...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  className="" type="submit">Submit</Button>
      </form>
    </Form>
    </div>
        // <div className="sticky bottom-0">

        // </div >
        // <>
        //     <Form {...form}>
        //         <form
        //             onSubmit={form.handleSubmit(onSubmit)} className="">

        //             <FormField
        //                 control={form.control}
        //                 name="input"
        //                 render={({ field }) => (
        //                     <FormControl className="flex-1">
        //                         <Input
        //                             className="border-none bg-transparent dark:placeholder:text-white/70"
        //                             placeholder="Enter message in ANY language..."
        //                             {...field}
        //                         />
        //                         <FormControl>
        //                             <FormMessage />
        //                         </FormControl>
        //                     </FormControl>
        //                 )}
        //             />

        //             <button type="submit" className="bg-violet-600 text-white">
        //                 Send
        //             </button>
        //         </form>

        //     </Form>
        // </>
    )
}

export default ChatInput


