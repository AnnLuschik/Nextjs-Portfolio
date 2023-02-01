import { MockedProvider } from '@apollo/client/testing';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { GET_HIGHLIGHTED } from 'apollo/queries';
import { PORTFOLIO_TEST_ID, TOPIC_TEST_ID } from 'constants/test/testId';
import { render } from '../test-utils';
import { portfolios, topics } from '../mocks/constants';
import Home, { getServerSideProps } from '../pages/index';

const mocks = [
  {
    request: {
      query: GET_HIGHLIGHTED,
      variables: { limit: 3 }
    },
    result: {
      data: {
        highlight: {
          portfolios,
          topics
        }
      }
    }
  }
];

describe('home page', () => {
  const setup = async () => {
    const response = await getServerSideProps();

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home {...response.props} />
      </MockedProvider>
    );
  };

  it('renders three topics', async () => {
    expect.assertions(1);
    await setup();
    const topics = screen.getAllByTestId(TOPIC_TEST_ID);
    expect(topics.length).toBeLessThanOrEqual(3);
  });

  it('renders three portfolios', async () => {
    expect.assertions(1);
    await setup();
    const portfolios = screen.getAllByTestId(PORTFOLIO_TEST_ID);
    expect(portfolios.length).toBeLessThanOrEqual(3);
  });
});
