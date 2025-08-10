interface CompressImageParams {
  file: File;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

function convertToWebp(filename: string): string {
  const lastDotIndex = filename.lastIndexOf(".");

  if (lastDotIndex === -1) {
    return `${filename}.webp`;
  }

  return `${filename.substring(0, lastDotIndex)}.webp`;
}

export function compressImage({ 
  file, 
  maxWidth = Number.POSITIVE_INFINITY, 
  maxHeight = Number.POSITIVE_INFINITY, 
  quality = 1
}: CompressImageParams) {
  const allowsFileTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/webp',
  ]

  if(!allowsFileTypes.includes(file.type)) {
    throw new Error('File type not supported');
  }

  return new Promise<File>((resolve, reject) => {
    // to allow read a file as a blob
    const reader = new FileReader();

    reader.onload = event => {
      const compressed = new Image();
  
      compressed.onload = () => {
        const canvas = document.createElement('canvas');
  
        let width = compressed.width;
        let height = compressed.height;
  
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *=  maxHeight / height;
            height = maxHeight;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
  
        const ctx = canvas.getContext('2d');
  
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
  
        ctx.drawImage(compressed, 0, 0, width, height);
  
        canvas.toBlob(
          blob => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }
  
            const compressedFile = new File(
              [blob],
              convertToWebp(file.name),
              { 
                type: 'image/webp',
                lastModified: Date.now()
              },
            );
  
            resolve(compressedFile);
        },
        'image/webp',
        quality
      );
    }
  
      compressed.src = event.target?.result as string;
    }

    reader.readAsDataURL(file);
  })
}