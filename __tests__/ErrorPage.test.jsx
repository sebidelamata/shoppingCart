import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import ErrorPage from '../src/routes/ErrorPage';
import { BrowserRouter } from "react-router-dom";

describe('ErrorPage', () => {
    it('renders headline', () => {
        render(
            <BrowserRouter> 
                <ErrorPage />
            </BrowserRouter>
        );

        screen.debug();
    });
    
})