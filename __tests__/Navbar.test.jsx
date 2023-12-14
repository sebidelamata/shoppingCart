import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar.jsx';
import CustomRouter from "../src/routes/Router.jsx";


describe('Navbar', () => {
    it('renders headline', () => {
        render(
            <CustomRouter>
                <Navbar />
            </CustomRouter>
        );

    });
    
})