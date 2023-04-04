import React, { Fragment, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import testData from "../../data/test";
import axios from "axios";

const VeerMap = () => {
  let boundaries = [
    [41.97724, -114.016217],
    [37.002624, -109.052507],
  ];

  const getAllAdventures = () => {
    axios
      .get("/adventures")
      .then((res) => {
        console.log(res);
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
        VEER Into An Adventure
      </h2>
      <MapContainer
        center={[40.767234, -111.890996]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ width: "100vw", height: "85vh", zIndex: "30" }}
        bounds={boundaries}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {testData.adventures.map((adventure) => (
          <Marker key={adventure.id} position={adventure.coordinates}>
            <Popup>
              <div>
                <h3 className="text-base">{adventure.name}</h3>
                <p>{adventure.cost}</p>
                <p>{adventure.desc}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Fragment>
  );
};

export default VeerMap;
