import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];

  const [notes, setNotes] = useState(noteInitial);

  // Get all Notes
  const getNote = async () => {
    // API Calls
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      }      
    });
    const json= await response.json();
    //console.log(json)
    setNotes(json)
  }

  // Add Note
  const addNote = async (title, description, tag) => {
    // API Calls
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },body: JSON.stringify({title,description,tag}) 
    });
    const note= await response.json();
    setNotes(notes.concat(note));
  };

  // Delete Note
  const deleteNote = async(id) => {
    // API Calls
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      }
    });
    const json= await  response.json();
    console.log(json);

    //console.log("Delete note with id: " + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // API Calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },body: JSON.stringify({title,description,tag}) 
    });
    const json= await response.json();
    console.log(json);

    // Logic to edit in client
    let newNotes= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
