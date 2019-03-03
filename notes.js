console.log('Starting notes.js file...');

const fs = require('fs');

var fetchNotes = () => {
    // Suppose notes-data.json file is not available so we are using try-catch block
    try {
        var noteString = fs.readFileSync('notes-data.json');
        fetchNotes = JSON.parse(noteString);
        return fetchNotes;
    } catch (e) {
        return [];
    }
};

var saveNote = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    // console.log('Adding new note', title, ' with body ', body);
    // console.log('Note', title, ' added successfully.')
    var notes = fetchNotes();

    var note = {
        title: title,    // using ES6 notation it can be written as -> title -> (just like written below for body)
        body
    };

    // For not allowing note with title which is already present

    // var duplicateNotes = notes.filter((note) => {
    //     return note.title === title;  
    //     // return true and it keeps the item in the array resulting that there are duplicates notes AND if false it returns false meaning that the duplicateNotes would be empty.
    // });
    // The above can also be written as follows using ES6 notation
    var duplicateNotes = notes.filter((note) => note.title === title);

    if(duplicateNotes.length === 0) {
        notes.push(note);
        saveNote(notes);
        return note;
    }
};

var listNote = () => {
    return fetchNotes();
};

var deleteNote = (title) => {
    // Fetching Notes
    var notes = fetchNotes();
    // filtering the notes with the title mentioned and not saving the note with the title mentioned
    var filteredNotes = notes.filter((note) => note.title !== title);
    // saving the new array of notes
    saveNote(filteredNotes); 
    // return true or false based on the lengths of both arrays (returns true if lengths are unequal meaning note was removed)
    return notes.length != filteredNotes.length; 
};

var readNote = (title) => {
    // Fetching Notes
    var notes = fetchNotes();
    // filtering the notes with the above title and keeping the note with the mentioned title
    var filteredNote = notes.filter((note) => note.title === title);
    // return the note that was filtered out
    return filteredNote[0];
};

var logNoteDetails = (note) => {
    console.log('\n');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);    
};

module.exports = {
    addNote,
    listNote,
    deleteNote,
    readNote,
    logNoteDetails
};