/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";

const ResDatePicker = ({ value, onDateChange, labelName }) => {
  const [selectedDate, setSelectedDate] = useState(value);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleDateChange = (date, value) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className="input-blocks">
      <label>{labelName}</label>
      <div className="input-groupicon calender-input">
        <DatePicker
          value={selectedDate}
          onChange={handleDateChange}
          className="filterdatepicker"
          placeholder="Choose Date"
        />
      </div>
    </div>
  );
};

export default ResDatePicker;

// Use in parent comp like this:
// const [dates, setDates] = useState({
//   startDate: null,
//   endDate: null,
// });

// const handleDateChange = (date, dateField) => {
//   setDates((prevDates) => ({
//     ...prevDates,
//     [dateField]: date,
//   }));
// };

// <ResDatePicker
// labelName="Start Date"
// value={dates.startDate}
// onDateChange={(date) =>
//   handleDateChange(date, "startDate")
// }
// />

// handleCheck use like this for submitting to api, ...formData use spread inorder to
// set it into the formData
// const handleCheck = () => {
//   console.log(dates.startDate.toISOString().substring(0, 10));
//   console.log(dates.endDate.toISOString().substring(0, 10));
// };
