import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Models from "@/pages/Models";
import { MODELS } from "@/data/models";

function renderModels() {
  return render(
    <MemoryRouter initialEntries={["/models"]}>
      <Routes>
        <Route path="/models" element={<Models />} />
        <Route path="/configurator" element={<div>Configurator Page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Models page", () => {
  it("renders a card for every model in the data file", () => {
    renderModels();
    for (const model of MODELS) {
      expect(screen.getByText(model.name)).toBeInTheDocument();
      expect(screen.getByText(model.tagline)).toBeInTheDocument();
    }
  });

  it("renders each model's image with the correct src and non-empty alt text", () => {
    renderModels();
    for (const model of MODELS) {
      const img = screen.getByAltText(model.name);
      expect(img).toHaveAttribute("src", model.image);
    }
  });

  it("shows power, 0-60, and top speed for every model", () => {
    renderModels();
    for (const model of MODELS) {
      // getAllByText, not getByText: some models legitimately share a spec
      // value (both Urus variants top out at 194 mph), which getByText
      // would reject as an ambiguous match.
      expect(screen.getAllByText(model.specs.power).length).toBeGreaterThan(0);
      expect(
        screen.getAllByText(model.specs.zeroToSixty).length
      ).toBeGreaterThan(0);
      expect(
        screen.getAllByText(model.specs.topSpeed).length
      ).toBeGreaterThan(0);
    }
  });
});
