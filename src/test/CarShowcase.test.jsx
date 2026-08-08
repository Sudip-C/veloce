import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CarShowcase } from "@/components/sections/CarShowcase";

vi.mock("@/components/three/CarViewer", () => ({
  CarViewer: ({ color }) => <div data-testid="car-viewer-mock">{color}</div>,
}));

describe("CarShowcase", () => {
  it("defaults to the first color and updates the viewer when a swatch is clicked", async () => {
    render(<CarShowcase />);

    await waitFor(() =>
      expect(screen.getByTestId("car-viewer-mock")).toHaveTextContent("#d4ff3f")
    );

    fireEvent.click(screen.getByLabelText("Racing Red"));

    await waitFor(() =>
      expect(screen.getByTestId("car-viewer-mock")).toHaveTextContent("#e0332f")
    );
  });

  it("marks the active swatch with aria-pressed for accessibility", async () => {
    render(<CarShowcase />);
    const limeSwatch = screen.getByLabelText("Volt Lime");
    const redSwatch = screen.getByLabelText("Racing Red");

    expect(limeSwatch).toHaveAttribute("aria-pressed", "true");
    expect(redSwatch).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(redSwatch);

    await waitFor(() => {
      expect(redSwatch).toHaveAttribute("aria-pressed", "true");
      expect(limeSwatch).toHaveAttribute("aria-pressed", "false");
    });
  });
});
