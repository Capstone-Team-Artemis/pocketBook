const router = require('express').Router();
const { Event } = require('../db/models')
module.exports = router

//GET api/events

// router.get('/', async (req, res, next) => {
//     try {

//     } catch (err) {
//         next (err)
//     }
// )}

//POST api/events/:userId/createEvent
//host key 

router.post("/:userId/createEvent", async (req, res, next) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(201).send(newEvent)
    } catch (error) {
        next(error)
    }
})

//PUT api/events/:userId/updateEvent/:eventId 
//host key 
router.put('/:userId/updateEvent/:eventId', async(req, res, next) => {
    try {
        const eventId = req.params.eventId
        const event = await Event.findByPk(eventId)
        const updatedEvent = await event.update(req.body)
        res.send(updatedEvent)
    } catch (error) {
        next(error)
    }
})