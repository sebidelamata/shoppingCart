import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar.jsx';
import { BrowserRouter } from "react-router-dom";


describe('Navbar', () => {
    it('renders headline', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );

    });
    
})