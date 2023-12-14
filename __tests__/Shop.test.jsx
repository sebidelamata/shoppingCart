import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Shop from '../src/routes/Shop';
import CustomRouter from "../src/routes/Router";
import { BrowserRouter } from "react-router-dom";

describe('Shop', () => {
    it('renders headline', () => {
        render(
           <BrowserRouter>
            <Shop />
           </BrowserRouter>
        ); 

        screen.debug();
    });

    it('renders correct heading', () => {
        render(
            <BrowserRouter>
                <Shop/>
            </BrowserRouter>
        );

        expect(screen.getByRole('heading').textContent).toMatch('Shop NFTs')
    })
    
})