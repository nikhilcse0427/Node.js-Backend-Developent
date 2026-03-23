import multer from "multer";

const upload = multer({ memory: multer.memoryStorage() })

export { upload };