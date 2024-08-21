'use server';

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
