import React from 'react'
import { storiesOf } from '@storybook/react'
import Calendar from '../components/Calendar.jsx'

const stories = storiesOf('Calendar test', module)

stories.add('Calendar', () => {
   return (<Calendar />)
})