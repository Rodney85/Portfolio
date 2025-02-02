export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (srcs: string[]): Promise<void[]> => {
  const preloadPromises = srcs.map(src => preloadImage(src));
  return Promise.all(preloadPromises);
};

export const preloadCriticalImages = async (projects: { thumbnail: string }[]): Promise<void> => {
  // Only preload the first few images that are likely to be in the viewport
  const criticalImages = projects.slice(0, 3).map(project => project.thumbnail);
  try {
    await preloadImages(criticalImages);
  } catch (error) {
    console.error('Failed to preload critical images:', error);
  }
};
