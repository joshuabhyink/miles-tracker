import {Component} from 'react'

const Populateddata = (props) => {
    
    return (
        <div className='data'>
            <div className='inputs'>
                Miles: <input value={props.trip.miles} onChange={e => props.updateTripMiles(props.trip.id, +e.target.value)}/>   
                Date: <input value={props.trip.date} onChange={e => props.updateTripDate(props.trip.id, e.target.value)}/>
            </div>
            <div className='delete'>
                <div className='buttons'>
                <button className='delete-button' onClick={e => props.deleteTrip(props.trip.id)}>Delete Trip</button>
                <button className='update-button' onClick={e => props.updateTrip(props.trip.id)}>Update Trip</button>
                </div>
            </div>
        </div>
    )
}

export default Populateddata