const mongoose = require('mongoose');
const dayjs = require('dayjs');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const forum1Id = mongoose.Types.ObjectId();
const forum2Id = mongoose.Types.ObjectId();
const forum3Id = mongoose.Types.ObjectId();

const topic1Id = mongoose.Types.ObjectId();

const post1Id = mongoose.Types.ObjectId();
const post1CreatedAt = dayjs().subtract(7, 'day');

const post2Id = mongoose.Types.ObjectId();
const post2CreatedAt = dayjs(post1CreatedAt).add(1, 'day');

const post3Id = mongoose.Types.ObjectId();
const post3CreatedAt = dayjs(post2CreatedAt).add(1, 'day');

const post4Id = mongoose.Types.ObjectId();
const post4CreatedAt = dayjs(post3CreatedAt).add(1, 'day');

const data = {
  users: [
    {
      _id: user1Id,
      avatar:
        'https://res.cloudinary.com/hannalushchyk/image/upload/v1674720803/portfolio-app/user1.png',
      email: 'admin@test.com',
      name: 'John Doe',
      username: 'JohnDoe',
      info: 'Hello I am John and I am a developer',
      password: 'adminadmin',
      role: 'admin'
    },
    {
      _id: user2Id,
      avatar:
        'https://res.cloudinary.com/hannalushchyk/image/upload/v1674720803/portfolio-app/user2.png',
      email: 'user@test.com',
      name: 'Test User',
      username: 'Test111',
      info: 'Hello I am Test and I am a test',
      password: 'testtest'
    }
  ],
  portfolios: [
    {
      title: 'Job in Netcentric',
      company: 'Netcentric',
      companyWebsite: 'https://www.google.com',
      location: 'Spain, Barcelona',
      jobTitle: 'Engineer',
      description: 'Doing something, programming....',
      startDate: '01/01/2014',
      endDate: '01/01/2016',
      user: user1Id
    },
    {
      title: 'Job in Siemens',
      company: 'Siemens',
      companyWebsite: 'https://www.google.com',
      location: 'Slovakia, Kosice',
      jobTitle: 'Software Engineer',
      description: 'Responsible for parsing framework for JSON medical data.',
      startDate: '01/01/2011',
      endDate: '01/01/2013',
      user: user1Id
    },
    {
      title: 'Work in USA',
      company: 'WhoKnows',
      companyWebsite: 'https://www.google.com',
      location: 'USA, Montana',
      jobTitle: 'Housekeeping',
      description: 'So much responsibility....Overloaaaaaad',
      startDate: '01/01/2010',
      endDate: '01/01/2011',
      user: user1Id
    }
  ],
  forumCategories: [
    {
      _id: forum1Id,
      title: 'General Discussion',
      subtitle: 'Open any topic you want',
      slug: 'general-discussion'
    },
    {
      _id: forum2Id,
      title: 'Job Requests',
      subtitle: 'Post here job opportunities',
      slug: 'job-requests'
    },
    {
      _id: forum3Id,
      title: 'Developer Jokes',
      subtitle: 'Just funny developing stuff',
      slug: 'developer-jokes'
    }
  ],
  topics: [
    {
      _id: topic1Id,
      title: 'How to learn JS',
      slug: 'how-to-learn-js',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
      forumCategory: forum1Id,
      user: user1Id,
      createdAt: post1CreatedAt
    },
    {
      title: 'How to learn JAVA',
      slug: 'how-to-learn-java',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
      forumCategory: forum1Id,
      user: user1Id
    },
    {
      title: 'How to learn C++',
      slug: 'how-to-learn-c++',
      content:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
      forumCategory: forum1Id,
      user: user1Id
    }
  ],
  posts: [
    {
      _id: post1Id,
      content: 'Hey there how are you ?',
      slug: 'md43',
      fullSlug: `${post1CreatedAt.toISOString()}:md43`,
      topic: topic1Id,
      user: user1Id,
      createdAt: post1CreatedAt
    },
    {
      _id: post2Id,
      content: 'What do you think about this?',
      slug: 'md59',
      fullSlug: `${post2CreatedAt.toISOString()}:md59`,
      topic: topic1Id,
      user: user2Id,
      createdAt: post2CreatedAt
    },
    {
      _id: post3Id,
      content: 'I think it is nice :)',
      slug: 'md59/md79',
      fullSlug:
        `${post2CreatedAt.toISOString()}:md59` +
        `/${post3CreatedAt.toISOString()}:md79`,
      topic: topic1Id,
      user: user1Id,
      parent: post2Id,
      createdAt: post3CreatedAt
    },
    {
      _id: post4Id,
      content: 'Good to hear that!',
      slug: 'md59/md79/md89',
      fullSlug:
        `${post2CreatedAt.toISOString()}:md59` +
        `/${post3CreatedAt.toISOString()}:md79` +
        `/${post4CreatedAt.toISOString()}:md89`,
      topic: topic1Id,
      user: user2Id,
      parent: post3Id,
      createdAt: post4CreatedAt
    }
  ]
};

module.exports = data;
