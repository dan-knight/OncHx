import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TreatmentInput from './components/TreatmentInput';

export default function App() {
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path='/add'>
            <TreatmentInput />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
