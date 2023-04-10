import React, { Fragment, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import testData from "../../data/test";
import axios from "axios";

const VeerMap = () => {
  const [allAdventures, setAllAdventures] = useState([])

  let boundaries = [
    [41.97724, -114.016217],
    [37.002624, -109.052507],
  ];

  let hotAirBalloon = new Icon({
    iconUrl: "/hot-air-balloon.png",
    iconSize: [25, 25],
  });

  const getAllAdventures = () => {
    axios
      .get("/adventures")
      .then((res) => {
        setAllAdventures(res.data.adventures)
        // console.log(allAdventures[0].latitude)
      })
      .catch((err) => {
        if (err.response) {
          // Client received error in response
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else if (err.request) {
          // Client never received response
          console.log(err.request);
        } else {
          // Anything else
          console.log("error", err.message);
        }
      });
  };

  // Runs once on first page load
  useEffect(() => {
    getAllAdventures();
  }, []);

  return (
    <Fragment>
      <h2 className="mt-16 mb-16 text-center text-2xl font-medium">
        Veer Into An Adventure
      </h2>
      <MapContainer
        center={[40.767234, -111.890996]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ width: "100vw", height: "82vh", zIndex: "30" }}
        bounds={boundaries}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {allAdventures.map((adventure) => (
          <Marker
            key={adventure.id}
            position={[adventure.latitude, adventure.longitude]}
            icon={hotAirBalloon}
          >
            <Popup>
              <div>
                <h3 className="text-base">{adventure.name}</h3>
                <p>{adventure.cost}</p>
                <p>{adventure.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Fragment>
  );
};

export default VeerMap;
