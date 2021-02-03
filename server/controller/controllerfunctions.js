let trips = []

let id = 1
let milesToOilChange = '6000'

module.exports = {
    createTrip: (req, res) => {
        trips.push({id, miles: req.body.miles, date: req.body.date})
        id++
        res.status(200).send(trips)
    },
    readTrip: (req, res) => {
        res.status(200).send(trips)
    },
    readMilesToOilChange: (req, res) => {
        res.status(200).send(milesToOilChange)
    },
    updateTrip: (req, res) => {
        console.log(req.body)
        const updateId = req.params.id
        const index = trips.findIndex(trip => trip.id === +updateId)
        let trip = trips[index]
        trip.miles = req.body.miles || trip.miles
        trip.date = req.body.date || trip.date
        trips.splice(index, 1, trip)
        res.status(200).send(trips)
    },
    updateMilesToOilChange: (req, res) => {
        milesToOilChange = req.params.miles
        res.status(200).send(milesToOilChange)
    },
    deleteTrip: (req, res) => {
        const deleteId = req.params.id
        const index = trips.findIndex(trip => trip.id === +deleteId)
        trips.splice(index, 1)
        res.status(200).send(trips)
    }
}