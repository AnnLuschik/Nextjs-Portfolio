const Hero = () => (
  <section className="fj-hero">
    <div className="fj-hero-wrapper row">
      <div className="hero-left col-md-6">
        <h1 className="white hero-title">
          Hey I&#39;m John. Enthusiastic front end developer
        </h1>
        <h2 className="white hero-subtitle">Check my portfolio</h2>
        <div className="button-container">
          <a
            href="https://github.com/AnnLuschik"
            className="btn btn-main bg-blue ttu"
          >
            See my work
          </a>
        </div>
      </div>
      <div className="hero-right col-md-6">
        <div className="hero-image-container">
          <a className="grow hero-link">
            <img
              className="hero-image"
              src="https://i.udemycdn.com/course/750x422/1652608_662b_8.jpg"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
