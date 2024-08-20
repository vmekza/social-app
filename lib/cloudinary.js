import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLD_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLD_API_SECRET,
});

export const cld = globalThis.cloudinary || cloudinary;

if (process.env.MODE_ENV !== 'production') globalThis.cloudinary = cld;
