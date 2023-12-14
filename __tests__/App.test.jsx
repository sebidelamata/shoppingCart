import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import App from '../src/routes/App';
import { BrowserRouter } from "react-router-dom";


describe('App', () => {
    it('renders headline', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        screen.debug();
    });

    it('renders correct heading', () => {
        render(
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        );
        expect(screen.getByRole('heading').textContent).toMatch('GapingPond')
    })
    
})