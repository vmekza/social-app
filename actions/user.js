'use server';

import { db } from '@/lib/db';

// Create user
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
      updateUser(user);
      return;
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
    console.log('User created');
  } catch (e) {
    console.log(e);
    return {
      error: 'Error while creating user',
    };
  }
};

// Update user
export const updateUser = async (user) => {
  const { id, first_name, last_name, email_address, image_url, username } =
    user;

  try {
    await db.user.update({
      where: {
        id,
      },
      data: {
        first_name,
        last_name,
        email_address,
        image_url,
        username,
      },
    });
    console.log('User updated');
  } catch (e) {
    console.log(e);
    return {
      error: 'Error while updating user',
    };
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });
    console.log('User deleted');
  } catch (e) {
    console.log(e);
    return {
      error: 'Error while deleting user',
    };
  }
};

// Get user
export const getUser = async (id) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email_address: true,
        image_url: true,
        username: true,
        banner_url: true,
        banner_id: true,
      },
    });
    return { data: user };
  } catch (e) {
    console.log(e);
    return {
      error: 'Error while getting user',
    };
  }
};
