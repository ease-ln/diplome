import React, { useState, memo } from "react";
import DatePicker from "react-datepicker";
import Calendar from "./calendar.png";
import cn from "./DateOptions.module.scss";
// import './Datepicker.scss'

const DateOption = ({ setOption, isRange, initialDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date(initialDate));
  const [endDate, setEndDate] = useState(new Date());
  const [activeBtn, setActiveBtn] = useState(30);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (end !== null) {
      if (isRange) {
        setOption(start, end);
      } else {
        setOption(start, new Date());
      }
    }
    setActiveBtn(0);
  };

  const oneDate = (date) => {
    setStartDate(date);
    setOption(date, new Date());
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleDate = (days) => {
    let date = new Date();
    date.setDate(date.getDate() - days);
    setStartDate(date);

    setOption(date, new Date());
    setActiveBtn(days);
  };

  if (!isRange) {
    return (
      <>
        <img
          src={Calendar}
          width={30}
          style={{
            width: "30x",
            height: "30x",
            alignSelf: "center",
            "pointer-events": "all",
          }}
          alt="calendar"
          onClick={handleClick}
        />
        {isOpen && (
          <div style={{ position: "absolute", top: "40px", right: "10px" }}>
            <DatePicker
              selected={startDate}
              onChange={(d) => oneDate(d)}
              maxDate={new Date()}
              inline
            />
          </div>
        )}
      </>
    );
  }

  return (
    <div className={cn.root}>
      <button
        className={cn[`options${activeBtn === 7 ? "--active" : ""}`]}
        onClick={() => handleDate(7)}
      >
        7 days
      </button>
      <button
        className={cn[`options${activeBtn === 30 ? "--active" : ""}`]}
        onClick={() => handleDate(30)}
      >
        30 days
      </button>
      <button
        className={cn[`options${activeBtn === 180 ? "--active" : ""}`]}
        onClick={() => handleDate(180)}
      >
        180 days
      </button>

      <img
        src={Calendar}
        width={30}
        style={{
          width: "30x",
          height: "30x",
          alignSelf: "center",
          "pointer-events": "all",
        }}
        alt="calendar"
        onClick={handleClick}
      />
      {isOpen && (
        <div style={{ position: "absolute", top: "40px", right: "10px" }}>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            maxDate={new Date()}
            selectsRange
            inline
          />
        </div>
      )}
    </div>
  );
};
export default memo(DateOption);
