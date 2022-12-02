const dev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  env: {
    BASE_URL: dev
      ? 'http://localhost:3000/graphql'
      : 'https://annluschik-portfolio-app.herokuapp.com/graphql'
  }
};

module.exports = nextConfig;
