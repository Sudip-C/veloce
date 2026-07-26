import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LenisProvider } from "@/lib/LenisProvider";
import App from "@/App";

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
  it("renders the Home route without throwing", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    renderApp("/");
    // SplitText renders a visually-hidden full copy of the headline for
    // screen readers, so this also proves the Hero + SplitText tree mounted.
    expect(
      screen.getByText("Built To Disappear At Speed")
    ).toBeInTheDocument();
    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
  });

  it("renders every route without throwing", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    for (const route of ["/", "/models", "/configurator", "/about"]) {
      const { unmount } = renderApp(route);
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
