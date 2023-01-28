import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';

const WeatherBox = (props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCityChange = useCallback((city) => {
    console.log('city', city);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0cf15504881daaadad4f6ea46cbe2bdb&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };
      });
  });

  return (
    <section>
      <PickCity action={handleCityChange}></PickCity>
      <WeatherSummary />
      <Loader />
    </section>
  );
};

export default WeatherBox;
