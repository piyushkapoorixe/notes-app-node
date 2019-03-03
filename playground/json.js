// Converting Object to String STARTS
// var obj = {
//     name: "Piyush"
// };
// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);
// Converting Object to String ENDS

// Converting String to Object STARTS
// var personString = '{"name":"Piyush"}';
// var person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);
// Converting String to Object ENDS

const fs = require('fs');

var originalNote = {
    title: 'Some Title',
    body: 'Some body'
};

var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');

var note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);