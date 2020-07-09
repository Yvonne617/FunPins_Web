import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactGlobe from 'react-globe';
import defaultMarkers from './marker';

function getTooltipContent(marker) {
  return `CITY: ${marker.city} (Value: ${marker.value})`;
}

const MapRender = () =>  {
//   const randomMarkers = defaultMarkers.map(marker => ({
//     ...marker,
//     value: Math.floor(Math.random() * 100),
//   }));
  const markers = defaultMarkers
//   setMarkers(randomMarkers)
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);
  function onClickMarker(marker, markerObject, event) {
    setEvent({
      type: 'CLICK',
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(getTooltipContent(marker));
  }
  function onDefocus(previousCoordinates, event) {
    setEvent({
      type: 'DEFOCUS',
      previousCoordinates,
      pointerEventPosition: { x: event.clientX, y: event.clientY },
    });
    setDetails(null);
  }
 
  return (
    <div style={{ width: '100vw', height: '40vh',  position: 'absolute', top:'100px'}}>
      <ReactGlobe
        markers={markers}
        markerOptions={{
          getTooltipContent,
        }}
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
      />
      {details && (
        <div className = 'infobox'>
          <p>{details}</p>
          <p>
            {/* EVENT: type={event.type}, position=
            {JSON.stringify(event.pointerEventPosition)}) */}
            地点：xxxx
            图片：xxx
            点评：xxxxxxxx
          </p>
        </div>
      )}

    </div>
  );
}
export default MapRender;