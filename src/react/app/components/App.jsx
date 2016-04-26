import AltContainer from 'alt-container';
import React from 'react';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

import Days from './Days.jsx';

import moment from 'moment';

import items from '../'

const getDays = (now, allItems) => {
  var month         = moment( now ).month();
  var calendarStart = moment( now ).startOf( 'month' ).startOf( 'week' );
  var calendarEnd   = moment( now ).endOf( 'month' ).endOf( 'week' );
  var monthStart    = moment( now ).startOf( 'month' ).toISOString();
  var monthEnd      = moment( now ).endOf( 'month' ).toISOString();

  // number of days between calendarStart and calendarEnd
  var tRange = calendarEnd.valueOf() - calendarStart.valueOf();
  var daysInView = Math.min( Math.floor( moment.duration( tRange ).asDays() ), 34);

  // Get an array of calendar items for this date range ( reduces
  // the number of items we will need to iterate over later )
  var monthItems = allItems.filter(item => {
    return moment( item.date ).isBetween( calendarStart, calendarEnd );
  } );

  // Stores each day's html content
  var days = [];

  // iterate 35 times ( 5 weeks of 7 days each )
  for (var i = 0; i <= daysInView; i++) {

    // Get a moment object for this day
    var dayMoment = moment( calendarStart ).add( i, 'days' );

    // Get an array of calendar items for this day
    var items = monthItems.filter(item => {
      return moment( item.date ).dayOfYear() == dayMoment.dayOfYear()
    } );

    days.push({
      moment: dayMoment,
      isInMonthRange: dayMoment.month() === month,
      items
    });
  }

  return days;
};

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
  constructor ( props ) {
    super( props );

    //this.state = LaneStore.getState();
    this.now = moment().startOf('month');
    this.state = {
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, props.items || [])
    };
  }

  componentDidMount() {
    //LaneStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    //LaneStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    //this.setState(state);
  }

  incrementMonth = () => {
    this.now.add(1, 'month');
    this.setState({
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, this.props.items || [])
    });

  }

  decrementMonth = () => {
    this.now.subtract(1, 'month');
    this.setState({
      monthName: this.now.format('MMMM'),
      yearName: this.now.format('YYYY'),
      days: getDays(this.now, this.props.items || [])
    });
  }

  render () {
    return (
      <div>
        <button className="add-Lane" onClick={this.decrementMonth}>-</button>
        <span>{this.state.monthName}, {this.state.yearName}</span>
        <button className="" onClick={this.incrementMonth}>+</button>
        <Days days={this.state.days}/>
      </div>
      );
  }

  addLane = () => {
    LaneActions.create({name: 'New Lane'});
  };
}