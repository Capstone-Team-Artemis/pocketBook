'use strict';
const db = require('./db');
const { User, Event, Book, UserBook, UserEvent } = require('./db/models');

async function seed() {
  await db.sync({ force: true });

  const users = [
    {
      firstName: 'Selina',
      lastName: 'Byeon',
      username: 'byeonse',
      email: 'selina@pocketbook.com',
      password: 'password',
    },
    {
      firstName: 'Catherine',
      lastName: 'Martin',
      username: 'csmart1986',
      email: 'catherine@pocketbook.com',
      password: 'password',
    },
    {
      firstName: 'Sandy',
      lastName: 'Dai',
      username: 'sandaiiyahh',
      email: 'sandy@pocketbook.com',
      password: 'password',
    },
    {
      firstName: 'Kay',
      lastName: 'XiongPachay',
      username: 'hellokay27',
      email: 'kay@pocketbook.com',
      password: 'password',
    },
  ];

  const [selina, catherine, sandy, kay] = await User.bulkCreate(users, {
    returning: true,
  });

  const events = [
    {
      eventTitle: 'Welcome to Hogwarts!',
      date: '2021-04-08',
      startTime: '18:00',
      endTime: '20:00',
      description:
        'Muggles of Pocketbook, what did you think of that ending? Let’s discuss our favorite scenes, characters, and more! If we have time, let’s take the Sorting Hat quiz in the end to share our houses!',
      hostId: 1,
    },
    {
      eventTitle: 'Reality and Make Believe',
      date: '2021-04-09',
      startTime: '12:00',
      endTime: '14:00',
      description:
        'The Little Prince introduces a variety of philosophical concepts including authority, loneliness, and ownership. Did you read this classic? If so, when? What was your opinion of the book? Looking forward to discussing with you all!',
      hostId: 2,
    },
    {
      eventTitle: 'Who Did It?',
      date: '2021-09-27',
      startTime: '18:00',
      endTime: '20:00',
      description:
        "Welcome, our thrill seekers! Let's talk about And Then There Were None. Even though this was Agatha Christie's most difficult book to write, her hard work pays off! Let's talk about the world's best-selling mystery. Were you able to identify the killer? Which alliances did you think were the strongest? Excited to chat with you then!",
      hostId: 1,
    },
    {
      eventTitle: "Let's Talk Habits!",
      date: '2021-10-15',
      startTime: '18:00',
      endTime: '20:00',
      description:
        'For those who have read Atomic Habits, how did you enjoy it? How much of what you read did you apply into your daily lives? Everyone is welcome to join in as we will discuss building better habits and stopping bad ones. ',
      hostId: 3,
    },
    {
      eventTitle: 'Becoming Us',
      date: '2021-10-20',
      startTime: '13:00',
      endTime: '15:00',
      description:
        'With over 10,000,000 copies sold, what are your thoughts on the most successful memoir, Becoming? I have came prepared with discussion questions so I look forward to meeting and chatting with you all!',
      hostId: 3,
    },
    {
      eventTitle: 'The Power Of Sleep',
      date: '2021-11-02',
      startTime: '16:00',
      endTime: '18:00',
      description:
        "Do you think you are getting enough sleep every night? Because after reading this book, I am shocked at the impact sleep has on our lives. I would love to hear your inputs. Also, if you have any tips on getting a good night's rest, please share!!",
      hostId: 4,
    },
  ];

  const [hogwarts, bookwriting, women] = await Event.bulkCreate(events, {
    returning: true,
  });

  const books = [
    {
      googleId: '_ojXNuzgHRcC',
      title: 'Flowers',
      authors: ['Vijaya Khisty Bodach'],
      rating: 3.5,
      description:
        'Discover the beautiful science of flowers! Through full-color photos and simple, easy-to-follow text, this nonfiction book introduces emergent readers to the basics of botany, including information on how flowers grow, along with their uses. All Pebble Plus books align with national and state standards and are designed to help new readers read independently, making them the perfect choice for every child.',
    },
    {
      googleId: 'AZ5J6B1-4BoC',
      title: "The Girl Who Kicked the Hornet's Nest",
      authors: ['Stieg Larsson'],
      rating: 4.0,
      description:
        "In the third volume of the Millennium series, Lisbeth Salander lies in critical condition in a Swedish hospital, a bullet in her head. But she's fighting for her life in more ways than one: if and when she recovers, she'll stand trial for three murders. With the help of Mikael Blomkvist, she'll need to identify those in authority who have allowed the vulnerable, like herself, to suffer abuse and violence. And, on her own, she'll seek revenge--against the man who tried to killer her and against the corrupt government institutions that nearly destroyed her life.",
    },
    {
      googleId: '3YUrtAEACAAJ',
      title: "Harry Potter and the Sorcerer's Stone",
      authors: ['J.K. Rowling'],
      rating: 4.5,
      description:
        'A special new edition in celebration of the 20th anniversary of the publication of Harry Potter and the Sorcerer’s Stone, with a stunning new cover illustration by Caldecott Medalist Brian Selznick. Harry Potter has never been the star of a Quidditch team, scoring points while riding a broom far above the ground. He knows no spells, has never helped to hatch a dragon, and has never worn a cloak of invisibility. All he knows is a miserable life with the Dursleys, his horrible aunt and uncle, and their abominable son, Dudley - a great big swollen spoiled bully. Harry’s room is a tiny closet at the foot of the stairs, and he hasn’t had a birthday party in eleven years. But all that is about to change when a mysterious letter arrives by owl messenger: a letter with an invitation to an incredible place that Harry - and anyone who reads about him - will find unforgettable. For it’s there that he finds not only friends, aerial sports, and magic in everything from classes to meals, but a great destiny that’s been waiting for him... if Harry can survive the encounter. This gorgeous new edition in celebration of the 20th anniversary of the publication of Harry Potter and the Sorcerer’s Stone features a newly designed cover illustrated by Caldecott Medalist Brian Selznick, as well as the beloved original interior decorations by Mary GrandPré.',
    },
  ];
  const [flowers, hornet, harry] = await Book.bulkCreate(books, {
    returning: true,
  });

  const userBooks = [
    {
      userId: 1,
      bookId: 1,
      status: 'Currently Reading',
    },
    {
      userId: 1,
      bookId: 2,
      status: 'Currently Reading',
    },
    {
      userId: 1,
      bookId: 3,
      status: 'Currently Reading',
    },
  ];

  const [testcase] = await UserBook.bulkCreate(userBooks, { returning: true });

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
    {
      userId: 1,
      eventId: 3,
    },
  ];

  const [eventcase] = await UserEvent.bulkCreate(userEvents, {
    returning: true,
  });
}

// We've separated the `seed` function from the `runSeed` function.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.

if (module === require.main) {
  runSeed();
}

module.exports = seed;
