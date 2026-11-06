export const videoSources = (slug: string) => ({
  preview: `/media/${slug}/preview.mp4`,
  full: `/media/${slug}/full.mp4`,
  poster: `/media/${slug}/poster.webp`,
});
