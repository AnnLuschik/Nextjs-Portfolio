import withApollo from 'hoc/withApollo';
import { useUser } from 'hooks/useUser';
import withRole from 'hoc/withRole';

const Secret = () => {
  useUser({ redirectTo: '/login', role: 'admin' });

  return (
    <div className="bwm-form mt-5">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="page-title">Secret Page</h1>
          <p>Only authenticated users allowed</p>
        </div>
      </div>
    </div>
  );
};

export default withApollo(withRole(Secret, 'admin'));
