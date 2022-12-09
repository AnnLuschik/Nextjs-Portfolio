import withAuth from 'hoc/withAuth';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const Secret = ({ createdAt }) => {
  return (
    <div className="bwm-form mt-5">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="page-title">Secret Page</h1>
          <p>Only admin is allowed</p>
          <p>This static page was built at {createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const now = dayjs(new Date()).format();

  return {
    props: {
      createdAt: now
    }
  };
}

export default withAuth(Secret, ['admin']);
