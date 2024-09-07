'use server';

import { cld } from '@/lib/cloudinary';
export const uploadFile = async (file, folder) => {
  try {
    const response = cld.v2.uploader.upload(
      file,
      {
        folder: `bragzone/${folder}`,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          console.log('Error uploading file');
        } else {
          console.log('File uploaded successfully');
          return result;
        }
      }
    );

    return response;
  } catch (e) {
    console.log(e);
    throw new Error('Error uploading file');
  }
};

export const deleteFile = async (public_id) => {
  try {
    const response = cld.v2.uploader.destroy(public_id, (error, result) => {
      if (error) {
        console.log('Error deleting file', public_id);
      } else {
        console.log('File deleted successfully');
        return;
      }
    });

    return response;
  } catch (e) {
    console.log(e);
    throw new Error('Error deleting file');
  }
};
