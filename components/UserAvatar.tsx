import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function UserAvatar({
  name,
  image,
  className,
}: {
  name: string | null;
  image: string;
  className?: string;
}) {
  return (
    <Avatar className={cn("bh-white text-black",className)}>
        {image && (
            <Image
            src={image}
            alt={name!}
            width={40}
            height={40}
            className="rounded-full"/>
        )}
      
      <AvatarFallback className="bg-white dark:text-black text-lg">
        {
            name?.split(" ").map((n)=>n[0]).join("")

        }
      </AvatarFallback>
    </Avatar>
  );
}
