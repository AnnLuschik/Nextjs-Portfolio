import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography
} from '@mui/material';

// Components
import withApollo from 'hoc/withApollo';
import withAuth from 'hoc/withAuth';

// Hooks
import { useGetUserPortfolios, useDeletePortfolio } from 'apollo/hooks';

// Styles
import styles from 'styles/Dashboard.module.css';

// Misc
import { formatDate } from 'helpers';

const InstructorDashboard = () => {
  const [portfolios, setPortfolios] = useState(null);

  const [deletePortfolio] = useDeletePortfolio();

  const { data } = useGetUserPortfolios();

  useEffect(() => {
    if (data && data.userPortfolios) {
      setPortfolios(data.userPortfolios);
    }
  }, [data]);

  return (
    <div className="bwm-form mt-5">
      <div className="row">
        <div className="col-md-12">
          <h1 className="page-title">Instructor Portfolios</h1>
          {portfolios &&
            portfolios.length > 0 &&
            portfolios.map((p) => (
              <Card key={p.id} className={styles.card}>
                <CardHeader title={p.jobTitle} />
                <CardContent>
                  <Typography variant="h4">{p.title}</Typography>
                  <Typography>
                    {formatDate(p.startDate)} — {formatDate(p.endDate)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    href={{
                      pathname: '/portfolios/[id]/edit',
                      query: { id: p.id }
                    }}
                    legacyBehavior
                  >
                    <a className="btn btn-warning me-1">Update</a>
                  </Link>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => deletePortfolio({ variables: { id: p.id } })}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default withApollo(
  withAuth(InstructorDashboard, ['admin', 'instructor'], { ssr: true })
);
