import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

import { renderWithProviders } from "../../utils/test-utils";
import { Collection } from "../../shared/interfaces/collection";
import "@testing-library/jest-dom";

test("Renders collections", () => {
     const initialCollections: Array<Collection> = [
          {
               _id: "1",
               name: "Test 1",
               color: "#FF0000",
               lists: [],
          },
          {
               _id: "2",
               name: "Test 2",
               color: "#FFFF00",
               lists: [],
          },
     ];

     renderWithProviders(<Sidebar />, {
          preloadedState: {
               collections: {
                    data: initialCollections,
                    loading: false,
               },
          },
     });
     expect(screen.getByText(/Test 1/i)).toBeInTheDocument();
     expect(screen.getByText(/Test 2/i)).toBeInTheDocument();
});
