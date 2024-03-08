"use client"
import React, {Dispatch ,SetStateAction, useState } from 'react'
import { Button } from './button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from './input';
import { Label } from './label';
import { useToast } from './use-toast';
  
  

function SharLink({ isOpen, chatId, setIsOpen }: { isOpen: boolean, chatId: string, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
    const {toast} = useToast();
    const host =  typeof window !== 'undefined' ? window.location.host : '';
     const linktToChat = process.env.NODE_ENV == "development" ? `http://${host}/chat/${chatId}`:`https://${host}/chat/${chatId}`;    
    async function copyToClipboard(){
        try {
           await navigator.clipboard.writeText(linktToChat); 
           toast({
            title:"Copied sucessfuly",
            description:"Share this link with person you want to chat wit him ",
            className:"bg-green-600 text-white", 
           })
        } catch (error) {
            console.log("error",error);
        }
    }
     return (
        <Dialog
            onOpenChange={(open) => setIsOpen(open)}
            open={isOpen}
        >
            <DialogTrigger asChild>
                <Button variant="outline">
                    Copy Link
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md">
                <DialogTitle>Share Link</DialogTitle>

                <DialogDescription>
                    Any user who has been
                    <span className="text-indigo-600 font-bold">granted access</span>
                    can use this link.
                </DialogDescription>

                <div className="flex items-center space-x-2">
                    <Label htmlFor="link" className="sr-only">
                        Link
                    </Label>

                    <Input id="link" defaultValue={linktToChat} readOnly />

                    <Button
                        type="button"
                        onClick={() => copyToClipboard()}
                        size="sm"
                        className=""
                    >
                        Copy
                    </Button>
                </div>

                {/* ... Other components and logic */}

            </DialogContent>
        </Dialog>
    );

}

export default SharLink