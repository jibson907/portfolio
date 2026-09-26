import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from './sanityClient'

// Sanity documents store images as references (asset._ref), not links.
// The builder turns an image field into a CDN URL and can ask Sanity to resize
// and crop it. It automatically respects the crop and hotspot set in the Studio.
const builder = createImageUrlBuilder(sanityClient)

export function urlFor(image) {
  return builder.image(image)
}
