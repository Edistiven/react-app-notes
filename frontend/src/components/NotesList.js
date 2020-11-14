import axios from 'axios'
import React, { Component } from 'react'
import {format} from 'timeago.js'
import {Link} from 'react-router-dom'

export default class NotesList extends Component {

    state ={
        notes:[]
    }
    componentDidMount (){
     this.getNotes();
    }

    async getNotes(){
        const res =await axios.get('https://boiling-savannah-96662.herokuapp.com/api/notes')
        this.setState({
            notes:res.data
        })
    }

    deleteNote = async (id) =>{

        await axios.delete('https://boiling-savannah-96662.herokuapp.com/api/notes/' + id );
        this.getNotes();

    }


    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note =>(
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5> 
                                       <Link className="btn btn-primary" to={"/edit/" +note._id}>Editar</Link>
                                </div>
                                <div className="card-body">
                                    <p>{note.content}</p>
                                    <p><b>{note.author}</b></p>
                                    <p className="text-success"><b>{format(note.date)}</b></p>
                                </div>

                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={()=> this.deleteNote(note._id)}>Eliminar</button>
                                </div>

                            </div>

                        </div>

                            
                    ))
                }
            </div>
        )
    }
}
