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

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const Calender = (props) => {
  const { eventlist, updateDate } = props;

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
