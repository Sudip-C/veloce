import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Configurator from "@/pages/Configurator";
import { MODELS, COLORS, WHEELS, INTERIORS } from "@/data/models";
import { formatCurrency } from "@/lib/utils";

vi.mock("@/components/three/CarViewer", () => ({
  CarViewer: ({ color }) => <div data-testid="car-viewer-mock">{color}</div>,
}));

function renderConfigurator(initialPath = "/configurator") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/configurator" element={<Configurator />} />
      </Routes>
    </MemoryRouter>
  );
}

/** The large preview image shares alt text with the model-switcher
 * thumbnails, so there are multiple matches — return all of them. */
function getPreviewImages(name) {
  return screen.getAllByAltText(name);
}

describe("Configurator page — photo view (default)", () => {
  it("shows the real photo of the default model, not the 3D placeholder", () => {
    renderConfigurator("/configurator");
    const images = getPreviewImages(MODELS[0].name);
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute("src", MODELS[0].image);
    // The 3D viewer should NOT be mounted until the user opts into it
    expect(screen.queryByTestId("car-viewer-mock")).not.toBeInTheDocument();
  });

  it("selects the model matching the ?model= query param and shows its photo", () => {
    renderConfigurator("/configurator?model=temerario");
    const temerario = MODELS.find((m) => m.slug === "temerario");
    expect(screen.getByText("Twin-Turbo V8 Hybrid")).toBeInTheDocument();
    const images = getPreviewImages(temerario.name);
    expect(images[0]).toHaveAttribute("src", temerario.image);
  });

  it("falls back to the first model for an unknown ?model= slug", () => {
    renderConfigurator("/configurator?model=nonexistent-car");
    expect(screen.getByText(MODELS[0].category)).toBeInTheDocument();
  });

  it("switches the photo when a different model tab is clicked", () => {
    renderConfigurator("/configurator");
    const temerario = MODELS.find((m) => m.slug === "temerario");

    fireEvent.click(screen.getByText(temerario.name));

    expect(screen.getByText(temerario.category)).toBeInTheDocument();
    const images = getPreviewImages(temerario.name);
    expect(
      images.some((img) => img.getAttribute("src") === temerario.image)
    ).toBe(true);
  });

  it("updates the total price when a paid color option is selected", async () => {
    renderConfigurator("/configurator");

    const paidColor = COLORS.find((c) => c.price > 0);
    fireEvent.click(screen.getByText(paidColor.name));

    const expectedTotal =
      MODELS[0].basePrice + paidColor.price + WHEELS[0].price + INTERIORS[0].price;

    await waitFor(() =>
      expect(screen.getByText(formatCurrency(expectedTotal))).toBeInTheDocument()
    );
  });
});

describe("Configurator page — 3D preview toggle", () => {
  it("only mounts the 3D viewer after the user clicks '3D Preview'", async () => {
    renderConfigurator("/configurator");
    expect(screen.queryByTestId("car-viewer-mock")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("3D Preview"));

    await waitFor(() =>
      expect(screen.getByTestId("car-viewer-mock")).toBeInTheDocument()
    );
  });

  it("passes the selected color's hex to the 3D viewer once toggled on", async () => {
    renderConfigurator("/configurator");
    fireEvent.click(screen.getByText("3D Preview"));
    await waitFor(() =>
      expect(screen.getByTestId("car-viewer-mock")).toBeInTheDocument()
    );

    const otherColor = COLORS[1];
    fireEvent.click(screen.getByText(otherColor.name));

    await waitFor(() =>
      expect(screen.getByTestId("car-viewer-mock")).toHaveTextContent(
        otherColor.hex
      )
    );
  });

  it("switching back to Photo unmounts the 3D viewer", async () => {
    renderConfigurator("/configurator");
    fireEvent.click(screen.getByText("3D Preview"));
    await waitFor(() =>
      expect(screen.getByTestId("car-viewer-mock")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Photo"));
    expect(screen.queryByTestId("car-viewer-mock")).not.toBeInTheDocument();
  });
});
