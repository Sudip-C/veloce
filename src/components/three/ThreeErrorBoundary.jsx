import { Component } from "react";

/**
 * WebGL can legitimately fail (old GPU, disabled hardware acceleration,
 * a browser flag). Wrap any <Canvas> in this so that failure takes down
 * just the 3D section, not the whole page.
 */
export class ThreeErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("3D viewer failed to render:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex items-center justify-center text-center px-6">
          <p className="text-sm text-muted">
            {this.props.fallbackMessage ??
              "The 3D viewer couldn't load on this device."}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
