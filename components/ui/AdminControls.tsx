import React from 'react'
import InviteUser from './InviteUser'
import DeleteChatButton from './DeleteChatButton'

function AdminControls({ chatId }: { chatId: string }) {
  return (
    <div className='flex justify-center md:justify-end  space-x-2 m-5 mb-8  '>
      <InviteUser chatId={chatId} />
      <DeleteChatButton chatId={chatId} />

    </div>
  )
}

export default AdminControls