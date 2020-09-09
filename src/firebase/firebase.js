import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAI,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

export { firebase, database as default }

// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })

// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log(snapshot.key, snapshot.val())
// })


// database.ref('expenses')
//   .on('value', (snapshot) => {
//     const expenses = []
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       })
//     })
//     console.log(expenses)
//   })

// database.ref('expenses').push({
//   discription: 'Rent',
//   note: '',
//   amount: 109500,
//   createdAt: 5365645645
// })

// database.ref().on('value', (snapshot) => {
//   const val = snapshot.val()
//   console.log(`${val.name} is a ${val.job.title} at ${val.job.company}.`)
// }, (e) => {
//   console.log('Error with data fetching', e)
// })

// setTimeout(() => {
//   database.ref('age').set(29)
// }, 3500)

// setTimeout(() => {
//   database.ref().off('value', onValueChange)
// }, 7000)

// setTimeout(() => {
//   database.ref('age').set(30)
// }, 10500)


// database.ref('location/city')
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val()
//     console.log(val)
//   })
//   .catch((e) => {
//     console.log('Fetching data', e)
//   })

// database.ref().set({
//   name: 'Andrew Mead',
//   age: 26,
//   stresLevel: 6,
//   job: {
//     title: 'Software developer',
//     company: 'Google'
//   },
//   location: {
//     city: 'Philadelphia',
//     country: 'United States'
//   }
// }).then(() => {
//   console.log('Data is saved!');
// }).catch((e) => {
//   console.log('This failed.', e);
// })

// database.ref().update({
//   stresLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Seattle'
//   }).then(() => {
//     console.log('Success! ');
//   }).catch((e) => {
//     console.log('This failed. ', e);
//   })

// database.ref('isSingle').remove()
//   .then(() => {
//     console.log('Data waw removed.')
//   })
//   .catch((e) => {
//     console.log('Did not remove data' + e)
//   })