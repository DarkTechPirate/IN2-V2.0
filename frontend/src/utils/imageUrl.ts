export function getImageUrl(path?: string) {
  if (!path) return "/placeholder.svg";

  const base = import.meta.env.VITE_BACKEND_IMAGE_URL || "";
  return base + path;
}
