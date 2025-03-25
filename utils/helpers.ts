export function getVideoThumbnail(videoUrl: string) {
  let videoId, thumbnailUrl;

  // Check if it's a YouTube video
  const youtubeMatch = videoUrl.match(
    /(?:youtube\.com\/(?:[^\\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\\/\s]{11})/,
  );
  if (youtubeMatch) {
    videoId = youtubeMatch[1];
    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`; // Best quality
    return thumbnailUrl;
  }

  // Check if it's a Vimeo video
  // const vimeoMatch = videoUrl.match(/(?:vimeo\.com\/)(\d+)/);
  // if (vimeoMatch) {
  //   videoId = vimeoMatch[1];
  //   try {
  //     const response = await fetch(
  //       `https://vimeo.com/api/v2/video/${videoId}.json`,
  //     );
  //     const data = await response.json();
  //     return data[0].thumbnail_large; // Other options: thumbnail_small, thumbnail_medium
  //   } catch (error) {
  //     console.error("Failed to fetch Vimeo thumbnail", error);
  //     return null;
  //   }
  // }

  return ""; // If not YouTube or Vimeo
}
