import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

import PortfolioCard from 'components/portfolios/PortfolioCard';

export const fetchPortfolios = async () => {
  const query = `
    query Portfolios {
      portfolios {
        id
        title
        jobTitle
        description
        startDate
        endDate
      }
    }`;

  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.portfolios);
};

const createPortfolio = async () => {
  const query = `
    mutation CreatePortfolio {
      createPortfolio(input: {
        title: "New Job"
        company: "New Company"
        companyWebsite: "New Website"
        location: "New Location"
        jobTitle: "New Job Title"
        description: "New Desc"
        startDate: "12/12/2012"
        endDate: "14/11/2013"
      }) {
        id,
        title,
        company,
        companyWebsite
        location
        jobTitle
        description
        startDate
        endDate
      }
    }`;

  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.createPortfolio);
};

const graphUpdatePortfolio = async (id) => {
  const query = `
    mutation UpdatePortfolio {
      updatePortfolio(id: "${id}", input: {
        title: "Updated Job"
        company: "Updated Company"
        companyWebsite: "Updated Website"
        location: "Updated Location"
        jobTitle: "Updated Job Title"
        description: "Updated Desc"
        startDate: "12/12/2012"
        endDate: "14/11/2013"
      }) {
        id,
        title,
        company,
        companyWebsite
        location
        jobTitle
        description
        startDate
        endDate
      }
    }`;

  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.updatePortfolio);
};

const graphDeletePortfolio = async (id) => {
  const query = `
    mutation DeletePortfolio {
      deletePortfolio(id: "${id}")
    }`;

  return axios
    .post('http://localhost:3000/graphql', { query })
    .then(({ data: graph }) => graph.data)
    .then((data) => data.deletePortfolio);
};

const Portfolios = ({ data }) => {
  const [portfolios, setPortfolios] = useState(data.portfolios);

  const addPortfolio = async () => {
    const newPortfolio = await createPortfolio();
    setPortfolios([...portfolios, newPortfolio]);
  };

  const updatePortfolio = async (id) => {
    const updated = await graphUpdatePortfolio(id);
    const index = portfolios.findIndex((p) => p.id === id);
    const newPortfolios = [...portfolios];
    newPortfolios[index] = updated;
    setPortfolios(newPortfolios);
  };

  const deletePortfolio = async (id) => {
    const deletedId = await graphDeletePortfolio(id);
    const index = portfolios.findIndex((p) => p.id === deletedId);
    const newPortfolios = [...portfolios];
    newPortfolios.splice(index, 1);
    setPortfolios(newPortfolios);
  };

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
        <button
          type="button"
          onClick={addPortfolio}
          className="btn btn-primary"
        >
          Create Portfolio
        </button>
      </section>
      <section className="pb-5">
        <div className="row">
          {portfolios.map((portfolio) => (
            <div key={portfolio.id} className="col-md-4">
              <Link href={`/portfolios/${encodeURIComponent(portfolio.id)}`}>
                <a className="card-link">
                  <PortfolioCard data={portfolio} />
                </a>
              </Link>

              <button
                type="button"
                onClick={() => updatePortfolio(portfolio.id)}
                className="btn btn-warning"
              >
                Update Portfolio
              </button>
              <button
                type="button"
                onClick={() => deletePortfolio(portfolio.id)}
                className="btn btn-danger"
              >
                Delete Portfolio
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export async function getStaticProps() {
  const portfolios = await fetchPortfolios();

  return {
    props: { data: { portfolios } }
  };
}

export default Portfolios;
