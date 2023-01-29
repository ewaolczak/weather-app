import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = (props) => {
  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleCityChange = useCallback((city) => {
    console.log('city', city);
    setPending(true);
    setError(false);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0cf15504881daaadad4f6ea46cbe2bdb&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main
          };
          setPending(false);
          setWeather(weatherData);
          console.log(weatherData);
        });
      } else {
        setError(true);
      }
    });
  });

  return (
    <section>
      <PickCity action={handleCityChange}></PickCity>
      {weather && !pending && <WeatherSummary {...weather} />}
      {pending && !error &&<Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
