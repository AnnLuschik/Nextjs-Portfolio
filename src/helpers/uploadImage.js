export const uploadImage = async (image, signature, timestamp) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append('file', image);
  formData.append('signature', signature);
  formData.append('timestamp', timestamp.toString());
  formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY ?? '');

  const response = await fetch(url, {
    method: 'post',
    body: formData
  });
  return response.json();
};
