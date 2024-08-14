'use server';

import { db } from '@/lib/db';

export const createUser = async (user) => {
  const { id, first_name, last_name, email_address, image_url, username } =
    user;

  try {
    const userExists = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (userExists) {
      return {};
    }

    await db.user.create({
      data: {
        id,
        first_name,
        last_name,
        email_address,
        image_url,
        username,
      },
    });
  } catch (e) {
    console.log(e);
    return {
      error: 'Error while creating user',
    };
  }
};
