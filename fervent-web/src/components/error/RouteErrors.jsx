import React from 'react';
import { useRouteError } from "react-router-dom";

function PageNotFound() {
  const error = useRouteError();

  return (
    <>
      <div style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.message || error.data || error.statusText}</i>
        </p>
      </div>
    </>
  );
}

export default PageNotFound;