"use client"
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserAvatar from "./UserAvatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { subscriptionRef } from "@/lib/conveter/subscription";
import { useSetSubscription } from "@/store/store";
import { StarIcon } from "lucide-react";
import LoadSpinner from "./ui/LoadSpinner";

function UserButtons({session}:{session:Session | null}) {
  const subscription = useSetSubscription((state)=>state.subscription);
  if(!session) return(
        <Button
        variant={"outline"}
        onClick={()=>signIn()}
        >
            SignIn
        </Button>
    );
  return (
     session &&  (<DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={session?.user?.name!} image="https://github.com/shadcn.png" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      <DropdownMenuLabel>{session?.user?.name!}</DropdownMenuLabel>

        <DropdownMenuSeparator />
        {subscription === undefined &&(
                  <DropdownMenuItem>
                    <LoadSpinner/>
                  </DropdownMenuItem>


        )}

        {
          subscription?.role ==="pro" && (
            <>
             <DropdownMenuLabel>
       <StarIcon fill="#E935C1" animate-pulse/>
        <p>Pro</p>
        </DropdownMenuLabel>
             <DropdownMenuItem>
              {/* {ddd } */}
              </DropdownMenuItem>
            </>
          )
        }
        <DropdownMenuItem onClick={()=>signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
    )
  
  
  );
}

export default UserButtons;
