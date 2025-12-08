// config/imagekit.js
import ImageKitPkg from "@imagekit/nodejs";

// Handle both ESM and CJS default exports to avoid undefined upload()
const ImageKit = ImageKitPkg?.default || ImageKitPkg;

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export default imagekit; // only export the initialized instance

