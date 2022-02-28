import { useState } from 'react';
import { FormikValues } from 'formik';
import { BrowserRouter as Switch, Route, Redirect, HashRouter } from 'react-router-dom';

import TreatmentInput from './components/TreatmentInput';
import EventLog from './components/EventLog';
import Login from './components/Login';
import { GlobalContextProvider } from './contexts/GlobalContext';

import DBPatientEvent from './types/PatientEvent/DBPatientEvent';
import LocalStoragePatientEvent from './types/PatientEvent/LocalStoragePatientEvent';
import LocalStoragePatientEventImporter from './types/PatientEvent/Importer/LocalStoragePatientEventImporter';
import { defaultEvents } from './defaultData';

import { safelyParseInt } from './utility/parseNumber';

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

  function addEvent(values: FormikValues) {
    const newEvents: DBPatientEvent[] = [
      ...events,
      new DBPatientEvent(
        events.length, 
        user, 
        values.details, 
        values.date, 
        safelyParseInt(values.treatmentType), 
        safelyParseInt(values.cancerType)
      )
    ];

    localStorage.setItem('events', JSON.stringify(newEvents));
    setEvents(newEvents);
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