import Head from 'next/head';

const CV = () => {
  return (
    <>
      <Head>
        <title>Portfolios - CV</title>
      </Head>
      <div className="row mt-4">
        <div className="col-md-8 offset-md-2">
          <iframe
            title="map"
            src="/map.pdf"
            style={{ width: '100%', height: '80vh' }}
          />
        </div>
      </div>
    </>
  );
};

export default CV;
