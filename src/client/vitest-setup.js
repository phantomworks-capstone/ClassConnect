import '@testing-library/jest-dom/vitest';
import 'vitest-webgl-canvas-mock'


class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
  global.ResizeObserver = ResizeObserver;
