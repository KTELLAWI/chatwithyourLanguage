"use client"
import useAdmin from '@/hooks/useAdmin';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useToast } from './use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';

function DeleteChatButton({ chatId }: { chatId: string }) {
    const adminId = useAdmin({ chatId });

    const { data: session } = useSession();
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {

        toast({
            title: 'Deleting chat',
            description: "Please wait while we delete the chat"
        });

        await fetch("/api/chat/delete/", {
            method: "DELETE",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({ chatId: chatId })
        }).then((res)=>{
            toast({
                title: 'Success',
                description: "Your Chat has been deleted ",
                className:"bg-green-60 text-white"
            });
            router.replace('chat');

    
        })
            .catch((error)=>{
                toast({
                    title: 'Error',
                    description: "Your Chat has been deleted ",
                    className:"bg-green-60 text-white"
                });
            })
            .finally(()=>setOpen(false));
    }

    return (
        session?.user.id === adminId && (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="destructive">Delete Chat</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This will delete the chat for all users.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-2 space-x-2">
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>

                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    );

}

export default DeleteChatButton