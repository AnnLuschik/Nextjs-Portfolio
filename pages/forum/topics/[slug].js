import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

// Components
import Posts from 'components/forum/Posts';

// Hooks
import {
  useGetPostsByTopic,
  useGetTopicBySlug,
  useGetUser
} from 'apollo/hooks';

const useInitialData = (slug, pagination) => {
  const { data: dataT } = useGetTopicBySlug({
    variables: { slug }
  });
  const topic = dataT?.topicBySlug || null;

  const { data: dataP, fetchMore } = useGetPostsByTopic({
    variables: { slug, ...pagination },
    pollInterval: 1000
  });
  const postsData = dataP?.postsByTopic || { content: [] };

  const { data: dataU } = useGetUser();
  const user = dataU?.user || null;

  return { topic, ...postsData, user, fetchMore };
};

const PostsPage = () => {
  const router = useRouter();
  const { slug, pageNum, pageSize } = router.query;

  const [pagination, setPagination] = useState({
    pageNum: +pageNum || 1,
    pageSize: +pageSize || 5
  });

  useEffect(() => {
    if (pageNum && pageSize) {
      setPagination({
        pageNum: +pageNum,
        pageSize: +pageSize
      });
    }
  }, [pageNum, pageSize]);

  const { topic, content, fetchMore, ...rest } = useInitialData(
    slug,
    pagination
  );

  const handlePageChange = (num, size) => {
    const currentPath = router.pathname;
    const currentQuery = router.query;

    router.push(
      {
        pathname: currentPath,
        query: {
          ...currentQuery,
          pageNum: num,
          pageSize: size
        }
      },
      '',
      { shallow: true }
    );
    fetchMore({
      variables: {
        pageNum: num,
        pageSize: size
      }
    });
  };

  const title = `Forum - ${topic?.title}`;

  return (
    <>
      {Boolean(topic) && (
        <Head>
          <title>{title}</title>
        </Head>
      )}

      {topic && (
        <>
          <section className="section-title">
            <div className="px-2">
              <div className="pt-5 pb-4">
                <h1>{topic.title}</h1>
              </div>
            </div>
          </section>
          <Posts
            topic={topic}
            posts={content}
            {...pagination}
            {...rest}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default PostsPage;
