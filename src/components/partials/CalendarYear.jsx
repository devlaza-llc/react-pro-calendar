import moment from 'moment';
import React from 'react'
import { useAtom } from 'jotai';

import { dateObjectAtom, monthTableAtom, yearNavAtom, selectedDateAtom, yearsAtom, globalClassAtom, primaryColorAtom } from '../Calendar.jsx';
import currentStatus from '../utils/currentCalendarStatus.js';

const CalendarYear = () => {
    const [dateObject, setDateObject] = useAtom(dateObjectAtom)
    const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
    const [showMonthTable, setShowMonthTable] = useAtom(monthTableAtom)
    const [showYearNav, setShowYearNav] = useAtom(yearNavAtom)
    const [years, setYears] = useAtom(yearsAtom)
    const [glClass, setGlClass] = useAtom(globalClassAtom)

    const [primary, setPrimary] = useAtom(primaryColorAtom)

    const setYear = (year) => {
        let dateObj = Object.assign({}, selectedDate);
        dateObj = moment(selectedDate).set("year", year);

        setSelectedDate(dateObj)
        setShowMonthTable(!showMonthTable)
        setShowYearNav(!showYearNav)
    };

    const YearTable = () => {
        let months = [];
        let tenyear = years.slice(0, 12)

        tenyear.map(data => {
            const is_current_month = currentStatus(data, "year", dateObject, selectedDate) ? "bg-[#FF0032] hover:bg-[#FF0032] text-white" : "hover:bg-slate-200"

            months.push(
                <td
                    key={data}
                    className={`text-center font-[400] capitalize text-[16px] leading-[22px] px-[7px] py-[13px] rounded-[8px] cursor-pointer transition-all ${is_current_month}`}
                    onClick={() => setYear(data)}
                    style={currentStatus(data, "year", dateObject, selectedDate) ? {backgroundColor: primary} : {}}
                >
                    <span>{data}</span>
                </td>
            );
        });

        let rows = [];
        let cells = [];

        months.forEach((row, i) => {
            if (i % 3 !== 0 || i == 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
        });

        rows.push(cells);

        let yearlist = rows.map((d, i) => {
            return <tr key={i} >{d}</tr>;
        });

        return (
            <table className={`${glClass && glClass+'-year_table'} w-full h-full`} >
                <tbody>{yearlist}</tbody>
            </table>
        );
    };

    return (
      <div className={`${glClass && glClass+'-year'}`} >
        <YearTable />
      </div>  
    )
}

export default CalendarYear