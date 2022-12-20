const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  env: {
    BASE_URL: dev
      ? 'http://localhost:3000/graphql'
      : 'https://annluschik-portfolio-app.herokuapp.com/graphql'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.udemycdn.com',
        pathname: '/course/750x422/1652608_662b_8.jpg'
      }
    ]
  }
};
