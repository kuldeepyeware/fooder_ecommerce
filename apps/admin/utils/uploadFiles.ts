const uploadFile = async (
  file: File
): Promise<{
  url: string;
  fileName: string;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target?.result;
      if (fileData) {
        const fileName: string = `Product_Images/${file.name}`;
        const presignedURL = new URL("/api/upload", window.location.href);
        presignedURL.searchParams.set(
          "fileName",
          `Product_Images/${file.name}`
        );
        presignedURL.searchParams.set("contentType", file.type);
        try {
          const res = await fetch(presignedURL.toString());
          const { signedUrl } = await res.json();

          const body = new Blob([fileData], { type: file.type });
          await fetch(signedUrl, {
            body,
            method: "PUT",
          });

          const cloudFrontUrl = `https://d3rts3x4c8sg1r.cloudfront.net/${fileName}`;

          resolve({
            url: cloudFrontUrl,
            fileName: fileName,
          });
        } catch (error) {
          console.error("Error uploading file:", error);
          reject(error);
        }
      } else {
        reject(new Error("Failed to read file data"));
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

export const uploadCategoryImage = async (
  file: File
): Promise<{
  url: string;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const fileData = event.target?.result;
      if (fileData) {
        const fileName: string = `Category_Images/${file.name}`;
        const presignedURL = new URL("/api/upload", window.location.href);
        presignedURL.searchParams.set(
          "fileName",
          `Category_Images/${file.name}`
        );
        presignedURL.searchParams.set("contentType", file.type);
        try {
          const res = await fetch(presignedURL.toString());
          const { signedUrl } = await res.json();

          const body = new Blob([fileData], { type: file.type });
          await fetch(signedUrl, {
            body,
            method: "PUT",
          });

          const cloudFrontUrl = `https://d3rts3x4c8sg1r.cloudfront.net/${fileName}`;

          resolve({
            url: cloudFrontUrl,
          });
        } catch (error) {
          console.error("Error uploading file:", error);
          reject(error);
        }
      } else {
        reject(new Error("Failed to read file data"));
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

export const uploadMultipleFiles = async (
  files: File[]
): Promise<{ url: string; fileName: string }[]> => {
  const uploadPromises = files.map((file) => uploadFile(file));
  return Promise.all(uploadPromises);
};
