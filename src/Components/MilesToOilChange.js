import {Component} from 'react'

const MilesToOilChange = (props) => {

        return (
            <div>
                {/* {props.milesToOilChange} */}
                <input placeholder='Enter mileage with new oil type...' value={props.milesToOilChangeInput} onChange={e => props.handleMileInput(e)}/>
                <button onClick={props.updateMilesToOilChange}>Change Miles With Different Oil Type</button>
            </div>
        )
}

export default MilesToOilChange