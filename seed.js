
'use strict'
const db = require('./server/db')
const { User, Event, Book, UserBook, UserEvent } = require ('./server/db/models')

async function seed () {

    await db.sync({force:true})

    const users = [
    { 
        firstName: "Selina",
        lastName: "Byeon",
        username: "Selina",
        email: "selina@pocketbook.com",
        password: "password",
        },
        { 
        firstName: "Catherine",
        lastName: "Martin",
        username: "Catherine",
        email: "catherine@pocketbook.com",
        password: "password",
        },
        { 
        firstName: "Sandy",
        lastName: "Dai",
        username: "Sandy",
        email: "sandy@pocketbook.com",
        password: "password",
        },
        { 
        firstName: "Kay",
        lastName: "XiongPachay",
        username: "Kay",
        email: "kay@pocketbook.com",
        password: "password",
        },
    ]

    const [selina, catherine, sandy, kay] = await User.bulkCreate(users, {
        returning: true
      })

    const events = [
        {
            eventTitle: "Welcome to Hogwarts!",
            date: "04/08/21",
            time: "06:00pm - 08:00pm",
            description: "Muggles of pocketbook, finished reading the series? Let’s discuss our favorite scenes, characters, and more! If we have time, let’s take the Sorting Hat quiz in the end to find our houses!",
            host: 1
        },
        {
            eventTitle: "Book Writing Class for Kids!",
            date: "04/09/21",
            time: "02:00pm - 04:00pm",
            description:"Enjoy this FREE virtual club for kids led by child authors & illustrators, Avery & Avion, along with author, educator and Luxe Library co-founder- Delicia B. Davis. We will work step by step to plan, create, design, and finish our books. You won’t want to miss this opportunity to engage with artistic youth while creating your own lasting work of art! Register NOW for your Free Spot!",
            host: 2
        },
        {
            eventTitle: "Book Discussion: Women Talking by Miriam Toews",
            date: "08/27/21",
            time: "06:30pm - 08:30pm",
            description:"Join the Mulberry Street Branch for a discussion of Miriam Toew's novel 'Women Talking.'",
            host: 1
        },
    ]

    const [
        hogwarts,
        bookwriting, 
        women
      ] = await Event.bulkCreate(events, {returning: true})

    const books = [
        {
        googleId: "_ojXNuzgHRcC",
        title: "Flowers",
        authors: ["Vijaya Khisty Bodach"],
        rating: 3.5,
        description: "Discover the beautiful science of flowers! Through full-color photos and simple, easy-to-follow text, this nonfiction book introduces emergent readers to the basics of botany, including information on how flowers grow, along with their uses. All Pebble Plus books align with national and state standards and are designed to help new readers read independently, making them the perfect choice for every child."
        },
        {
        googleId: "AZ5J6B1-4BoC",
        title: "The Girl Who Kicked the Hornet's Nest",
        authors: ["Stieg Larsson"],
        rating: 4.0,
        description: "In the third volume of the Millennium series, Lisbeth Salander lies in critical condition in a Swedish hospital, a bullet in her head. But she's fighting for her life in more ways than one: if and when she recovers, she'll stand trial for three murders. With the help of Mikael Blomkvist, she'll need to identify those in authority who have allowed the vulnerable, like herself, to suffer abuse and violence. And, on her own, she'll seek revenge--against the man who tried to killer her and against the corrupt government institutions that nearly destroyed her life."
        },
        {
        googleId: "3YUrtAEACAAJ",
        title: "Harry Potter and the Sorcerer's Stone",
        authors: ["J.K. Rowling"],
        rating: 4.5,
        description: "A special new edition in celebration of the 20th anniversary of the publication of Harry Potter and the Sorcerer’s Stone, with a stunning new cover illustration by Caldecott Medalist Brian Selznick. Harry Potter has never been the star of a Quidditch team, scoring points while riding a broom far above the ground. He knows no spells, has never helped to hatch a dragon, and has never worn a cloak of invisibility. All he knows is a miserable life with the Dursleys, his horrible aunt and uncle, and their abominable son, Dudley - a great big swollen spoiled bully. Harry’s room is a tiny closet at the foot of the stairs, and he hasn’t had a birthday party in eleven years. But all that is about to change when a mysterious letter arrives by owl messenger: a letter with an invitation to an incredible place that Harry - and anyone who reads about him - will find unforgettable. For it’s there that he finds not only friends, aerial sports, and magic in everything from classes to meals, but a great destiny that’s been waiting for him... if Harry can survive the encounter. This gorgeous new edition in celebration of the 20th anniversary of the publication of Harry Potter and the Sorcerer’s Stone features a newly designed cover illustrated by Caldecott Medalist Brian Selznick, as well as the beloved original interior decorations by Mary GrandPré."
        }
    ]
    const [
        flowers,
        hornet, 
        harry
      ] = await Book.bulkCreate(books, {returning: true})

    const userBooks = [
        {
          userId: 1,
          bookId: 2,
          status: 'Currently Reading'
        },
    ]

    const [
        testcase
      ] = await UserBook.bulkCreate(userBooks, {returning: true})

    const userEvents = [
        {
          userId: 1,
          eventId: 1,
        },
        {
          userId: 2,
          eventId: 1,
        },
        {
          userId: 2,
          eventId: 2,  
        },
    ]

    const [
        eventcase
      ] = await UserEvent.bulkCreate(userEvents, {returning: true})
}


// We've separated the `seed` function from the `runSeed` function.
async function runSeed() {
    console.log('seeding...')
    try {
      await seed()
    } catch (err) {
      console.error(err)
      process.exitCode = 1
    } finally {
      console.log('closing db connection')
      await db.close()
      console.log('db connection closed')
    }
  }


// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.

if (module === require.main) {
    runSeed()
}
  

module.exports = seed;
