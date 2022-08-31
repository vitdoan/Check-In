import React from 'react';
import './stats.css'
import history from './images/history.png'
import location from './images/location.png'
import calendar from './images/calendar.png'

export default function Stats({ date , time, address}) {
    return <div className='StatsCard'>
        <button>Check in</button>
        <div className='addressCard'>
                <h3>Address</h3>
                <p>{address}</p>
        </div>
        <div className='stats'>
            <img src={location} alt='visit'/>
            <div className='statsDescription'>
                <div className='num'>5</div>
                <div className='text'>Total visits</div>
            </div>
        </div>
        <div className='stats'>
            <img src={calendar} alt='visit'/>
            <div className='statsDescription'>
                <div className='num'>{date}</div>
                <div className='num2'>at {time}</div>
                <div className='text'>Current visit</div>
            </div>
        </div>
        <div className='stats'>
            <img src={history} alt='visit'/>
            <div className='statsDescription'>
                <div className='num'>{date}</div>
                <div className='num2'>at {time}</div>
                <div className='text'>Last visit</div>
            </div>
        </div>
    </div>
}