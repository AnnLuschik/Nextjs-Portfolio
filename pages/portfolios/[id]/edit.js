import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import withApollo from 'hoc/withApollo';
import withAuth from 'hoc/withAuth';
import PortfolioForm from 'components/forms/PortfolioForm';
import { useGetPortfolio, useUpdatePortfolio } from 'apollo/hooks';
import { getErrorMessage } from 'helpers';
import { GET_PORTFOLIO } from 'apollo/queries';

const PortfolioEdit = () => {
  const router = useRouter();
  const { query } = router;
  const { data } = useGetPortfolio({
    variables: { id: query.id },
    fetchPolicy: 'network-only'
  });

  const [updatePortfolio, { error }] = useUpdatePortfolio();

  const handleUpdatePortfolio = async (formData) => {
    await updatePortfolio({
      variables: { id: query.id, ...formData },
      update: (_, res) => {
        if (res)
          toast.success('Portfolio has been updated', { autoClose: 2000 });
      },
      refetchQueries: [GET_PORTFOLIO]
    });
  };

  return (
    <div className="bwm-form mt-5">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="page-title">Edit Portfolio</h1>
          {data ? (
            <PortfolioForm
              initialData={data.portfolio}
              onSubmit={handleUpdatePortfolio}
              buttonText="Update"
            />
          ) : null}
          {error && (
            <div className="alert alert-danger">{getErrorMessage(error)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withApollo(withAuth(PortfolioEdit, ['admin']));
