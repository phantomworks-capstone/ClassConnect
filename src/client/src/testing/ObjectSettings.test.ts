import ObjectSettings from '../lib/components/envirmonment/models/+ObjectSettings.svelte';
import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

describe('ObjectSettings Component', () => {
  it('should render checkboxes and sliders correctly', () => {
    const { container } = render(ObjectSettings, {
      autoRotate: false,
      enableDamping: true,
      rotateSpeed: 1.5,
      zoomToCursor: false,
      zoomSpeed: 2,
      enableZoom: true
    });

    // Select checkboxes by their class names
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(4);

    // Check initial states
    expect(checkboxes[0].checked).toBe(false); // autoRotate
    expect(checkboxes[1].checked).toBe(true); // enableDamping
    expect(checkboxes[2].checked).toBe(true); // enableZoom
    expect(checkboxes[3].checked).toBe(false); // zoomToCursor

    // Select sliders by their class names
    const sliders = container.querySelectorAll('input[type="text"]');
    expect(sliders.length).toBe(2);

    // Check initial slider values
    expect(sliders[0].value).toBe('1.5'); // rotateSpeed
    expect(sliders[1].value).toBe('2.0'); // zoomSpeed
  });

  it('should update state on checkbox change', async () => {
    const { container } = render(ObjectSettings, {
      autoRotate: false,
      enableDamping: true,
      rotateSpeed: 1.5,
      zoomToCursor: false,
      zoomSpeed: 2,
      enableZoom: true
    });

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');

    // Simulate changing the autoRotate checkbox
    await fireEvent.click(checkboxes[0]);
    expect(checkboxes[0].checked).toBe(true); // autoRotate should now be true
  });

  it('should update state on slider change', async () => {
    const { container } = render(ObjectSettings, {
      autoRotate: false,
      enableDamping: true,
      rotateSpeed: 1.5,
      zoomToCursor: false,
      zoomSpeed: 2,
      enableZoom: true
    });

    const sliders = container.querySelectorAll('input[type="text"]');

    // Simulate changing the rotateSpeed slider
    await fireEvent.input(sliders[0], { target: { value: '3' } });
    expect(sliders[0].value).toBe('3'); // rotateSpeed should now be 3
  });
});
