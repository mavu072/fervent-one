import React from 'react';
import Button from '@mui/material/Button';
import { useRouteError } from "react-router-dom";

const errorPageStyle = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const errorComponentStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

export function ErrorPageNotFound() {
  return (
    <div style={errorComponentStyle}>
      <h1>Oops!</h1>
      <p>Error 404, page not found.</p>
      <i>The link might be broken or the page may have been moved or deleted.</i>
      <p>
        <Button variant="contained" size="medium" color="primary" href="/home" target='_self'>
          Back to Home
        </Button>
      </p>
    </div>
  )
}

export function ErrorMessage({ error }) {
  
  function reloadWindow() {
    window.location.reload();
  }

  return (
    <div style={errorComponentStyle}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <i>Error message: {error?.message || error?.data || error?.statusText}</i>
      <p>
        <Button variant="contained" size="medium" color="primary" onClick={reloadWindow}>
          Try again
        </Button>
      </p>
    </div>
  )
}

/**
 * PageNotFound.
 * @returns JSX Component.
 */
export function PageNotFound() {
  return (
    <div style={errorPageStyle}>
      <ErrorPageNotFound />
    </div>
  );
}

/**
 * ErrorPage.
 * @returns JSX Component.
 */
function ErrorPage() {
  const error = useRouteError();

  return (
    <div style={errorPageStyle}>
      <ErrorMessage error={error} />
    </div>
  );
}

export default ErrorPage;