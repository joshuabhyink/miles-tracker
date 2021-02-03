import {Component} from 'react'

const MilesToOilChange = (props) => {

        return (
            <div>
                <input placeholder='Enter new mileage...' value={props.milesToOilChangeInput} onChange={e => props.handleMileInput(e)}/>
                <button className='button-oilchange' onClick={props.updateMilesToOilChange}>Different Oil Mileage</button>
            </div>
        )
}

export default MilesToOilChange