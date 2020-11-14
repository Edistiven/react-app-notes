import axios from 'axios';
import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateNote extends Component {

    state ={
        users:[],
        userSelected:'',
        title:'',
        content:'',
        date: new Date(),
        editing:false,
        _id:''
    }

    async componentDidMount(){

        const res =await axios.get('https://boiling-savannah-96662.herokuapp.com/api/users');
        
        this.setState({
            users:res.data.map(user => user.username),
            userSelected: res.data[0].username
        })
        
        if(this.props.match.params.id){
            const res = await axios.get('https://boiling-savannah-96662.herokuapp.com/notes/' + this.props.match.params.id);
                this.setState({
                title:res.data.title,
                content:res.data.content,
                data:new Date(res.data.date),
                userSelected: res.data.author,
                editing:true,
                _id:this.props.match.params.id
            })
        }
    }

    onSubmit = async(e) =>{
        e.preventDefault();

        const newNote ={
            title:this.state.title,
            content:this.state.content,
            date:this.state.date,
            author:this.state.userSelected,
        };

        if (this.state.editing){
            await axios.put('https://boiling-savannah-96662.herokuapp.com/api/notes/'+ this.state._id, newNote);
        }else {
            await axios.post('https://boiling-savannah-96662.herokuapp.com/api/notes', newNote);
        }
        window.location.href = '/react-app-notes/';
        
    }

    onInputChange = e =>{
        
        
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onChangeDate =date =>{
        this.setState({date});
    }

    render() {
        return (
           <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Crear Nota</h4>

                    { /** SELECT USER */}
                    <div className="from-group">
                        <select 
                        className="form-control"
                        name="userSelected"
                        onChange={this.onInputChange}
                        value={this.state.userSelected}
                        >
                            {
                                this.state.users.map(user => 
                                <option key={user} value={user}>
                                    {user}
                                </option>)
                            }

                        </select>
                    </div>

                    <br/>
                    <div className="form-group">
                        <input type="text" 
                        className="form-control" 
                        placeholder="Titulo" 
                        name="title"
                        value={this.state.title} 
                        onChange={this.onInputChange}
                        required/>
                    </div> 

                    <div className="form-group">
                        <textarea  
                        name="content" 
                        className="form-control" 
                        placeholder="Contenido"
                        value={this.state.content} 
                        onChange={this.onInputChange}
                        required/>
                    </div>   

                     <div className="form-group">
                        <DatePicker 
                        className="form-control"
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                    </div>     


                    <form onSubmit={this.onSubmit}>

                        <br/>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>

                </div>
           </div>

        )
    }
}
