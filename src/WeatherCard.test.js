import React from 'react';
import { render } from '@testing-library/react';
import jest from 'jest'
import WeatherCard from './WeatherCard';
import axios from 'axios';

describe('Weather card testing', () => {
    test('no imput test', async () => {
        const { getByText } = render(<WeatherCard />);
        
        const noInput = getByText('Loading...')

        expect(noInput).toBeInTheDocument();
    });

    test('API and card test', async ()=>{
        await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=London&days=4`).then(response =>{
            let weather = response.data
            const { getByAltText} = render(<WeatherCard day={weather.current} active={true} weatherType='current' degreeState={true} />);

            let icon = getByAltText('Weather Icon')

            expect(icon).toBeInTheDocument()
        })
    })
});