import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Checkout from "../src/routes/Checkout";


describe('Checkout', () => {
    it('renders headline', () => {
        render(<Checkout />);

        screen.debug();
    });
    
})