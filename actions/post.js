'use server';

import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';

export const createPost = async (post) => {
  try {
    const { postText, media } = post;
    const user = await currentUser();

    let cld_id;
    let assetURL;

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
    console.log(e);
    throw new Error('Error creating post');
  }
};
