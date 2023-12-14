import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Shop from '../src/routes/Shop';


describe('Shop', () => {
    it('renders headline', () => {
        render(<Shop />);

        screen.debug();
    });

    it('renders correct heading', () => {
        render(<Shop />);
        expect(screen.getByRole('heading').textContent).toMatch('Vite + React')
    })
    
})