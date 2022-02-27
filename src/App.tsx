import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, HashRouter } from 'react-router-dom';

import TreatmentInput from './components/TreatmentInput';
import EventLog from './components/EventLog';
import Login from './components/Login';

import { defaultEvents } from './defaultData';
import { FormikValues } from 'formik';
import { GlobalContextProvider } from './contexts/GlobalContext';
import DBPatientEvent from './types/PatientEvent/DBPatientEvent';
import LocalStoragePatientEvent from './types/PatientEvent/LocalStoragePatientEvent';
import LocalStoragePatientEventImporter from './types/PatientEvent/Importer/LocalStoragePatientEventImporter';

export default function App() {
  const [user, setUser] = useState<string>('patient');
  const [events, setEvents] = useState<DBPatientEvent[]>(getEvents());

  function getEvents(): DBPatientEvent[] {
    const stored: string | null = localStorage.getItem('events');
    
    return stored !== null ? JSON.parse(stored).map((storedEvent: LocalStoragePatientEvent, eventIndex: number): DBPatientEvent => (
      LocalStoragePatientEventImporter.createDBEvent(storedEvent, eventIndex)
    )) : defaultEvents();
  };

  function login(values: FormikValues) {
    setUser(values.username);
  };

  // function addEvent(values: FormikValues) {
  //   const event: PatientEvent = new PatientEvent(
  //     user,
  //     values.cancerType,
  //     new Date(values.year, values.month, values.day),
  //     values.treatmentType,
  //     values.details
  //   );

  //   const newEvents: PatientEvent[] = [event, ...events];
  //   localStorage.setItem('events', JSON.stringify(newEvents));
  //   setEvents(newEvents);
  // };

  // TODO Reimplement with new classes
  function addEvent(values: FormikValues) {

  }

  return (
    <GlobalContextProvider>
      <HashRouter>
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
      </HashRouter>
    </GlobalContextProvider>
  );
};