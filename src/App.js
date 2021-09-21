import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import TreatmentInput from './components/TreatmentInput';
import EventLog from './components/EventLog';
import Login from './components/Login';

export default function App() {
  const [user, setUser] = useState('');
  const [events, setEvents] = useState(getEvents());

  function getEvents() {
    const stored = JSON.parse(localStorage.getItem('events'));
    
    return stored ? stored.map(e => ({...e, date: new Date(e.date)})) : [
      {
        user: 'patient', cancerType: 'Prostate', date: new Date(2020, 4, 15), treatmentType: 'Chemotherapy',
        details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In turpis ante, elementum sed ligula ac, scelerisque cursus magna.'
      }
    ];
  };

  function login(event) {
    setUser(event.username);
  };

  function addEvent(e) {
    const newEvents = [
      {
        user: user,
        cancerType: e.cancerType, 
        date: new Date(e.year, e.month, e.day),
        treatmentType: e.treatmentType,
        details: e.details
      },
      ...events];

    localStorage.setItem('events', JSON.stringify(newEvents));
    setEvents(newEvents);
  };

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path='/add'>
            {user ? <TreatmentInput onSubmit={addEvent} /> : <Redirect to='/' />}
          </Route>
          <Route path='/' exact>
            {user ? <EventLog allEvents={events} user={user} /> : <Login onSubmit={login} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};