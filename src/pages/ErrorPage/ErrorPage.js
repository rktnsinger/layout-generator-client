import React from "react";
import { useNavigate } from "react-router-dom";

import MainOperationButton from "../../components/common/MainOperationButton";

export default function ErrorPage() {
  const navigate = useNavigate();

  const handleRedirectHome = () => {
    navigate("/", { replace: true });
  };

  return (
    <>
      <h1>It seems like you approached in the wrong way..</h1>
      <MainOperationButton handleClick={handleRedirectHome}>
        Go to Home
      </MainOperationButton>
    </>
  );
}
