import {Component} from 'react'

const Populateddata = (props) => {
    
    return (
        <div>
                {props.trip.miles}
                {props.trip.date}
        </div>
    )
}

export default Populateddata