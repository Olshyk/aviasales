import React from 'react';
import { connect } from 'react-redux/es/exports';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as actions from '../../action/action';

import classes from './Tabs.module.css';

const Tabs = ({ activeTab, changeTab }) => {
  return (
    <nav className={classes.tabs}>
      <div className={classes['tabs-list']}>
        <div
          id="cheapest"
          className={activeTab === 'cheapest' ? classes.active : ''}
          onClick={(e) => changeTab(e.target.id)}
          onKeyDown={(e) => changeTab(e.target.id)}
          tabIndex="0"
          role="button"
        >
          Самый дешевый
        </div>
        <div
          id="fast"
          className={activeTab === 'fast' ? classes.active : ''}
          onClick={(e) => changeTab(e.target.id)}
          onKeyDown={(e) => changeTab(e.target.id)}
          tabIndex="0"
          role="button"
        >
          Самый быстрый
        </div>
        <div>Оптимальный</div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ tabReducer }) => {
  return { activeTab: tabReducer };
};

const mapDispatchToProps = (dispatch) => {
  const { changeTab } = bindActionCreators(actions, dispatch);

  return {
    changeTab: (id) => changeTab(id),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);

Tabs.defaultProps = {
  activeTab: 'cheapest',
  changeTab: () => {},
};

Tabs.propTypes = {
  activeTab: PropTypes.string,
  changeTab: PropTypes.func,
};
