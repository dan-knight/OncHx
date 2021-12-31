import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import TreatmentInput from './components/TreatmentInput';
import EventLog from './components/EventLog';
import Login from './components/Login';

import { PatientEvent, StoredPatientEvent } from './types/Event';
import { defaultEvents } from './defaultData';
import { FormikValues } from 'formik';
import { GlobalContextProvider } from './contexts/GlobalContext';

export default function App() {
  const [user, setUser] = useState<string>('patient');
  const [events, setEvents] = useState<PatientEvent[]>(getEvents());

  function getEvents(): PatientEvent[] {
    const stored: string | null = localStorage.getItem('events');
    
    return stored !== null ? JSON.parse(stored).map((storedEvent: StoredPatientEvent): PatientEvent => (
      new PatientEvent(
        storedEvent.user,
        storedEvent.cancerType,
        storedEvent.date,
        storedEvent.treatmentType,
        storedEvent.details
      )
    )) : defaultEvents();
  };

  function login(values: FormikValues) {
    setUser(values.username);
  };

  function addEvent(values: FormikValues) {
    const event: PatientEvent = new PatientEvent(
      user,
      values.cancerType,
      new Date(values.year, values.month, values.day),
      values.treatmentType,
      values.details
    );

    const newEvents: PatientEvent[] = [event, ...events];
    localStorage.setItem('events', JSON.stringify(newEvents));
    setEvents(newEvents);
  };

  return (
    <GlobalContextProvider>
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
    </GlobalContextProvider>
  );
};