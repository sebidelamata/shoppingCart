import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Shop from '../src/routes/Shop';
import CustomRouter from "../src/routes/Router";

describe('Shop', () => {
    it('renders headline', () => {
        render(
            <CustomRouter>
                <Shop/>
            </CustomRouter>
        ); 

        screen.debug();
    });

    it('renders correct heading', () => {
        render(
            <CustomRouter>
                <Shop/>
            </CustomRouter>
        );
        expect(screen.getByRole('heading').textContent).toMatch('Vite + React')
    })
    
})