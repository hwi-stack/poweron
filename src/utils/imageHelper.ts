/**
 * Image and media helper utilities for POWER ON
 */

// Compress and resize image file to lightweight Base64 data URL
export function compressImageFile(file: File, maxDimension = 1200, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export as JPEG with controlled quality
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => {
        reject(new Error('이미지를 읽는 중 오류가 발생했습니다.'));
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('파일을 읽을 수 없습니다.'));
    };
    reader.readAsDataURL(file);
  });
}

// Extract YouTube ID if valid
export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match && match[1] ? match[1] : null;
}

// Convert video URL to embed format
export function formatVideoEmbedUrl(url: string): string {
  if (!url) return '';
  const ytid = getYouTubeId(url);
  if (ytid) {
    return `https://www.youtube.com/embed/${ytid}?autoplay=1&rel=0`;
  }
  return url;
}

// Extract YouTube HQ Thumbnail
export function getYouTubeThumbnail(url: string): string | null {
  const ytid = getYouTubeId(url);
  if (ytid) {
    return `https://img.youtube.com/vi/${ytid}/hqdefault.jpg`;
  }
  return null;
}

// Check if URL is definitely a video
export function isVideoUrl(url: string): boolean {
  if (!url) return false;
  if (getYouTubeId(url)) return true;
  if (url.includes('vimeo.com')) return true;
  if (/\.(mp4|webm|mov|ogg)($|\?)/i.test(url)) return true;
  return false;
}
