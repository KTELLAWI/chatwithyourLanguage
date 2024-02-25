import React from 'react'
import { Button } from './ui/button'
import { MessageSquarePlus } from 'lucide-react'

export default function CreateChatButton() {
  return (
    <Button variant={"ghost"}>

        <MessageSquarePlus/>
    </Button>
  )
}
