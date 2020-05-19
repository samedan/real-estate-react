import React, { useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import axios from 'axios';

const { createContext, useContext } = React;

const MapContext = createContext(null);

export const MapProvider = ({ children, apiKey }) => {
  // CACHE
  const cache = useRef({});

  const removeMarkers = () => {
    removeElementsByClass('bwm-marker');
  };

  const removePopups = () => {
    removeElementsByClass('bwm-popup');
  };

  const removeElementsByClass = (className) => {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      const element = elements[0];
      element.parentNode.removeChild(element);
    }
  };

  const cacheLocation = (location, position) => {
    // normalize location
    // 'new york, times square 2' => 'newyork,timesquare2'
    const locationKey = normalizeLocation(location);
    console.log('Cache building in KEY: ' + locationKey);
    return (cache.current[locationKey] = position);
  };

  const getCacheLocation = (location) => {
    const locationKey = normalizeLocation(location);
    // console.log('Reading Cahce from : ' + cache.current[locationKey]);
    // console.log(cache.current[locationKey]);
    return cache.current[locationKey];
  };

  const normalizeLocation = (location) => {
    return location.replace(/\s/g, '').toLowerCase();
  };

  const initMap = () => {
    const map = tt.map({
      key: apiKey,
      container: 'bwm-map',
      style: 'tomtom://vector/1/basic-main',
      zoom: 15,
      scrollZoom: false,
    });

    // SHOW ZOOM
    // map.addControl(new tt.NavigationControl());
    return map;
  };

  const setCenter = (map, position) => {
    map.setCenter(new tt.LngLat(position.lon, position.lat));
  };

  const addMarker = (map, position) => {
    removeMarkers();
    // MARKER on Map
    const markerDiv = document.createElement('div');
    markerDiv.className = 'bwm-marker';

    new tt.Marker({
      element: markerDiv,
    })
      .setLngLat([position.lon, position.lat])
      .addTo(map);
  };

  //POPUP
  const addPopupMessage = (map, message) => {
    removePopups();
    new tt.Popup({
      className: 'bwm-popup',
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(new tt.LngLat(0, 0))
      .setHTML(`<p>${message}</p>`)
      .addTo(map);
  };

  const locationNotFound = () => Promise.reject('Location not found');

  // CACHE check first
  const getGeoPosition = (location) => {
    const cachedPosition = getCacheLocation(location);
    return cachedPosition
      ? Promise.resolve(cachedPosition)
      : requestGeoLocation(location);
  };

  const requestGeoLocation = (location) => {
    console.log('First time run');
    return (
      axios
        .get(
          `https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${apiKey}`
        )
        .then((res) => res.data)
        .then((tomRes) => {
          const results = tomRes.results;
          if (results && results.length > 0) {
            const { position } = results[0];
            // store this results in cache (memory variable)
            cacheLocation(location, position);
            return position;
          }
          return locationNotFound();
        })
        // Error => show PopUp message
        // .catch((error) => {
        //   addPopupMessage(map.current, error);
        // });
        .catch(() => locationNotFound())
    );
  };

  const mapApi = {
    initMap,
    getGeoPosition,
    setCenter,
    addMarker,
    addPopupMessage,
  };

  return <MapContext.Provider value={mapApi}>{children}</MapContext.Provider>;
};

export const useMap = () => {
  return useContext(MapContext);
};
