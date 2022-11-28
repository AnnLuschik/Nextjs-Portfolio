import { fromNow, shortify } from 'helpers';
import Link from 'next/link';

const TopicLink = ({ data }) => {
  return (
    <Link
      href={{
        pathname: '/forum/topics/[slug]',
        query: { slug: data.slug }
      }}
      className="list-group-item list-group-item-action flex-column align-items-start mt-3 py-3 subtle-shadow no-border"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1 black">{data.title}</h5>
        <small className="text-muted">{fromNow(data.createdAt)}</small>
      </div>
      <p className="mb-1">{shortify(data.content)}</p>
      <div className="avatar-container my-2">
        <img
          src={data.user.avatar}
          className="avatar-image me-2"
          alt={data.user.username}
        />
        <span className="avatar-title">{data.user.username}</span>
      </div>
    </Link>
  );
};

export default TopicLink;
