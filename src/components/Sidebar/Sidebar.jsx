import React from 'react';
import { connect } from 'react-redux/es/exports';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../../action/action';

import classes from './Sidebar.module.css';

const Sidebar = ({ stops, setFilter }) => {
  return (
    <aside className={classes.sidebar}>
      <h2 className={classes.title}>Количество пересадок</h2>
      <form className={classes.form}>
        <label className={classes.label}>
          <input
            value="all"
            type="checkBox"
            className={classes.input}
            onChange={(e) => setFilter(e.target.value, !stops.all)}
            checked={stops.all}
          />
          <span className={classes.checkbox} />
          Все
        </label>
        <label className={classes.label}>
          <input
            value="without"
            type="checkBox"
            className={classes.input}
            onChange={(e) => setFilter(e.target.value, !stops.without)}
            checked={stops.without}
          />
          <span className={classes.checkbox} />
          Без пересадок
        </label>
        <label className={classes.label}>
          <input
            value="one"
            type="checkBox"
            className={classes.input}
            onChange={(e) => setFilter(e.target.value, !stops.one)}
            checked={stops.one}
          />
          <span className={classes.checkbox} />1 пересадка
        </label>
        <label className={classes.label}>
          <input
            value="two"
            type="checkBox"
            className={classes.input}
            onChange={(e) => setFilter(e.target.value, !stops.two)}
            checked={stops.two}
          />
          <span className={classes.checkbox} />2 пересадки
        </label>
        <label className={classes.label}>
          <input
            value="three"
            type="checkBox"
            className={classes.input}
            onChange={(e) => setFilter(e.target.value, !stops.three)}
            checked={stops.three}
          />
          <span className={classes.checkbox} />3 пересадки
        </label>
      </form>
    </aside>
  );
};

const mapStateToProps = ({ filterReducer }) => {
  return { stops: filterReducer.stops };
};

const mapDispatchToProps = (dispatch) => {
  const { setFilter } = bindActionCreators(actions, dispatch);

  return {
    setFilter: (key, value) => setFilter(key, value),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

Sidebar.defaultProps = {
  stops: {},
  setFilter: () => {},
};

Sidebar.propTypes = {
  stops: PropTypes.instanceOf(Object),
  setFilter: PropTypes.func,
};
