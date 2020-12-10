import * as React from 'react';

const Error = ({ statusCode }: any) => {
  return (
    <div>
      <h1>Error</h1>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </div>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
