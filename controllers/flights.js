import { Flight } from '../models/flight.js'

function index(req, res) {
  Flight.find({})
  .then (flights => {
    res.render('flights/index', {
      flights
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

export {
  index,
}