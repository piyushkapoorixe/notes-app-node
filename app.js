console.log('Starting app.js...');

const fs = require('fs');
const os = require('os');

const _ = require('lodash');
const yargs = require('yargs'); //for easy parsing of command line arguments

const notes = require('./notes.js');

// Lodash work example STARTS

// console.log(_.isString(true));
// console.log(_.isString('Hello'));
// var filteredArray = _.uniq([2, 1, 2]);
// console.log(`Filtered Array from [2,1,2] is [${filteredArray}]`);

// Lodash work example ENDS


// os Module work STARTS

// var user = os.userInfo();
// fs.appendFile('greetings.txt', `Hello ${user.username}!`, function(err) {
//     if(err) {
//         console.log('Error in writing to file.');
//     }
// });   // Create a file and append text to it

// os Module work ENDS

//console.log(process.argv); // check it on console for arguments

const titleOptions = {
    describe: 'Title of note',
    demand: 'true',
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: 'true',
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all the notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('delete', 'Delete a note', {
        title: titleOptions
    })
    .help()
    .argv;

// var command = process.argv[2];   // same as below command and both works same and are correct
var command = argv._[0]; // as command(argument) in yargs is in _ at first place in the array
console.log(`Command passed : ${command}`); 

// console.log('Process argv : ', process.argv); //To log process.argv
// console.log('Yargs argv :', argv); // To log yargs array

if(command === 'add'){
    //console.log('adding new note');
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log(`Note added successfully.`);
        notes.logNoteDetails(note); // log the title and body of the note
    } else {
        console.log(`Note with the Title: ${note.title} already exists. Please enter a different title.`);
    }
} else if (command === 'list') {
    //console.log('Listing all notes');
    var allNotes = notes.listNote();
    console.log(`Listing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNoteDetails(note));
} else if (command === 'delete') {
    var noteRemoved = notes.deleteNote(argv.title); // note removed taking true or false from notes.js function deleteNode
    var message = noteRemoved ? 'Note removed successfully' : 'Note not found';
    console.log(message);
} else if (command === 'read') {
    var note = notes.readNote(argv.title);
    if (note) {
        console.log('Note was read successfully');
        notes.logNoteDetails(note); // Log the title and body of note
    } else {
        console.log('Note not found')
    }
} else {
    console.log('Command not found');
}