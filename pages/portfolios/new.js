import { useRouter } from 'next/router';

import PortfolioForm from 'components/forms/PortfolioForm';
import withApollo from 'hoc/withApollo';
import withAuth from 'hoc/withAuth';
import { useCreatePortfolio } from 'apollo/hooks';
import { getErrorMessage } from 'helpers';

const PortfolioCreate = () => {
  const router = useRouter();
  const [createPortfolio, { error }] = useCreatePortfolio();

  const handleCreatePortfolio = async (data) => {
    await createPortfolio({
      variables: data
    });
    router.push('/portfolios');
  };

  return (
    <div className="bwm-form mt-5">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="page-title">Create New Portfolio</h1>
          <PortfolioForm onSubmit={handleCreatePortfolio} />
          {error && (
            <div className="alert alert-danger">{getErrorMessage(error)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withApollo(withAuth(PortfolioCreate, ['admin']));
