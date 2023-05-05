import useUser from '@/hooks/useUser'
import Image from 'next/image'
import React from 'react'
import Avatar from '../Avatar'

interface Props {
  userId: string
}
const UserHero: React.FC<Props> = ({userId}) => {
  const {data: fetchedUser} = useUser(userId as string);

  return (
    <div className=' bg-neutral-700 h-44 relative'>
      {
        fetchedUser?.coverImage && (
          <Image src={fetchedUser.coverImage} fill alt='cover Img' style={{objectFit: 'cover'}}/>
        )
      }
      <div className=' absolute -bottom-16 left-4'>
        <Avatar userId={userId} hasBorder isLarge/>
      </div>
    </div>
  )
}

export default UserHero