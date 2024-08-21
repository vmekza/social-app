'use server';

import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { uploadFile } from './uploadFile';

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
