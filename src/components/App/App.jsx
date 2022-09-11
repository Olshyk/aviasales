import React from 'react';
import { connect } from 'react-redux/es/exports';
import PropTypes from 'prop-types';

import { TicketsList } from '../TicketsList';
import { Sidebar } from '../Sidebar';
import { Tabs } from '../Tabs';
import { Spinner } from '../Spinner';
import { Error } from '../Error';
import logo from '../../assets/logo.svg';

import classes from './App.module.css';

function App({ isError, isLoading }) {
  const spinner = isLoading ? <Spinner /> : null;

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <img src={logo} className={classes.logo} alt="logo" />
      </header>
      <div className={classes.wrapper}>
        <Sidebar />
        <main className={classes.main}>
          <Tabs />
          {spinner}
          {isError && <Error />}
          {!isError && <TicketsList />}
        </main>
      </div>
    </div>
  );
}

const mapStateToProps = ({ ticketReducer }) => {
  return {
    isError: ticketReducer.isError,
    isLoading: ticketReducer.isLoading,
  };
};

export default connect(mapStateToProps)(App);

App.defaultProps = {
  isLoading: false,
  isError: false,
};

App.propTypes = {
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
};
