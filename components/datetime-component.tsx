'use client';

import { getDate } from "../lib/functions";

export default  function DateTimeComponent({datetime, showDate = false, showTime = false}: {datetime:string, showDate?:boolean, showTime?:boolean}){
    const date = new Date(datetime);
    const dateString = getDate(datetime);
    const timeString = date.toLocaleTimeString();
    return (<span>{showDate ? dateString : ""} {showTime ? timeString : ""}</span>);
}