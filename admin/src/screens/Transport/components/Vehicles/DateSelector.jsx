import React, { useEffect, useState } from "react";
import DatePicker from "@amir04lm26/react-modern-calendar-date-picker";
import "../../utils/DatePicker.css";

import { Theme } from "../../utils/Theme";

const DateSelector = ({ selectedDay, setSelectedDay, palceholder }) => {
  const [value, setValue] = useState(null);
  const [dispalyValue, setDispalyValue] = useState(null);

  const handleDateChange = (date) => {
    setValue(date);
  };

  useEffect(() => {
    setSelectedDay(
      value
        ? `${value.year}-${
            value.month < 10
              ? "0" + value.month.toString()
              : value.month.toString()
          }-${
            value.day < 10 ? "0" + value.day.toString() : value.day.toString()
          }`
        : ""
    );
  }, [value]);

  useEffect(() => {
    setDispalyValue(selectedDay);
  }, [selectedDay]);

  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      placeholder={`${palceholder}*`}
      value={dispalyValue ? dispalyValue : ""}
      style={{
        width: "100%",
        paddingTop: "5px",
        paddingBottom: "5px",
        paddingLeft: "14px",
        paddingRight: "30px",
        fontSize: "17px",
        border: "2px solid #191920",
        borderRadius: "5px",
        outline: "none",
        backgroundColor: Theme.palette.background.primary,
        color: "white",
      }}
    />
  );

  return (
    <DatePicker
      value={value}
      onChange={(date) => handleDateChange(date)}
      renderInput={renderCustomInput}
      shouldHighlightWeekends
    />
  );
};

export default DateSelector;
