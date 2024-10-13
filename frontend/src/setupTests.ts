import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "./mocks/server";

vi.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {})
      }
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {}
  }
}));

// Runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

/* MSW server */
beforeAll(() => server.listen());
afterAll(() => server.close());

