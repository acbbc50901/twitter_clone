import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import Image from 'next/image'

interface Props {
  userId: string
  isLarge?: boolean,
  hasBorder? : boolean
}

const Avatar: React.FC<Props> = ({userId, isLarge, hasBorder}) => {
  const {data: fetchUser} = useUser(userId);
  const router = useRouter();
  const onClick = useCallback((event: any) => {
    event.stopPropagation();
    const url = `/users/${userId}`;
    router.push(url);
  }, [router, userId])
  return (
    <div className={`
    ${hasBorder? ' border-4 border-black' : ''}
    ${isLarge? 'h-32' : 'h-12'}
    ${isLarge? 'w-32' : 'w-12'}
    rounded-full
    hover:opacity-90
    bg-white
    transition
    cursor-pointer
    relative
    `}>
      <Image fill style={{objectFit: 'cover', borderRadius: '100%'}} alt='Avatar' onClick={onClick} src={fetchUser?.profileImage || '/img/placeholder.png'}/>
    </div>
    
  )
}

export default Avatar