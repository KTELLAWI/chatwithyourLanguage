// "use client"
import { generatePortalLink } from '@/actions/generatePortalLinks'
import React from 'react'

function ManageAccountButton() {
  return (
    <form action = {generatePortalLink}>
     <button type='submit'>Manage Billing</button>
    </form>
  )
}

export default ManageAccountButton