'use server';

import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { uploadFile } from './uploadFile';

// Create post
export const createPost = async (post) => {
  const { postText, media } = post;
  try {
    let cld_id;
    let assetURL;
    const user = await currentUser();

    if (media) {
      const response = await uploadFile(media, `/posts/${user?.id}`);
      const { public_id, secure_url } = response;
      cld_id = public_id;
      assetURL = secure_url;
    }

    const newPost = await db.post.create({
      data: {
        postText,
        media: assetURL,
        cld_id,
        author: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    console.log(newPost);

    return {
      data: newPost,
    };
  } catch (e) {
    console.log(e?.message);
    throw new Error('Error creating post');
  }
};

// Get post
export const getMyFeedPosts = async (lastCursor) => {
  try {
    const take = 5;
    const posts = await db.post.findMany({
      include: {
        author: true,
        likes: true,
        comments: true,
      },
      take,
      ...(lastCursor && {
        skip: 1,
        cursor: {
          id: lastCursor,
        },
      }),
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (posts.length === 0) {
      return {
        data: [],
        metaData: {
          lastCursor: null,
          hasMore: false,
        },
      };
    }
    const lastPostInResults = posts[posts.length - 1];
    const cursor = lastPostInResults.id;
    const morePosts = await db.post.findMany({
      take,
      skip: 1,
      cursor: {
        id: cursor,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: posts,
      metaData: {
        lastCursor: cursor,
        hasMore: morePosts.length > 0,
      },
    };
  } catch (e) {
    console.log(e?.message);
    throw new Error('Error getting posts');
  }
};

// Update post like
export const updatePostLike = async (postId, actionType) => {
  try {
    const { id: userId } = await currentUser();
    const post = await db.post.findMany({
      where: {
        id: postId,
      },
      include: {
        likes: true,
      },
    });
    if (!post) {
      return {
        error: 'Post not found',
      };
    }
    const like = post.likes.find((like) => like.authorId === userId);
  } catch (e) {
    console.log(e?.message);
    throw new Error('Error updating post like');
  }
};
