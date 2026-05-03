/**
 * Utilities for client-side image optimization
 */

interface OptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

export const convertToWebP = async (
  file: File, 
  options: OptimizationOptions = { maxWidth: 1920, maxHeight: 1080, quality: 0.8 }
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio and new dimensions
        if (width > (options.maxWidth || 1920)) {
          height = Math.round((height * (options.maxWidth || 1920)) / width);
          width = options.maxWidth || 1920;
        }
        if (height > (options.maxHeight || 1080)) {
          width = Math.round((width * (options.maxHeight || 1080)) / height);
          height = options.maxHeight || 1080;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Failed to get canvas context'));

        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to WebP
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to convert image to WebP'));
          },
          'image/webp',
          options.quality || 0.8
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
};
