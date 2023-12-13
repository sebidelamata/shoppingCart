import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import App from '../src/App';


describe('App', () => {
    it('renders headline', () => {
        render(<App title="React" />);

        screen.debug();
    });

    it('renders correct heading', () => {
        render(<App />);
        expect(screen.getByRole('heading').textContent).toMatch('Vite + React')
    })
    
})