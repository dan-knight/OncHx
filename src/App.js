import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TreatmentInput from './components/TreatmentInput';
import EventLog from './components/EventLog';

export default function App() {
  const [events, setEvents] = useState([
    {
      cancerType: 'Prostate', date: new Date(2020, 4, 15), treatmentType: 'Chemotherapy',
      details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In turpis ante, elementum sed ligula ac, scelerisque cursus magna.'}
  ]);

  function addEvent(e) {
    setEvents([...events, e]);
  };

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path='/add'>
            <TreatmentInput onSubmit={addEvent} />
          </Route>
          <Route path='/patient'>
            <EventLog events={events} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
