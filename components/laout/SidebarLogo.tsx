import { useRouter } from 'next/router'
import React from 'react'
import {BsTwitter} from 'react-icons/bs'

const SidebarLogo: React.FC = () => {
  const router = useRouter();
  return (
    <div onClick={() => {router.push('/')}} className='rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition'>
      <BsTwitter size={28} className='text-blue-400'/>
    </div>
  )
}

export default SidebarLogo