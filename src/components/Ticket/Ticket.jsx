import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import classes from './Ticket.module.css';

const Ticket = ({ price, carrier, segments }) => {
  function getTime(data, duration) {
    const start = format(new Date(data), 'HH:mm');
    const end = format(new Date(new Date(data).getTime() + duration * 60000), 'HH:mm');
    return `${start} - ${end}`;
  }

  const getStopName = (num) => {
    if (num === 0 || num > 4) {
      return 'ПРЕСАДОК';
    } else if (num === 1) {
      return 'ПЕРЕСАДКА';
    } else {
      return 'ПЕРЕСАДКИ';
    }
  };

  return (
    <section className={classes.ticket}>
      <header className={classes.header}>
        <span className={classes.price}>{String(price).replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} Р</span>
        <span className={classes.logo}>
          <img src={`//pics.avs.io/99/36/${carrier}.png`} alt="logo" />
        </span>
      </header>
      <section className={classes.info}>
        <div className={classes.details}>
          <p>
            {segments[0].origin} - {segments[0].destination}
          </p>
          <p>{getTime(segments[0].date, segments[0].duration)}</p>
        </div>
        <div className={classes.details}>
          <p>В пути</p>
          <p>{`${Math.trunc(segments[0].duration / 60)}ч ${segments[0].duration % 60}м`}</p>
        </div>
        <div className={classes.details}>
          <p>
            {segments[0].stops.length} {getStopName(segments[0].stops.length)}
          </p>
          <p>{segments[0].stops.join(', ')}</p>
        </div>
      </section>
      <section className={classes.info}>
        <div className={classes.details}>
          <p>
            {segments[1].origin} - {segments[1].destination}
          </p>
          <p>{getTime(segments[1].date, segments[1].duration)}</p>
        </div>
        <div className={classes.details}>
          <p>В пути</p>
          <p>{`${Math.trunc(segments[1].duration / 60)}ч ${segments[1].duration % 60}м`}</p>
        </div>
        <div className={classes.details}>
          <p>
            {segments[1].stops.length} {getStopName(segments[1].stops.length)}
          </p>
          <p>{segments[1].stops.join(', ')}</p>
        </div>
      </section>
    </section>
  );
};

export default Ticket;

Ticket.defaultProps = {
  price: 10000,
  carrier: '',
  segments: [],
};

Ticket.propTypes = {
  price: PropTypes.number,
  carrier: PropTypes.string,
  segments: PropTypes.instanceOf(Array),
};
