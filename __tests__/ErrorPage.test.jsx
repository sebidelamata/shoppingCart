import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import ErrorPage from '../src/routes/ErrorPage';
import CustomRouter from "../src/routes/Router";

describe('ErrorPage', () => {
    it('renders headline', () => {
        render(
            <CustomRouter> 
                <ErrorPage />
            </CustomRouter>
        );

        screen.debug();
    });
    
})