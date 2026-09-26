import { urlFor } from '../lib/sanityImage'

const WIDTHS = [480, 720, 960, 1280]

// Renders a Sanity image field as a responsive <img>.
// `aspectRatio` (width / height) crops the image around the hotspot chosen in the Studio.
// `sizes` tells the browser how wide the image is on screen so it downloads the right file.
// `loading="lazy"` delays downloading until the image is about to scroll into view.
function SanityImage({ image, aspectRatio, sizes, className, loading }) {
  if (!image?.asset) return null

  const buildUrl = (width) =>
    urlFor(image)
      .width(width)
      .height(Math.round(width / aspectRatio))
      .fit('crop')
      .auto('format') // Serves WebP/AVIF to browsers that support them
      .url()

  return (
    <img
      className={className}
      src={buildUrl(WIDTHS[1])}
      srcSet={WIDTHS.map((width) => `${buildUrl(width)} ${width}w`).join(', ')}
      sizes={sizes}
      alt={image.alt || ''}
      loading={loading}
      width={WIDTHS[1]}
      height={Math.round(WIDTHS[1] / aspectRatio)}
    />
  )
}

export default SanityImage
