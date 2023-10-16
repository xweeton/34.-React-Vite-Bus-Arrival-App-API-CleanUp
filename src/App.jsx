import { useEffect, useState } from "react";

export default function App() {
  const [arrivalInfo, setArrivalInfo] = useState({ services: [], bus_stop_id: '' });
  // -----------same as above ^^^^------------
  // let arrivalInfo = {
  //   services: [],
  //   bus_stop_id: ''
  // }

  const option = [
    '18131',
    '18141',
  ]

  const onSelectChangeHandler = (e) => {
    setArrivalInfo({ ...arrivalInfo, bus_stop_id: e.target.value });
  } //const newObject = { ...existingObject, key: value };

  const fetchArrvalData = async () => {
    const response = await fetch(`https://sg-bus-arrival.sigma-schoolsc1.repl.co/?id=${arrivalInfo.bus_stop_id}`);
    const data = await response.json();
    setArrivalInfo(data);
  };

  useEffect(() => {
    fetchArrvalData();
    const timerId = setInterval(() => {
      console.log('fetching bus data')
      fetchArrvalData();
    }, 5000); //repeat fetch every 5sec

    //Cleanup function
    return () => clearInterval(timerId);
  }, [arrivalInfo.bus_stop_id]); //only run when bus_stop_id changes

  return (
    <div>
      <img src='./src/bus-stop.jpg' height='200px' />
      <h1>Bus Arrval Times - Bus Stop ID {arrivalInfo.bus_stop_id}</h1>
      <select onChange={onSelectChangeHandler}>
        <option>Select Bus Stop ID</option>
        {option.map((option, index) => {
          return (
            <option key={index}>{option}</option>
          )
        })}
      </select>
      <ul>
        {arrivalInfo.services.map((arrival, index) => (
          <li key={index}>
            Bus {arrival.bus_no} arriving in {arrival.next_bus_mins} minutes
          </li>
        ))}
      </ul>
    </div>
  );
}