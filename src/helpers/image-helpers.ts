/*
 * Cropping techinque adapted from: 
 * https://pqina.nl/blog/cropping-images-to-an-aspect-ratio-with-javascript/ 
 */
export const cropToAspectRatio = (url: string, ratio: number) => {
  const inputImg = new Image();

  return new Promise(resolve => { 
    inputImg.onload = () => {

      const inputWidth = inputImg.naturalWidth;
      const inputHeight = inputImg.naturalHeight;
  
      // get the aspect ratio of the input image
      const inputImageAspectRatio = inputWidth / inputHeight;
  
      // if it's bigger than our target aspect ratio
      let outputWidth = inputWidth;
      let outputHeight = inputHeight;
      if (inputImageAspectRatio > ratio) {
          outputWidth = inputHeight * ratio;
      } else if (inputImageAspectRatio < ratio) {
          outputHeight = inputHeight / ratio;
      }
  
      // calculate the position to draw the image at
      const outputX = (outputWidth - inputWidth) * .5;
      const outputY = (outputHeight - inputHeight) * .5;
  
      // create a canvas that will present the output image
      const outputImage = document.createElement('canvas');
  
      // set it to the same size as the image
      outputImage.width = outputWidth;
      outputImage.height = outputHeight;
  
      // draw our image at position 0, 0 on the canvas
      const ctx = outputImage.getContext('2d');
      if (ctx != null) ctx.drawImage(inputImg, outputX, outputY);
      resolve(outputImage);
    };

    inputImg.src = url;
  });
}