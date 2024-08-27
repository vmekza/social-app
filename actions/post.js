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
export const updatePostLike = async (postId, type) => {
  try {
    const { id: userId } = await currentUser();

    // Search for post
    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        likes: true,
      },
    });

    // check if post exists
    if (!post) {
      return {
        error: 'Post not found',
      };
    }

    // check whether user has already liked the post or not
    const like = post.likes.find((like) => like.authorId === userId);

    // if user has already liked the post
    if (like) {
      if (type === 'like') {
        return {
          data: post,
        };
      } else {
        await db.like.delete({
          where: {
            id: like.id,
          },
        });
        console.log('Like deleted');
      }
    } else {
      // if user unlikes the post
      if (type === 'unlike') {
        return {
          data: post,
        };
      }
      // user tries to like the post
      else {
        await db.like.create({
          data: {
            post: {
              connect: {
                id: postId,
              },
            },
            author: {
              connect: {
                id: userId,
              },
            },
          },
        });
        console.log('like created');
      }
    }
    const updatePost = await db.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        likes: true,
      },
    });

    console.log(updatePost);
    return {
      data: updatePost,
    };
  } catch (e) {
    console.log(e?.message);
    throw new Error('Error updating post like');
  }
};

// Add comment
export const addComment = async (postId, comment) => {
  try {
    const { id: userId } = await currentUser();
    const newComment = await db.comment.create({
      data: {
        comment,
        post: {
          connect: {
            id: postId,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
    console.log(newComment);
    return {
      data: newComment,
    };
  } catch (e) {
    console.log(e?.message);
    throw new Error('Error adding comment');
  }
};
