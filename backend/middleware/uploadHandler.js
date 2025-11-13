import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * General-purpose Multer upload middleware
 * -----------------------------------------
 * Supports:
 * - Dynamic upload directories (e.g. 'products', 'users', 'blogs')
 * - Image-only or mixed file uploads
 * - Custom limits per route
 *
 * Example usage:
 *   import { createUploader, safeUnlink, fileToPublicPath } from "../middlewares/uploadHandler.js";
 *   const upload = createUploader("products");
 *   router.post("/upload", upload.single("image"), controllerFn);
 */

const IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/jpg",
];

/**
 * Helper: ensure directory exists
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Create a new multer instance dynamically based on directory + options
 */
export function createUploader(folder = "misc", options = {}) {
  const UPLOAD_DIR = path.join(process.cwd(), "uploads", folder);
  ensureDir(UPLOAD_DIR);

  const {
    allowedMimeTypes = IMAGE_MIME_TYPES,
    fileSizeMB = 5,
  } = options;

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_DIR);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname) || "";
      const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${base}${ext}`;
      cb(null, filename);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!allowedMimeTypes || allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Invalid file type"));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: fileSizeMB * 1024 * 1024 },
  });
}

/**
 * Helper: returns the public path (relative)
 * Example -> "/uploads/products/abc123.jpg"
 */
export function fileToPublicPath(file) {
  if (!file) return null;
  const relative = path.relative(process.cwd(), file.path);
  return "/" + relative.replace(/\\/g, "/");
}

/**
 * Safe file delete
 */
export function safeUnlink(filepath) {
  if (!filepath) return;
  try {
    const fullPath = filepath.startsWith("uploads")
      ? path.join(process.cwd(), filepath)
      : filepath.startsWith("/")
      ? path.join(process.cwd(), filepath.slice(1))
      : filepath;

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (err) {
    console.warn("safeUnlink error:", err?.message || err);
  }
}
