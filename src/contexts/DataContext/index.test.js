import { render, screen } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";

// Mock data
const mockDataSuccess = { result: "ok" };
const mockDataError = "error on calling events";

const MockComponentWithData = () => {
  const { data } = useData();
  return <div>{data?.result}</div>;
};

const MockComponentWithError = () => {
  const { error } = useData();
  return <div>{error}</div>;
};

describe("When DataContext is used", () => {
  it("loads data and displays it when call is successful", async () => {
    api.loadData = jest.fn().mockReturnValue(mockDataSuccess);

    render(
      <DataProvider>
        <MockComponentWithData />
      </DataProvider>
    );

    const dataDisplayed = await screen.findByText("ok");
    expect(dataDisplayed).toBeInTheDocument();
  });

  describe("when the API call fails", () => {
    it("displays the error returned by the API", async () => {
      window.console.error = jest.fn();
      api.loadData = jest.fn().mockRejectedValue(mockDataError);

      render(
        <DataProvider>
          <MockComponentWithError />
        </DataProvider>
      );

      const errorDisplayed = await screen.findByText(mockDataError);
      expect(errorDisplayed).toBeInTheDocument();
    });
  });

  it("calls api.loadData with fetch mock", () => {
    window.console.error = jest.fn();
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    });

    render(
      <DataProvider>
        <div>Test</div>
      </DataProvider>
    );
  });
});
