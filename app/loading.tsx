import LoadSpinner from '@/components/ui/LoadSpinner'
import React from 'react'

function loading() {
  return (
    <div className='flex items-center p-10 justify-center'><LoadSpinner/> </div>
  )
}

export default loading