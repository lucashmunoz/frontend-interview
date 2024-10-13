import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

// Runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

/* MSW server */
beforeAll(() => server.listen());
afterAll(() => server.close());

