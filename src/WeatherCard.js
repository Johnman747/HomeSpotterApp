import React, { useState } from 'react';
import { Card } from 'antd';
import moment from 'moment';

const weatherType = props => {
    let day = props.day;
    let weatherType = props.weatherType;
    //Display of the current weather response
    if (weatherType === 'current') {
        return (
            <Card>
                <h2>{day.condition.text}</h2>
                <img src={day.condition.icon}></img>
                <h1>{props.degreeState ? Math.round(day.temp_f) : Math.round(day.temp_c)} &deg;</h1>
            </Card>
        )
    }
    //Display of the forcast weather response
    if (weatherType === 'forecast') {
        return (
            <Card title={<h2>{moment(day.date).format("dddd, MM/DD")}</h2>} style={{ width: 300, display: "inline-block", flex: "flexbox", margin: 5 }}>
                <h2>{day.day.condition.text}</h2>
                <img src={day.day.condition.icon}></img>
                <h1> HI:{props.degreeState ? Math.round(day.day.maxtemp_f) : Math.round(day.day.maxtemp_c)} &deg;</h1>
                <h1> AVG:{props.degreeState ? Math.round(day.day.avgtemp_f) : Math.round(day.day.avgtemp_c)} &deg;</h1>
            </Card>
        )
    }
    return <></>
}

export default weatherType;