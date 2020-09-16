import React from 'react';
import { createBrowserHistory } from 'history';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import { connect } from 'react-redux';

import './App.css';

import PepoleList from './pages/PepoleList'
import PepoleEdit from './pages/PepoleEdit'
import PepoleDetails from './pages/PepoleDetails'

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <main className="main-layout">
          <button style={(history.location.pathname === "#/PepoleList") ? { visibility: "hidden" } : { visibility: "visible" }}><Link to='/PepoleList'>Go To Pepole List</Link></button>
          <Switch>
            <Route path="/PepoleList" exact component={PepoleList} />
            <Route path="/PepoleEdit" exact component={PepoleEdit} />
            <Route path="/PepoleEdit/:id" component={PepoleEdit} />
            <Route path="/Pepole/:id" component={PepoleDetails} />
          </Switch>
        </main>
      </Router>

    </div>
  );
}

// const mapStateToProps = (state) => {
//   // console.count('calls to state in App')
//   console.log('state in App:', state)
//   return {
//     // pepoles: state.app.pepoles,
//   }
// }
// const mapDispatchToProps = {
//   // loadPepoles
// }
// export default connect(mapStateToProps, mapDispatchToProps)(App)
export default App