import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import ErrorPage from '../src/ErrorPage';
import Router from "../src/Router";
import { MemoryRouter } from "react-router-dom";

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