import { render } from "@testing-library/react";
import React from "react";
import AppProvider from "../Context/AppProvider";

function renderWithContext(children) {
  return(
    render(
      <AppProvider>
        { children }
      </AppProvider>
    )
  )
}

export default renderWithContext;
