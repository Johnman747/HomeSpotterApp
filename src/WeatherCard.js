import React from 'react';
import { Card } from 'antd';
import moment from 'moment';

const colorSelect = (index) => {
    if (index !== undefined) {
        switch (index) {
            case 0:
                return "#d9defd";
            case 1:
                return "#a8b5fa";
            case 2:
                return "#788bf8";
            default:
                return "white"
        }
    }
}

const WeatherType = props => {
    let active = props.active
    let day = props.day;
    let weatherType = props.weatherType;
    let color = colorSelect(props.index);
    //Display of the current weather response
    if (weatherType === 'current') {
        return (
            !active ?
                <>
                    <Card bordered={false} style={{ marginBottom: 5, width: 300, display: 'block', margin: "auto", backgroundColor: "lightPink" }}>
                        <div className='notActive'>
                            <h2 className="notActiveSub">{props.degreeState ? Math.round(day.temp_f) : Math.round(day.temp_c)} &deg;</h2>
                            <h2 className="notActiveSub">Today</h2>
                            <img alt="Weather Icon" className="notActiveSub" src={day.condition.icon}></img>
                        </div>
                    </Card>
                </>
                :
                <>
                    <Card title={<h2>Today</h2>} bordered={false} style={{ marginBottom: 5, width: 300, display: 'block', margin: "auto", backgroundColor: "lightPink" }}>
                        <h2>{day.condition.text}</h2>
                        <img alt="Weather Icon" src={day.condition.icon}></img>
                        <h1>{props.degreeState ? Math.round(day.temp_f) : Math.round(day.temp_c)} &deg;</h1>
                    </Card>
                </>
        )
    }
    //Display of the forcast weather response
    if (weatherType === 'forecast') {
        return (
            !active ?
                <>
                    <Card bordered={false} style={{ marginBottom: 10, width: 300, display: "block", flex: "flexbox", margin: "auto", backgroundColor: color }}>
                        <div className='notActive'>
                            <h2 className="notActiveSub">{props.degreeState ? Math.round(day.day.avgtemp_f) : Math.round(day.day.avgtemp_c)} &deg;</h2>
                            <h2 className="notActiveSub">{moment(day.date).format("dddd")}</h2>
                            <img alt="Weather Icon" className="notActiveSub" src={day.day.condition.icon}></img>
                        </div>
                    </Card>
                </>
                :
                <>
                    <Card title={<h2>{moment(day.date).format("dddd, MM/DD")}</h2>} bordered={false} style={{ marginBottom: 10, width: 300, display: "block", flex: "flexbox", margin: "auto", backgroundColor: color }}>
                        <h2>{day.day.condition.text}</h2>
                        <img alt="Weather Icon" src={day.day.condition.icon}></img>
                        <h1> HI:{props.degreeState ? Math.round(day.day.maxtemp_f) : Math.round(day.day.maxtemp_c)} &deg;</h1>
                        <h1> AVG:{props.degreeState ? Math.round(day.day.avgtemp_f) : Math.round(day.day.avgtemp_c)} &deg;</h1>
                    </Card>
                </>
        )
    }
    return <></>
}

export default WeatherType;