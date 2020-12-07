import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App';
import axios from 'axios';

describe('search testing', () => {
    test('Start Up Test', async () => {
        const { getByText, getByTestId } = render(<App />);

        const button = getByText('Search');
        const input = getByTestId('input')
        const degreeSwitch = getByTestId('degree-switch');

        expect(button).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(degreeSwitch).toBeInTheDocument();
    });
});
