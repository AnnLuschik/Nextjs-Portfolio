import { useRouter } from 'next/router';
import { useGetPostsByTopic, useGetTopicBySlug } from 'apollo/hooks';
import WithApollo from 'hoc/withApollo';

const useInitialData = () => {
  const router = useRouter();
  const { slug } = router.query;
  const {
    data: dataT,
    loading,
    error
  } = useGetTopicBySlug({ variables: { slug } });
  const topic = (dataT && dataT.topicBySlug) || null;

  const { data: dataP } = useGetPostsByTopic({ variables: { slug } });
  const posts = (dataP && dataP.postsByTopic) || [];

  return { topic, loading, error, posts };
};

const Posts = () => {
  const { topic, loading, error } = useInitialData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

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
        <section>
          <div className="fj-post-list">
            <div className="row">
              <div className="col-md-9">
                <div className="topic-post">
                  <article>
                    <div className="row">
                      <div className="topic-avatar">
                        <div className="main-avatar">
                          <img
                            style={{ objectFit: 'cover' }}
                            className="avatar subtle-shadow"
                            src={topic.user.avatar}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="topic-body">
                        <div className="topic-header">
                          <div className="topic-meta">
                            <div className="name-container">
                              <span className="name">
                                {topic.user.username}
                              </span>
                            </div>
                            <div className="date-container">
                              <span className="date">21h</span>
                            </div>
                          </div>
                        </div>
                        <div className="topic-content">
                          <div className="cooked">
                            <p>{topic.content}</p>
                          </div>
                          <section className="post-menu-area">
                            <nav className="post-controls">
                              <div className="actions">
                                <button type="button" className="btn">
                                  reply
                                </button>
                              </div>
                            </nav>
                          </section>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9">
                <div className="topic-post">
                  <article>
                    <div className="row">
                      <div className="topic-avatar">
                        <div className="main-avatar">
                          <img
                            className="avatar subtle-shadow"
                            src="https://i.imgur.com/cVDadwb.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="topic-body">
                        <div className="topic-header">
                          <div className="topic-meta">
                            <div className="name-container">
                              <span className="name">Filip Jerga</span>
                            </div>
                            <div className="date-container">
                              <span className="date">21h</span>
                            </div>
                          </div>
                        </div>
                        <div className="topic-content">
                          <div className="cooked">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry&#39;s standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                          <section className="post-menu-area">
                            <nav className="post-controls">
                              <div className="actions">
                                <button type="button" className="btn">
                                  reply
                                </button>
                              </div>
                            </nav>
                          </section>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-9">
                <div className="topic-post">
                  <article>
                    <div className="row">
                      <div className="topic-avatar">
                        <div className="main-avatar">
                          <img
                            className="avatar subtle-shadow"
                            src="https://i.imgur.com/cVDadwb.png"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="topic-body">
                        <div className="topic-header">
                          <div className="topic-meta">
                            <div className="name-container">
                              <span className="name">Filip Jerga</span>
                            </div>
                            <div className="date-container">
                              <span className="date">21h</span>
                            </div>
                          </div>
                        </div>
                        <div className="topic-content">
                          <div className="cooked">
                            <p>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry&#39;s standard dummy text ever since the
                              1500s, when an unknown printer took a galley of
                              type and scrambled it to make a type specimen
                              book.
                            </p>
                          </div>
                          <section className="post-menu-area">
                            <nav className="post-controls">
                              <div className="actions">
                                <button type="button" className="btn">
                                  reply
                                </button>
                              </div>
                            </nav>
                          </section>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  );
};

export default WithApollo(Posts);
