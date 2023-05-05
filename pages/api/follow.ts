import {NextApiRequest, NextApiResponse} from 'next';
import prisma from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }
  try {
    const userId = req.method === 'POST' ? req.body.userId : req.query.userId;
    const { currentUser } = await serverAuth(req, res);
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid ID')
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if (!user) {
      throw new Error('Invalid ID')
    }
    let updatedFollowingIds = [...(user.followingIds || [])];
    
    if (req.method === 'POST') {
      updatedFollowingIds.push(userId);

      try {
          await prisma.notification.create({
            data: {
              body: 'Somebody Followed your!',
              userId,
            }
          })

          await prisma.user.update({
            where: {
              id: userId
            },
            data: {
              hasNotification: true,
            }
          })
        
      } catch(error) {
        console.log(error);
      }
    }
    
    if (req.method === 'DELETE') {
      updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
      console.log(updatedFollowingIds);
    }
    
    const updataUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingIds: updatedFollowingIds
      }
    })
    return res.status(200).json(updataUser);
  } catch(error) {
    console.log(error);
    return res.status(400).end();
  }
}