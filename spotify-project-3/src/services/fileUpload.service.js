import dotenv from "dotenv";
dotenv.config();

import ImageKit from "imagekit";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadMusicFile(file) {
  const result = await client.upload({
    file,
    fileName: `music_${Date.now()}.mp3`,
    folder: "yt-complete-backend/music",
  });

  return result.url;
}

export { uploadMusicFile };