/**
 * Custom hook to handle product image URL construction
 * @param {string} imagePath - The image path from the API (e.g., "/products/modelo-especial.jpeg")
 * @returns {string} The constructed URL for the image from the assets directory
 */
export const useProductImage = (imagePath) => {
  if (!imagePath) return "";

  try {
    // Remove the /products/ prefix and construct the URL from assets
    const imageFileName = imagePath.replace("/products/", "");
    return new URL(`../assets/${imageFileName}`, import.meta.url).href;
  } catch (error) {
    console.error("Error constructing image URL:", error);
    return "";
  }
};
