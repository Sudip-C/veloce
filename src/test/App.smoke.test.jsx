import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LenisProvider } from "@/lib/LenisProvider";
import App from "@/App";

// jsdom has no WebGL context, so mounting the real <Canvas> throws.
// This is a genuine environment limitation (see README/testing notes),
// not something to work around silently — the mock stands in for the
// entire 3D layer so the rest of the page shell can still be verified.
vi.mock("@/components/three/CarViewer", () => ({
  CarViewer: () => <div data-testid="car-viewer-mock" />,
}));

function renderApp(route = "/") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <LenisProvider>
        <App />
      </LenisProvider>
    </MemoryRouter>
  );
}

describe("App shell", () => {
  it("renders the Home route without throwing", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    renderApp("/");
    // SplitText renders a visually-hidden full copy of the headline for
    // screen readers, so this also proves the Hero + SplitText tree mounted.
    expect(
      screen.getByText("Built To Disappear At Speed")
    ).toBeInTheDocument();
    // The showcase's CarViewer is behind React.lazy — wait for it to
    // resolve so the suspense boundary settles before the test ends.
    await waitFor(() =>
      expect(screen.getByTestId("car-viewer-mock")).toBeInTheDocument()
    );
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("renders every route without throwing", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    for (const route of ["/", "/models", "/configurator", "/about"]) {
      const { unmount } = renderApp(route);
      // Only Home's CarShowcase mounts the 3D viewer by default;
      // Configurator now defaults to the photo view (see Configurator.test.jsx).
      if (route === "/") {
        await waitFor(() =>
          expect(screen.getByTestId("car-viewer-mock")).toBeInTheDocument()
        );
      }
      unmount();
    }
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("shows nav links and they point to the right routes", () => {
    renderApp("/");
    expect(screen.getAllByText("Models")[0].closest("a")).toHaveAttribute(
      "href",
      "/models"
    );
    expect(screen.getAllByText("Configurator")[0].closest("a")).toHaveAttribute(
      "href",
      "/configurator"
    );
  });
});
