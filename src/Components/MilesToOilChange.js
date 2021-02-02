import {Component} from 'react'

const MilesToOilChange = (props) => {

        return (
            <div>
                {props.milesToOilChange}
                <input placeholder='Enter mileage with new oil type...' onChange={e => props.updateOilChange(e.target.value)}/>
                <button onClick={props.updateMilesToOilChange}>Change Miles With Different Oil Type</button>
            </div>
        )
}

export default MilesToOilChange