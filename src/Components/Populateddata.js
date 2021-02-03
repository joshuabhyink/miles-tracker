import {Component} from 'react'

const Populateddata = (props) => {
    
    return (
        <div>
                Miles: {props.trip.miles}  Date: {props.trip.date}
                <button onClick={e => props.deleteTrip(props.trip.id)}>Delete Trip</button>
                <button onClick={e => props.updateTrip(props.trip.id)}>Update Trip</button>
        </div>
    )
}

export default Populateddata