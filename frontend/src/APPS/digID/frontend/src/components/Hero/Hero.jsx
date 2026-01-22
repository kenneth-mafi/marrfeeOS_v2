import './hero.css';

const Hero = ({ title, imageSrc, size="" }) => {
  return (
    <div className={`digId-hero-contr ${size === "small" ? "digId-hero-small" : ""}`}>
        <img src={imageSrc} alt="Hero" className={`digId-hero-image ${size === "small" ? "digId-hero-img-small" : ""}`} />
        {title && <h2 className={`digId-hero-title`} >{title}</h2>}
    </div>
  );
}

export default Hero;