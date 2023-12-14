import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import ErrorPage from '../src/routes/ErrorPage';
import Router from "../src/routes/Router";

describe('ErrorPage', () => {
    it('renders headline', () => {
        render(
            <Router>
                <ErrorPage />
            </Router>
        );

        screen.debug();
    });
    
})