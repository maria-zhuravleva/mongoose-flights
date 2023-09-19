import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:flightId', flightsCtrl.show)
router.post('/', flightsCtrl.create)
router.post('/:flightId/tickets', flightsCtrl.createTicket)
router.delete('/:flightId', flightsCtrl.delete)
router.get('/:flightId/edit', flightsCtrl.edit)
router.put('/:movieId', flightsCtrl.update)

export { router }
