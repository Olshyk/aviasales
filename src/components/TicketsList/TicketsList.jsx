import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux/es/exports';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../../action/action';
import { Ticket } from '../Ticket';
import { Warning } from '../Warning';
import { getData } from '../../service';

import classes from './TicketList.module.css';

const TicketsList = ({ stops, activeTab, isError, isLoading, tickets, ticketsAmmount, getMoreTickets }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const filtrationTabs = (arr) => {
    if (activeTab === 'cheapest') {
      return arr.sort((a, b) => a.price - b.price);
    }
    if (activeTab === 'fast') {
      return arr.sort(
        (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
      );
    }
    return arr;
  };

  const filtrationSidebar = (arr) => {
    if (stops.all) {
      return arr;
    }
    if (stops.without) {
      return arr.filter((item) => item.segments[0].stops.length === 0 || item.segments[1].stops.length === 0);
    }
    if (stops.one) {
      return arr.filter((item) => item.segments[0].stops.length === 1 || item.segments[1].stops.length === 1);
    }
    if (stops.two) {
      return arr.filter((item) => item.segments[0].stops.length === 2 || item.segments[1].stops.length === 2);
    }
    if (stops.three) {
      return arr.filter((item) => item.segments[0].stops.length === 3 || item.segments[1].stops.length === 3);
    }
    return [];
  };

  const filtered = filtrationTabs([...filtrationSidebar(tickets)]);

  return (
    <div>
      {filtered.slice(0, ticketsAmmount).map((ticket) => (
        <Ticket
          key={`${ticket.price}${ticket.carrier}${ticket.segments[0].duration}`}
          price={ticket.price}
          carrier={ticket.carrier}
          segments={ticket.segments}
        />
      ))}
      {filtered.length === 0 && !isError && !isLoading && <Warning />}
      {filtered.length > ticketsAmmount && (
        <button type="button" className={classes.button} onClick={() => getMoreTickets(ticketsAmmount)}>
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      )}
    </div>
  );
};

const mapStateToProps = ({ filterReducer, tabReducer, ticketReducer }) => {
  return {
    stops: filterReducer.stops,
    activeTab: tabReducer,
    isError: ticketReducer.isError,
    isLoading: ticketReducer.isLoading,
    tickets: ticketReducer.ticketsList,
    ticketsAmmount: ticketReducer.ticketsAmmount,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { getMoreTickets } = bindActionCreators(actions, dispatch);

  return {
    getMoreTickets: (num) => {
      const newAmmount = num + 5;
      getMoreTickets(newAmmount);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketsList);

TicketsList.defaultProps = {
  stops: {},
  activeTab: 'cheapest',
  isLoading: false,
  isError: false,
  tickets: [],
  ticketsAmmount: 10,
  getMoreTickets: () => {},
};

TicketsList.propTypes = {
  stops: PropTypes.instanceOf(Object),
  activeTab: PropTypes.string,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  tickets: PropTypes.instanceOf(Array),
  ticketsAmmount: PropTypes.number,
  getMoreTickets: PropTypes.func,
};
