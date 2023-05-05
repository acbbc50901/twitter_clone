import {NextApiRequest, NextApiResponse} from 'next';
import bcrypt from 'bcrypt'
import prisma from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }
  try {
    const postId = req.method === 'POST' ? req.body.postId : req.query.postId;
    const { currentUser } = await serverAuth(req, res);
    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID')
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      }
    });
    if (!post) {
      throw new Error('Invalid ID');
    }

    let updataedLikedIds = [...(post.likedIds || [])];

    if (req.method === 'POST') {
      updataedLikedIds.push(currentUser.id);

      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId
          }
        })
        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: 'Somebody Liked your Tweet!',
              userId: post.userId,
            }
          })

          await prisma.user.update({
            where: {
              id: post.userId
            },
            data: {
              hasNotification: true,
            }
          })
        }
      } catch(error) {
        console.log(error);
      }
    }
    if (req.method === 'DELETE') {
      updataedLikedIds = updataedLikedIds.filter((LikedId) => LikedId !== currentUser.id);
    }
    const updataPost = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        likedIds: updataedLikedIds
      }
    })

    return res.status(200).json(updataPost);
  } catch(error) {
    console.log(error);
    return res.status(400).end();
  }
}