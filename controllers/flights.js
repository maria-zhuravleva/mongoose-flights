import { Flight } from '../models/flight.js'

function index(req, res) {
  Flight.find({}).sort({departs: 1})
  .then (flights => {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}
// dosn't work 1
// const currentDate = new Date
// for (let key in req.body) {
//   if (key === departs && req.body[key] < currentDate) {
//     req.body[key]
//   } 
// }
// dosn't work 2
// flights.forEach(flight => {
//   const departs = flight.departs
//   if (departs < currentDate) {
//     flight.classList.add('red')
//   }
// })

function newFlight(req, res){
  const newFlight = new Flight();
// Obtain the default date
  const dt = newFlight.departs;
// Format the date for the value attribute of the input
  const departsDate = dt.toISOString().slice(0, 16);
  Flight.find({})
  .then(flights => {
    res.render('flights/new', {
      flight: departsDate,
      title: 'Add Flight'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function create(req, res){
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
	}
  Flight.create(req.body)
  .then(flight => {
    console.log(flight)
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function show(req, res){
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/show', {
      title: 'Flight Details',
      flight: flight
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function deleteFlight(req, res){
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function edit(req, res){
  Flight.findById(req.params.flightId)
  .then (flight => {
    res.render('flights/edit', {
      title: 'Edit Flight'
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function update(req, res){
  Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
  .then(flight => {
    res.redirect(`flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

export {
  index,
  newFlight as new,
  create,
  show,
  deleteFlight as delete,
  edit,
  update
}