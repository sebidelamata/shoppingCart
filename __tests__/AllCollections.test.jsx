import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import AllCollections from '../src/components/AllCollections'
import { BrowserRouter } from "react-router-dom";

describe('AllCollections', () => {
    it('fetches', () => {
        <BrowserRouter>
            <AllCollections/>
        </BrowserRouter>
    });
    screen.debug()
})