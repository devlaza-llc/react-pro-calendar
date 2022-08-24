import { useAtom } from 'jotai';
import moment from 'moment';
import React, { useState } from 'react'

import { calendarTableAtom, dateObjectAtom, globalClassAtom, monthTableAtom, primaryColorAtom, selectedDateAtom } from '../Calendar.jsx';
import currentStatus from '../utils/currentCalendarStatus.js';

const CalendarMonth = () => {
    const [allmonths, setAllMonths] = useState(moment.months())
    const [dateObject, setDateObject] = useAtom(dateObjectAtom)
    const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
    const [showMonthTable, setShowMonthTable] = useAtom(monthTableAtom)
    const [showCalendarTable, setShowCalendarTable] = useAtom(calendarTableAtom)
    const [glClass, setGlClass] = useAtom(globalClassAtom)

    const [primary, setPrimary] = useAtom(primaryColorAtom)

    const setMonth = (month) => {
        let monthNo = allmonths.indexOf(month);
        let dateObj = Object.assign({}, selectedDate);
        dateObj = moment(selectedDate).set("month", monthNo);

        setSelectedDate(dateObj)
        setShowMonthTable(!showMonthTable)
        setShowCalendarTable(!showCalendarTable)
    };

    let MonthList = ({ data }) => {
        let months = [];
        data.map((data) => {
            const is_current_month = currentStatus(data, "month", dateObject, selectedDate) ? 
                `text-white` :
                "hover:bg-slate-200"

            months.push(
                <td
                    key={data}
                    className={`text-center font-[400] capitalize text-[16px] leading-[22px] px-[7px] py-[13px] rounded-[8px] cursor-pointer transition-all ${is_current_month}`}
                    onClick={() => setMonth(data)}
                    style={currentStatus(data, "month", dateObject, selectedDate) ? {backgroundColor: primary} : {}}
                >
                    <span>{data}</span>
                </td>
            );
        });

        let rows = [];
        let cells = [];

        months.forEach((row, i) => {
            if (i % 3 !== 0 || i == 0) { // except zero index 
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        });
        rows.push(cells);

        let monthlist = rows.map((d, i) => {
            return <tr key={i} >{d}</tr>;
        });

        return (
            <table className={`${glClass && glClass+'-month_table'} w-full h-full`} >
                <tbody>{monthlist}</tbody>
            </table>
        );
    }

    return (
       <div className={`${glClass && glClass+'-month'}`} >
          <MonthList data={moment.months()} />
       </div> 
    )
}

export default CalendarMonth