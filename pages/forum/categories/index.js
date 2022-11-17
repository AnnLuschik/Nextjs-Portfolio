import Link from 'next/link';

import { GET_FORUM_CATEGORIES } from 'apollo/queries';
import withApollo from 'hoc/withApollo';

const ForumCategories = ({ categories }) => {
  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Categories</h1>
          </div>
        </div>
      </section>
      <section className="fj-category-list">
        <div className="row">
          {categories.length > 0 &&
            categories.map((category) => (
              <div className="col-md-4" key={category.slug}>
                <div className="fj-category-container">
                  <Link
                    href={{
                      pathname: '/forum/categories/[slug]',
                      query: { slug: category.slug }
                    }}
                    legacyBehavior
                  >
                    <a className="fj-category subtle-shadow no-border">
                      {
                        // <div className="category-icon">
                        //   <img src="images/pen.png" />
                        // </div>
                      }
                      <div className="category-information">
                        <div className="heading gray-90">{category.title}</div>
                        <div className="description">{category.subtitle}</div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

ForumCategories.getInitialProps = async ({ apolloClient }) => {
  const response = await apolloClient.query({ query: GET_FORUM_CATEGORIES });
  return {
    categories: response.data.forumCategories
  };
};

export default withApollo(ForumCategories);
