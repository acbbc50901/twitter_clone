import useCurrentUser from '@/hooks/useCurrentUser'
import useLoginModal from '@/hooks/useLoginModal'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { BsDot } from 'react-icons/bs'
import { IconType } from 'react-icons/lib/esm/iconBase'

interface Props {
  href? : string,
  label : string,
  icon: IconType,
  onClick?: () => void,
  auth?: boolean,
  alert? : boolean
}
const SidebarItem: React.FC<Props> = ({href, label, icon: Icon, onClick, auth, alert}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const {data : currentUser} = useCurrentUser();
  const handleClick = useCallback(() => {
    if (onClick) {
      console.log(onClick);
      return onClick()
    }
    if (auth &&!currentUser) {
      loginModal.onOpen()
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, loginModal])

  return (
    <div onClick={handleClick} className='flex flex-row items-center'>
      <div className=' relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden'>
        <Icon size={20} color='white'/>
        {alert ? <BsDot  size={70} className='text-sky-500 absolute -top-4 left-0'/> : null}
      </div>
      <div className=' relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer'>
        <Icon size={24} color='white'/>
        <p className='text-white hidden lg:block text-lg'>
          {label}
        </p>
        {alert ? <BsDot  size={70} className='text-sky-500 absolute -top-4 left-0'/> : null}
      </div>
    </div>
  )
}

export default SidebarItem