import { useState } from 'react';
import { FormikValues } from 'formik';
import { BrowserRouter as Switch, Route, Redirect, HashRouter, BrowserRouter } from 'react-router-dom';

import TreatmentInput from './components/TreatmentInput';
import EventLog from './components/EventLog/EventLog';
import PatientInfo from './components/PatientInfo/PatientInfo';
import Login from './components/Login';
import { GlobalValues } from './types/Global';
import { GlobalContextProvider, useGlobalContext } from './contexts/GlobalContext';

import DBPatientEvent from './types/PatientEvent/DBPatientEvent';
import LocalStoragePatientEvent from './types/PatientEvent/LocalStoragePatientEvent';
import LocalStoragePatientEventImporter from './types/PatientEvent/Importer/LocalStoragePatientEventImporter';
import { defaultEvents, defaultPatients } from './defaultData';

import { safelyParseInt } from './utility/parseNumber';

export default function App() {
  const { user, patients, login }: GlobalValues = useGlobalContext();
  const [events, setEvents] = useState<DBPatientEvent[]>(getEvents());

  function getEvents(): DBPatientEvent[] {
    const stored: string | null = localStorage.getItem('events');
    
    return stored !== null ? JSON.parse(stored).map((storedEvent: LocalStoragePatientEvent, eventIndex: number): DBPatientEvent => (
      LocalStoragePatientEventImporter.createDBEvent(storedEvent, eventIndex)
    )) : defaultEvents();
  };

  // function login(values: FormikValues) {
  //   setUser(values.username);
  // };

  function addEvent(values: FormikValues) {
    if (user === undefined) {
      throw new Error('Not patient logged in');
    }
    
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
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <Route path='/add'>
            {user !== undefined ? <TreatmentInput onSubmit={addEvent} /> : <Redirect to='/' />}
          </Route>
          <Route path='/user'>
            {user !== undefined ? <PatientInfo patient={patients[user]} /> : <Redirect to='/' />}
          </Route>
          <Route path='/' exact>
            {user !== undefined ? <EventLog allEvents={events} user={user} /> : <Login onLogin={login} />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};