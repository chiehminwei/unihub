import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'react-native-elements';
import { List } from 'react-native-paper';
import Collapsible from 'react-native-collapsible';


function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',  
]

function formatDateDisplay(date) {
  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);
  return {
    dateStr: `${weekday}, ${month} ${day}`,
    timeStr: `${hour}:${minute}`
  }
}

const CalendarTimePicker = (props) => {
  const { isCollapsed, setCollapse, setParentDate } = props; 
  const [showCalendar, setShowCalendar] = useState(true);
  const [date, setDate] = useState(new Date());
  const [dateString, setDateString] = useState(formatDate(date));

  const onDayPress = (day) => {
    const { dateString } = day;
    let date = new Date(dateString);
    date = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    setDate(date);
    setParentDate(date);
    setDateString(dateString);    
    setShowCalendar(false);
  }

  const onTimeChange = (event, date) => {
    setDate(date);
    setParentDate(date);
  };

  const toggleCalendar = () => {
    if (showCalendar) {
      setCollapse(!isCollapsed);
    }
    else {
      setShowCalendar(true);
      setCollapse(false);
    }
  }

  const { dateStr, timeStr } = formatDateDisplay(date);

  return (
    <View>
      <List.Item
        onPress={toggleCalendar}
        style={styles.listItem}
        left={props => <Text style={styles.dateStr}>{dateStr}</Text>}
        right={props => <Text style={styles.timeStr}>{timeStr}</Text>}
      />
      <Collapsible
        collapsed={isCollapsed || !showCalendar}
        duration={250}
        // enablePointerEvents
      >
        <Calendar
          current={date}
          style={styles.calendarContainer}
          minDate={new Date()}
          onDayPress={onDayPress}
          hideArrows={true}
          hideExtraDays={true}
          firstDay={7}
          hideDayNames={false}
          disableAllTouchEventsForDisabledDays={true}
          renderHeader={(date) => {/*Return JSX*/}}
          enableSwipeMonths={true}
          markedDates={{
            [dateString]: {
              selected: true,
            }
          }}
        />
      </Collapsible>
      <Collapsible
        collapsed={isCollapsed || showCalendar}
        duration={250}
        // enablePointerEvents
      >
        <DateTimePicker
          value={new Date(date)}
          mode="time"
          display="spinner"
          onChange={onTimeChange}
          minuteInterval={5}
          style={styles.timePicker}
        />
      </Collapsible>
    </View>
  )
}

export default CalendarTimePicker;

const styles = {
  listItem: {
    padding: 10,
    paddingLeft: 65,
    paddingRight: 15,
  },
  dateStr: {
    fontSize: 18,
  },
  timeStr: {
    fontSize: 18,
  },
  calendarContainer: {
    height: 310,
  },
  timePicker: {
    height: 250,
  },
}

// Specify theme properties to override specific styles for calendar parts. Default = {}
const theme = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  textSectionTitleDisabledColor: '#d9e1e8',
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  arrowColor: 'orange',
  disabledArrowColor: '#d9e1e8',
  monthTextColor: 'blue',
  indicatorColor: 'blue',
  textDayFontFamily: 'monospace',
  textMonthFontFamily: 'monospace',
  textDayHeaderFontFamily: 'monospace',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16
};