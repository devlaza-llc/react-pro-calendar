import { useAtom } from 'jotai';
import moment from 'moment';
import React, { useState } from 'react';

import { dateObjectAtom, globalClassAtom, primaryColorAtom, selectedDateAtom } from '../Calendar.jsx';
import currentStatus from '../utils/currentCalendarStatus.js';

const CalendarDate = () => {
  const [dateObject, setDateObject] = useAtom(dateObjectAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);
  const [glClass, setGlClass] = useAtom(globalClassAtom)

  const [primary, setPrimary] = useAtom(primaryColorAtom)

  const weekdayshort = moment.weekdaysShort();

  // First day of month
  const firstDayOfMonth = () => {
    let firstDay = moment(selectedDate).startOf('month').format('d');

    return Number(firstDay);
  };

  // change date
  const setDate = (date) => {
    let dateObj = Object.assign({}, selectedDate);
    dateObj = moment(selectedDate).set('date', date);

    setSelectedDate(dateObj);
    setDateObject(dateObj);
  };

  // empty days
  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    const rand = Math.floor(Math.random() * Math.floor(1000000000));
    blanks.push(
      <td className="empty" key={rand}>
        {''}
      </td>
    );
  }

  // days of month
  const daysInMonth = () => {
    return dateObject.daysInMonth();
  };

  let daysMonth = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    const rand = Math.floor(Math.random() * Math.floor(1000000000));
    let is_current_day = currentStatus(d, 'date', dateObject, selectedDate)
      ? 'text-white'
      : 'hover:bg-slate-200';

    daysMonth.push(
      <td key={d + rand}>
        <span
          className={`cursor-pointer py-[10px] w-[30px] block mx-auto text-center px-[6px] rounded-[8px] font-[400] uppercase text-[16px] leading-[22px] transition-all ${is_current_day}`}
          onClick={() => setDate(d)}
          style={currentStatus(d, 'date', dateObject, selectedDate) ? {backgroundColor: primary} : {}}
        >
          {d}
        </span>
      </td>
    );
  }

  var totalSlots = [...blanks, ...daysMonth];
  let rows = [];
  let cells = [];

  // total slots
  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  // Short name of week
  let _rendarShortName = (day, i) => {
    const rand = Math.floor(Math.random() * Math.floor(1000000000));
    return (
      <th
        key={i + rand}
        className="text-center font-[500] uppercase text-[16px] leading-[22px]"
      >
        {day}
      </th>
    );
  };

  let _rendarDays = (d, i) => {
    const rand = Math.floor(Math.random() * Math.floor(1000000000));
    return <tr key={i + rand}>{d}</tr>;
  };

  return (
    <div className={`${glClass && glClass+'-date'} h-full`} >
      <table className={`${glClass && glClass+'-date_table'} w-full h-full calendar-day`} >
        <thead>
          <tr>{weekdayshort.map(_rendarShortName)}</tr>
        </thead>

        <tbody>{rows.map(_rendarDays)}</tbody>
      </table>
    </div>
  );
};

export default CalendarDate;
