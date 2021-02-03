import {Component} from 'react'

const Populateddata = (props) => {
    
    return (
        <div>
                Miles: <input value={props.trip.miles} onChange={e => props.updateTripMiles(props.trip.id, e.target.value)}/>   
                Date: <input value={props.trip.date} onChange={e => props.updateTripDate(props.trip.id, e.target.value)}/>
                <button onClick={e => props.deleteTrip(props.trip.id)}>Delete Trip</button>
                <button onClick={e => props.updateTrip(props.trip.id)}>Update Trip</button>
        </div>
    )
}

export default Populateddata