const router = require('express').Router();
const { Event, User, UserEvent } = require('../db/models');
module.exports = router;
// Events Routes
// GET api/events/userId --> get ALL events, and include user info if it's the logged in user & she is attending the event
router.get('/:userId', async (req, res, next) => {
  try {
    const events = await Event.findAll({
      include: {
        model: User,  
        where: {
          id: req.params.userId,
        },
        required: false  // b/c value is false, it is a LEFT JOIN -> show all events no matter what,
                              // and for each event only include logged-in user if attending
      }
    }
    );
    if (events.length >= 1) {
      res.json(events);
    } else {
      res.send('There are currently no upcoming events!');
    }
  } catch (err) {
    next(err);
  }
});

// GET api/events/attending --> get ALL events that you are attending
router.get('/:userId/attending', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const events = await Event.findAll({
      include: {
        model: User,
        where: {
          id: userId,
        },
      },
    });
    if (events.length >= 1) {
      console.log(events);
      res.json(events);
    } else {
      res.send('Currently not attending any events!');
    }
  } catch (err) {
    next(err);
  }
});

// GET api/events/created --> get ALL events that you CREATED (you are the HOST)
router.get('/:userId/created', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const events = await Event.findAll({
      where: {
        host: userId,
      },
    });
    if (events.length >= 1) {
      console.log(events);
      res.json(events);
    } else {
      res.send('Currently have not created any events!');
    }
  } catch (err) {
    next(err);
  }
});

// DELETE api/events/delete/eventId --> delete SINGLE event (if you are the host) based on the event id
router.delete('/:userId/delete/:eventId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const eventId = req.params.eventId;
    // destroy the event where you are the host and the event matches your request
    // finds all rows (will only be 1 match b/c event ids are unique) where host id matches whoever is logged in & the event id matches what was submitted in the route
    const result = await Event.destroy({
      where: { host: userId, id: eventId },
    });
    if (result) {
      res.sendStatus(200);
    } else {
      res.send('You are not authorized to delete this event!');
    }
  } catch (err) {
    next(err);
  }
});

// DELETE api/events/unregister/eventId --> unregister from single event based on the event id
router.delete('/:userId/unregister/:eventId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log('userid: ', userId)
    const eventId = req.params.eventId;
    console.log('eventid: ', eventId)
    const result = await UserEvent.destroy({
      // only able to unregister your own attendance to an event
      // finds all rows (will only be 1 match b/c event ids are unique) where user id matches whoever is logged in & the event id matches what was submitted in the route
      where: { userId: userId, eventId: eventId },
    });
    if (result) {
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
});

// POST api/events/register/eventId --> register for single event based on the event id and user id
router.post('/:userId/register/:eventId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const eventId = req.params.eventId;
    const result = await UserEvent.create({
      userId: userId, eventId: eventId 
    });
    if (result) {
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
});

//To create event
//POST api/events/createEvent
router.post('/createEvent', async (req, res, next) => {
  try {
    const newEvent = await Event.create(req.body);
    console.log('newEvent', newEvent);
    res.status(201).send(newEvent);
  } catch (error) {
    next(error);
  }
});

//To edit event
//PUT api/events/:userId/updateEvent/:eventId
router.put('/:userId/updateEvent/:eventId', async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const event = await Event.findByPk(eventId);
    const updatedEvent = await event.update(req.body);
    res.send(updatedEvent);
  } catch (error) {
    next(error);
  }
});
