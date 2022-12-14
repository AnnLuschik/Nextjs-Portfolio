import Link from 'next/link';
import Head from 'next/head';

import { useGetForumCategories } from 'apollo/hooks';
import { PATH_CATEGORY } from 'constants/paths';

const ForumCategories = () => {
  const { data } = useGetForumCategories();
  const categories = data?.forumCategories || [];

  return (
    <>
      <Head>
        <title>Forum - Categories</title>
      </Head>
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
                      pathname: PATH_CATEGORY,
                      query: { slug: category.slug }
                    }}
                    legacyBehavior
                  >
                    <a className="fj-category subtle-shadow no-border">
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

export default ForumCategories;
