import './App.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';

function App() {
  return (
 
    <Router>
      <Navigation/>

      <div className="container p-4">
      <Route path="/react-app-notes/" component={NotesList} exact/>
      <Route path="/react-app-notes/edit/:id" component={CreateNote}/>
      <Route path="/react-app-notes/create" component={CreateNote}/>
      <Route path="/react-app-notes/user" component={CreateUser}/>
      </div>

    
    </Router>
  
 
  );
}

export default App;
