import React from "react";
import { IonItem, IonLabel } from "@ionic/react";
import { Location } from "../models/location.model";

const LocationContainer: React.FC<{
  location: Location;
  setNextstate: Function;
  setLocation: Function;
}> = ({ location, setNextstate, setLocation }) => {
  return (
    <IonItem
        button
        onClick={(e) => {
            setNextstate(true);
            setLocation(location);
        }}
    >
      <IonLabel>
        <h2>{location.name}</h2>
        <p>
          Type: {location.type}, Dimension: {location.dimension}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default LocationContainer;
