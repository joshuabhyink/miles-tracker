const express = require('express')
const ctrl = require('./controller/controllerfunctions')

const app = express()

app.use(express.json())

const port = 3001

app.post('/api/trips', ctrl.createTrip)
app.get('/api/trips', ctrl.readTrip)
app.get('/api/oil', ctrl.readMilesToOilChange)
app.put('/api/trips/:id', ctrl.updateTrip)
app.put('/api/oil/:miles', ctrl.updateMilesToOilChange)
app.delete('/api/trips/:id', ctrl.deleteTrip)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})