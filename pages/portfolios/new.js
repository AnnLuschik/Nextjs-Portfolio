import CreatePortfolioForm from 'components/forms/CreatePortfolioForm';
import withApollo from 'hoc/withApollo';
import withAuth from 'hoc/withAuth';

const PortfolioCreate = () => {
  return (
    <div className="bwm-form mt-5">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="page-title">Create New Portfolio</h1>
          <CreatePortfolioForm onSubmit={(data) => JSON.stringify(data)} />
        </div>
      </div>
    </div>
  );
};

export default withApollo(withAuth(PortfolioCreate, ['admin']));
