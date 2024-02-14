'use client';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
      <button type='button' onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
};

export default Error;
