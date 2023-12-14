import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Checkout from "../src/routes/Checkout";
import { BrowserRouter } from "react-router-dom";

describe('Checkout', () => {
    it('renders headline', () => {
        render(
            <BrowserRouter>
                <Checkout />
            </BrowserRouter>
        ); 

        screen.debug();
    });
    
})