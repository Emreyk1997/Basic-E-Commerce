import React from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import StaticBelowHeader from './components/StaticBelowHeader/StaticBelowHeader';
import Main from './components/Main/Main';
import { store } from './redux/reducers/index';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <StaticBelowHeader />
        <Main />
      </div>
    </Provider>
  );
}

export default App;
