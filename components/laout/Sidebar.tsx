import React from 'react'
import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import SidebarTwitterButton from './SidebarTwitterButton'
import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
export const Sidebar = () => {
  const { data: currentUser} = useCurrentUser();
  const items = [
    {
      label: '首頁',
      href: '/',
      icon: BsHouseFill,
    },
    {
      label: '提醒',
      href: '/notifications',
      icon: BsBellFill,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: '個人資料',
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo/>
          {items.map((item) => <SidebarItem alert={item.alert} key={item.label} href={item.href} label={item.label} icon={item.icon} auth={item.auth}/>)}
          {
            currentUser ? (
              <SidebarItem icon={BiLogOut} onClick={() => signOut()} label='登出'/>
            ) : (
              <SidebarTwitterButton/>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar
