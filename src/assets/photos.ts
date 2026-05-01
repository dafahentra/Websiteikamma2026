// Dynamically import all compressed JPGs
const imageModules = import.meta.glob('/src/assets/Compressed/**/*.jpg', { eager: true, query: '?url', import: 'default' });

export const ALL_PHOTOS = Object.values(imageModules) as string[];

// Provide arrays for specific use cases
export const SCRAPBOOK_PHOTOS = ALL_PHOTOS; // Hero scrapbook can use all of them

// Helper to get random photos
export const getRandomPhotos = (count: number) => {
  const shuffled = [...ALL_PHOTOS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
