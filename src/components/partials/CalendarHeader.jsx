import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai';
import moment from 'moment';

import { calendarTableAtom, dateObjectAtom, globalClassAtom, monthTableAtom, primaryColorAtom, selectedDateAtom, yearsAtom } from '../Calendar.jsx';


export const monthsName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const CalendarHeader = () => {
    const [dateObject, setDateObject] = useAtom(dateObjectAtom)
    const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
    const [glClass, setGlClass] = useAtom(globalClassAtom)

    const [showMonthTable, setShowMonthTable] = useAtom(monthTableAtom)
    const [showCalendarTable, setShowCalendarTable] = useAtom(calendarTableAtom)

    const [years, setYears] = useAtom(yearsAtom)

    const [selectedMonth, setSelectedMonth] = useState(selectedDate.month())
    const [selectedYear, setSelectedYear] = useState(selectedDate.year())

    const onPrev = () => {
        if (showCalendarTable || showMonthTable) {
            let dateObj = Object.assign({}, dateObject);
            dateObj = moment(dateObject).subtract(1, showMonthTable ? "year" : "month");

            setDateObject(dateObj)
        } else {
            setYears(Array.from({ length: 12 }, (v, i) => (years[0]) - 12 + i + 1))
        }
    };

    const onNext = () => {
        if (showCalendarTable || showMonthTable) {
            let dateObj = Object.assign({}, dateObject);
            dateObj = moment(dateObject).add(1, showMonthTable ? "year" : "month");

            setDateObject(dateObj)
        } else {
            setYears(Array.from({ length: 12 }, (v, i) => years[years.length - 1] + 12 - i - 1).reverse())
        }
    };

    const DateHeaderMiddle = () => {
        function handleMonthTable() {
            setShowCalendarTable(false)
            setShowMonthTable(true)
        }

        return (
            <div className='w-full' onClick={() => handleMonthTable()} >
                <span>{monthsName[selectedMonth]}, {selectedYear}</span>
            </div>
        )
    }

    const MonthHeaderMiddle = () => {
        function handleYear() {
            setShowCalendarTable(false)
            setShowMonthTable(false)
        }

        return (
            <div className='w-full' onClick={() => handleYear()} >
                <span>{monthsName[selectedMonth]}, {selectedYear}</span>
            </div>
        )
    }

    const YearHeaderMiddle = () => {
        return (
            <div>
                <span>{selectedYear}</span>
            </div>
        )
    }

    useEffect(() => {
        setSelectedMonth(selectedDate.month())
        setSelectedYear(selectedDate.year())
    }, [selectedDate])

    useEffect(() => {
        setSelectedMonth(dateObject.month())
        setSelectedYear(dateObject.year())
    }, [dateObject])

    return (
        <div className={`${glClass && glClass+'-header'} flex mb-[20px]`} >
            <HeaderButton 
                customClass={`${glClass && glClass+'-header_left'}`} 
                onClick={() => onPrev()} 
            >
                <svg width="24px" height="24px" viewBox="0 0 24 24" id="_24x24_On_Light_Arrow-Left" data-name="24x24/On Light/Arrow-Left"  xmlns="http://www.w3.org/2000/svg">
                    <rect id="view-box" width="24" height="24" fill="none"/>
                    <path id="Shape" d="M.22,10.22A.75.75,0,0,0,1.28,11.28l5-5a.75.75,0,0,0,0-1.061l-5-5A.75.75,0,0,0,.22,1.28l4.47,4.47Z" transform="translate(14.75 17.75) rotate(180)" fill="#141124"/>
                </svg>
            </HeaderButton>

            <button className={`${glClass && glClass+'-header_middle'} flex items-center border-none outline-none justify-center rounded-[8px] w-[37px] h-[37px] flex-auto text-center cursor-pointer font-[500] leading-[21px] text-[18px] hover:bg-slate-200 transition-all`} >
                {showMonthTable && <MonthHeaderMiddle />}
                {showCalendarTable && <DateHeaderMiddle />}
                {!showCalendarTable && !showMonthTable ? <YearHeaderMiddle /> : ""}
            </button>

            <HeaderButton 
                customClass={`${glClass && glClass+'-header_right'}`} 
                onClick={() => onNext()} 
            >
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303C9.17678 18.2374 9.17678 17.7626 9.46967 17.4697L14.9393 12L9.46967 6.53033C9.17678 6.23744 9.17678 5.76256 9.46967 5.46967Z" fill="#030D45"/>
                </svg>
            </HeaderButton>
        </div>
    )
}

function HeaderButton({ children, onClick, customClass }) {
   const [hoverToggle, setHoverToggle] = useState(false) 

   const [primary, setPrimary] = useAtom(primaryColorAtom)

   return(
    <button 
        className={`${customClass} svg-hover flex border-none outline-none items-center justify-center rounded-[8px] w-[37px] h-[37px] cursor-pointer hover:bg-[#FF0032] transition-all`} 
        onClick={onClick}
        style={hoverToggle ? { background : primary } : {}}
        onMouseEnter={() => setHoverToggle(true)}
        onMouseLeave={() => setHoverToggle(false)}
    >
        {children}
    </button>
   )  
}

export default CalendarHeader
