const moment = require('moment');


// Jan 1st 1970 00:00:00 == new Date().getTime() === 0

// const date = new Date();
// const months = ['Jan', 'Feb'];

// console.log(date.getMonth());
// console.log(months[date.getMonth()]);
const createdAt = new Date().getTime();
const someTimestamp = moment().valueOf();

const date = moment(createdAt);
// date.add(100,'year').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'));

console.log(date.format('h:mm a'))
