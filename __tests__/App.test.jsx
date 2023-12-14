import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import App from '../src/routes/App';
import CustomRouter from "../src/routes/Router";


describe('App', () => {
    it('renders headline', () => {
        render(
            <CustomRouter>
                <App />
            </CustomRouter>
        );
        screen.debug();
    });

    it('renders correct heading', () => {
        render(
            <CustomRouter>
                <App/>
            </CustomRouter>
        );
        expect(screen.getByRole('heading').textContent).toMatch('Vite + React')
    })
    
})