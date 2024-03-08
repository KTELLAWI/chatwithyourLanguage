"use client"
import { useSession } from 'next-auth/react';
import React, { use, useState } from 'react'
import * as z from "zod";
import { useToast } from './use-toast';
import { useSetSubscription } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import SharLink from './SharLink';
import { Button } from './button';
import { ToastAction } from './toast';
import { chatMemberRef, chatRef } from '@/lib/conveter/chatConverter';
import { getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { getUserByEmailRef } from '@/lib/conveter/user';
import { Form, FormControl, FormField, FormItem, FormMessage } from './form';
import { Input } from './input';

// const formscheme = z.object({
//     email: z.string().email("Please entaer an Vlied email"),
// });

const formscheme = z.object({
    email: z.string().email("Please entaer an Vlied email"),
});
function InviteUser({ chatId }: { chatId: string }) {
    const { data: session } = useSession();
    const { toast } = useToast();
    const router = useRouter();
    const subscription = useSetSubscription((state) => state.subscription);
    const [open, setOpen] = useState(false);
    const [openInviteLink, setOpenInviteLink] = useState(false);

    const form = useForm<z.infer<typeof formscheme>>({
        resolver: zodResolver(formscheme),
        defaultValues: {
            email: ""
        }
    });

    async function onSubmit(values: z.infer<typeof formscheme>) {
        if (!session?.user.id) return;

        toast({
            title: "Sending invite",
            description: "Please wait while we send the invite...",
        });

        // We need to get the users current chats to check if they're about to exceed the PRO plan
        const noOfUsersInChat = (await getDocs(chatMemberRef(chatId))).docs.map(
            (doc) => doc.data()
        ).length;

        // Check if the user is about to exceed the PRO plan which is 3 chats
        const isPro =
            subscription?.role === "pro" && subscription.status === "active";

        // if (!isPro && noOfUsersInChat >= 12) {
        //     toast({
        //         title: "Free plan limit exceeded",
        //         description:
        //             "You have exceeded the limit of users in a single chat for the FREE plan. Please upgrade to PRO to continue adding users to chats!",
        //         variant: "destructive",
        //         action:
        //             <ToastAction
        //                 altText="Upgrade"
        //                 onClick={() => router.push("/register")}
        //             >
        //                 Upgrade to PRO
        //             </ToastAction>
        //     });

        //     return;
        // }

        const queryClientByEmail = await getDocs(getUserByEmailRef(values.email));
        if (queryClientByEmail.empty) {
            toast({
                title: "User not found",
                description:
                    "Please add email for registred user ",
                variant: "destructive",

            });
        }
        else {
            const user = queryClientByEmail.docs[0].data();
            await setDoc(chatRef(chatId, user.id), {
                userId: user.id!,
                email: user.email!,
                timestamp: serverTimestamp(),
                chatId: chatId,
                isAdmin: false,
                image: user.image || "",


            }).then(() => {
                setOpen(false);
                toast({
                    title: "Added to chat",
                    description:
                        "User has been added",
                    variant: "destructive",

                }); 
                setOpenInviteLink(true);       
            }
            ).catch( ()=>{
                setOpen(false);
                toast({
                    title: "Error",
                    description:
                        "User has not been added",
                    variant: "destructive",

                }); 
            })
            .finally()
        }
        form.reset();
    }

    return (
        <>
            <Dialog
                onOpenChange={setOpen}
                open={open}
            >
                <DialogTrigger asChild>
                    <Button variant="outline">
                        Invite user
                    </Button>
                </DialogTrigger>
                <DialogContent className="dialogContent">
                    <DialogHeader>
                        <DialogTitle>Add User to Chat</DialogTitle>
                        <DialogDescription>
                            Simply enter another user's email address to invite them to this chat!
                            <span className="text-indigo-600 font-bold">
                                (Note: they must be registered)
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col space-y-2">
                            {/* <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <>
                                    <FormControl>
                                        <Input placeholder="johndoe@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </>
                            )}
                        /> */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        {/* <FormLabel>Username</FormLabel> */}
                                        <FormControl>
                                            <Input placeholder="johndoe@example.com" {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="ml-auto sm:w-fit w-full" type="submit">
                                Add To Chat
                            </Button>
                        </form>
                    </Form>
                </DialogContent>

                <SharLink isOpen={openInviteLink} setIsOpen={setOpenInviteLink} chatId={chatId} />
            </Dialog>
        </>
    )
}

export default InviteUser