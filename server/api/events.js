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
        // let eventTitle = req.body.eventTitle;
        // let eventDescrition = req.body.eventDescription;
        // let eventDate = req.body.eventDate;
        // let eventTime = req.body.eventTime;
        const newEvent = await Event.create(req.body)
        res.status(201).send(newCampus)
    } catch (error) {
        next(error)
    }
})

//PUT api/events/:userId/updateEvent/:eventId 
//host key 
router.put('/events/:userId/updateEvent/:eventId', async(req, res, next) => {
    try {
        const eventId = req.params.eventId
        const event = await Event.findByPk(eventId)
        const updatedEvent = await campus.update(req.body)
        res.send(updatedEvent)
    } catch (error) {
        next(error)
    }
})