import { Flight } from '../models/flight.js'
import { Meal } from '../models/meal.js'

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

function newFlight(req, res){
  const newFlight = new Flight();
  const dt = newFlight.departs
  const departsDate = dt.toISOString().slice(0, 16)
  Flight.find({})
  .then(flights => {
    res.render('flights/new', {
      flights,
      departsDate: departsDate,
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
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function show(req, res){
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        title: 'Flight Details',
        flight: flight,
        meals: meals
      })
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
    const departsDate = flight.departs.toISOString().substring(0, 10)
    res.render('flights/edit', {
      flight,
      departsDate: departsDate,
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
function createTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(error => {
      console.log(error)
      res.redirect('/flights')
    })
  })
  .catch(error => {
    console.log(error)
    res.redirect('/flights')
  })
}

function deleteTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.id(req.params.ticketId).deleteOne()
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
  })
  .catch(error => {
    console.log('Error finding flight:', error)
    res.redirect('/flights')
  })
  }

function addToMeal(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
		.then(() => {
      res.redirect(`/flights/${flight._id}`)
		})
    .catch(err => {
      console.log(err)
      res.redirect("/flights")
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/flights")
  })
}

function deleteMeal(req, res){
  Flight.findByIdAndUpdate(req.params.flightId, {
    $pull: { meals: req.params.mealId }
  })
  .then(() => {
    res.redirect(`/flights/${req.params.flightId}`);
  })
  .catch(error => {
    console.log('Error finding flight:', error);
    res.redirect('/flights');
  });
}

export {
  index,
  newFlight as new,
  create,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  deleteTicket,
  addToMeal,
  deleteMeal
}