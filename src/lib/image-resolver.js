/**
 * Resolves ImgBB viewer links to direct image links.
 * Example: https://ibb.co/m9Kxt8D -> https://i.ibb.co/m9Kxt8D/image.png
 *
 * @param {string} image - The image URL/path to check and resolve.
 * @returns {Promise<string>} The resolved direct image URL, or the original string if not an ibb.co viewer link.
 */
export async function resolveProductImage(image) {
  if (!image || typeof image !== "string") {
    return image;
  }

  const trimmed = image.trim();
  
  // Matches formats like:
  // http://ibb.co/xyz
  // https://www.ibb.co/xyz
  // https://ibb.co/xyz/
  // https://ibb.co/xyz?query=1
  const ibbRegex = /^https?:\/\/(?:www\.)?ibb\.co\/[a-zA-Z0-9]+(?:\/)?(?:\?.*)?$/i;
  
  if (!ibbRegex.test(trimmed)) {
    return trimmed;
  }

  try {
    console.log(`[ImageResolver] Resolving ImgBB viewer link: ${trimmed}`);
    
    const response = await fetch(trimmed, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      console.warn(`[ImageResolver] Fetch failed with status: ${response.status} ${response.statusText}`);
      return trimmed;
    }

    const html = await response.text();
    
    // Attempt to extract the direct image URL from meta tags
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i) ||
                          html.match(/<meta\s+name=["']twitter:image["']\s+content=["'](.*?)["']/i) ||
                          html.match(/<link\s+rel=["']image_src["']\s+href=["'](.*?)["']/i);
    
    if (ogImageMatch && ogImageMatch[1]) {
      const directUrl = ogImageMatch[1];
      console.log(`[ImageResolver] Successfully resolved to direct link: ${directUrl}`);
      return directUrl;
    }

    console.warn(`[ImageResolver] Could not find any direct image link in the HTML structure.`);
    return trimmed;
  } catch (error) {
    console.error(`[ImageResolver] Error resolving ImgBB URL:`, error);
    return trimmed;
  }
}
