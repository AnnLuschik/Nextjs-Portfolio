import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Components
import Posts from 'components/forum/Posts';

// Hooks
import {
  useGetPostsByTopic,
  useGetTopicBySlug,
  useGetUser
} from 'apollo/hooks';

// Misc
import withApollo from 'hoc/withApollo';

const useInitialData = (slug, pagination) => {
  const { data: dataT } = useGetTopicBySlug({
    variables: { slug }
  });
  const topic = (dataT && dataT.topicBySlug) || null;

  const { data: dataP, fetchMore } = useGetPostsByTopic({
    variables: { slug, ...pagination }
  });
  const postsData = (dataP && dataP.postsByTopic) || { content: [] };

  const { data: dataU } = useGetUser();
  const user = (dataU && dataU.user) || null;

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

  return (
    topic && (
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
    )
  );
};

export default withApollo(PostsPage);
