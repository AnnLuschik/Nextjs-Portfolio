import Link from 'next/link';
import Image from 'next/image';

import { PATH_TOPIC } from 'constants/paths';
import { fromNow, shortify } from 'helpers';

const TopicLink = ({ data }) => {
  return (
    <Link
      href={{
        pathname: PATH_TOPIC,
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
        <div className="avatar-image me-2">
          <Image
            src={data.user.avatar}
            alt={data.user.username}
            width={28}
            height={28}
          />
        </div>
        <span className="avatar-title">{data.user.username}</span>
      </div>
    </Link>
  );
};

export default TopicLink;
