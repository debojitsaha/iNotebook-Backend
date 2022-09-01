import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-4">
      <div className="card my-3">
        <div className="card-body bg-dark text-white">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text"> {note.description} </p>
          <span className="d-flex position-absolute top-0 end-0 badge rounded-pill bg-danger">
            {note.tag}
          </span>
          <i
            className="fa-solid fa-trash mx-2"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Note deleted successfully", "warning");
            }}
          ></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note);}}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
