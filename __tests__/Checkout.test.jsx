import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Checkout from "../src/routes/Checkout";
import CustomRouter from "../src/routes/Router";

describe('Checkout', () => {
    it('renders headline', () => {
        render(
            <CustomRouter>
                <Checkout />
            </CustomRouter>
        ); 

        screen.debug();
    });
    
})