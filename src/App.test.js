import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App'

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

    test('test input', () => {
        const { getByText, getByTestId } = render(<App />);

        const input = getByTestId('input');
        
        fireEvent.change(input, { target: { value: "Minneapolis, Minnesota, United States of America" } })
        expect(input.value).toBe("Minneapolis, Minnesota, United States of America")
        // fireEvent.click(button);
    })
});
