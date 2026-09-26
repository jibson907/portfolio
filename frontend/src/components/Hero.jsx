import SanityImage from './SanityImage'
import AppLink from './AppLink'

// The first section of the homepage. All content arrives as props from the page,
// so this component has no idea where the data came from.
function Hero({ title, description, image, buttonText, buttonUrl }) {
  return (
    <section className="hero">
      <div className="hero__text">
        <h1 className="hero__title">{title}</h1>
        {description && <p className="hero__description">{description}</p>}
        {buttonText && buttonUrl && (
          <AppLink className="button" href={buttonUrl}>
            {buttonText}
          </AppLink>
        )}
      </div>

      <SanityImage
        className="hero__image"
        image={image}
        aspectRatio={4 / 5}
        sizes="(min-width: 56rem) 40vw, 100vw"
      />
    </section>
  )
}

export default Hero
