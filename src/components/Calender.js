/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import {arrayCheck} from "./CommonMethods"

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const Calender = (props) => {
  const { updateDate } = props;

  const eventObj = (ids, taskName, date, description) => {
    const id = ids;
    const title = taskName;
    const allDay = true;
    const start = new Date(date);
    const end = new Date(date);
    const desc = description;
    return { id, title, allDay, start, end, desc };
  };
  
  const taskListState = useSelector(state => state.task.taskList);
  
  const eventlist = arrayCheck(taskListState.tasks) ? taskListState.tasks.map((i) =>
    eventObj(i._id, i.taskName, i.taskDate, i.taskDesc)
  ) : [];

  const [events, setEvents] = useState([...eventlist]);

  const moveEvent = ({ event, start, end }) => {
    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };
    const nextEvents = [...events];
    updateDate(updatedEvent.id, updatedEvent.start);
    nextEvents.splice(idx, 1, updatedEvent);
    setEvents(nextEvents);
  };

  return (
    <div style={{ height: 600 }}>
      <DragAndDropCalendar
        selectable
        events={events}
        onEventDrop={moveEvent}
        defaultDate={new Date()}
        views={["month"]}
        localizer={localizer}
      />
    </div>
  );
};

export default Calender;
