import { atom, useAtom } from 'jotai'
import moment from 'moment'
import React, { useEffect } from 'react'
import './calendar.css'

import CalendarDate from './partials/CalendarDate.jsx'
import CalendarHeader from './partials/CalendarHeader.jsx'
import CalendarMonth from './partials/CalendarMonth.jsx'
import CalendarYear from './partials/CalendarYear.jsx'

export const yearNavAtom = atom(false)
export const dateObjectAtom = atom(moment())
export const monthTableAtom = atom(false)
export const selectedDateAtom = atom(moment())
export const calendarTableAtom = atom(true)
export const yearsAtom = atom(Array.from({ length: 12 }, (v, i) => moment().year() + 12 - i - 1).reverse())
export const globalClassAtom = atom('')
export const primaryColorAtom = atom('')

const Calendar = ({
    change = null,
    onChange = null,
    reset,
    setReset,
    parentClass = false,
    globalClass = false,
    primaryColor = '#C10206'
}) => {
    const [dateObject, setDateObject] = useAtom(dateObjectAtom)
    const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom)
    const [showMonthTable, setShowMonthTable] = useAtom(monthTableAtom)
    const [showCalendarTable, setShowCalendarTable] = useAtom(calendarTableAtom)
    const [glClass, setGlClass] = useAtom(globalClassAtom)

    const [primary, setPrimary] = useAtom(primaryColorAtom)

    const handleToday = () => {
        let dateObj = Object.assign({}, selectedDate);
        dateObj = moment(new Date());

        setSelectedDate(dateObj)
        setDateObject(dateObj)
        
        setShowMonthTable(false)
        setShowCalendarTable(true)
    }

    useEffect(() => {
      if(onChange !== null){
        onChange(selectedDate)
      }
    }, [selectedDate])

    useEffect(() => {
        if (change !== null) {
            let dateObj = Object.assign({}, selectedDate);
            dateObj = moment(change);

            setSelectedDate(dateObj)
        }
    }, [])

    useEffect(() => {
        if (reset) {
            handleToday()
            setReset(false)
        }
    }, [reset, setReset])

    useEffect(() => {
        setPrimary(primaryColor)
    }, [primaryColor])

    useEffect(() => {
        if(globalClass){
          setGlClass('_rec-custom')
        }else{
          setGlClass('')
        }  
    }, [globalClass])

    return (
        <div className={`${parentClass ? '_rec-parent-class' : ''} w-full`} >
            <CalendarHeader />

            <div className={`${glClass && glClass+'-body'} h-[290px]`} >
                {showCalendarTable && <CalendarDate />}
                {showMonthTable && <CalendarMonth />}
                {!showCalendarTable && !showMonthTable ? <CalendarYear /> : ""}
            </div>
        </div>
    )
}

export default Calendar