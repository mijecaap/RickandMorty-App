import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from "@ionic/react";
import "./Tab2.css";
import axios from "axios";
import { Location } from "./../models/location.model";
import LocationContainer from "../components/LocationContainer";
import { addCircle } from "ionicons/icons";
import Tab2Lo from "./Tab2Lo";

const Tab2: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [nextstate, setNextstate] = useState(false);
  const [location, setLocation] = useState<Location>({});
  const [page, setPage] = useState(2);
  const [plusicon, setPlusicon] = useState(true);

  useEffect(() => {
    const consultarApi = async () => {
      const url = "https://rickandmortyapi.com/api/location";
      const resultado = await axios.get(url);
      if (resultado.data.info.next === null) {
        setPlusicon(false);
      }
      setLocations(resultado.data.results);
    };
    consultarApi();
  }, []);

  const consultarApifill = async () => {
    const url = `https://rickandmortyapi.com/api/location?page=${page}`;
    const resultado = await axios.get(url);
    setLocations((locations) => [...locations.concat(resultado.data.results)]);
    setPage(page + 1);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Locations</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {locations.map((location, index) => (
            <LocationContainer
              key={index}
              location={location}
              setNextstate={setNextstate}
              setLocation={setLocation}
            />
          ))}
        </IonList>
        {plusicon ? (
          <IonGrid>
            <IonRow>
              <IonCol></IonCol>
              <IonCol>
                <IonButton
                  expand="block"
                  fill="clear"
                  color="dark"
                  onClick={consultarApifill}
                >
                  <IonIcon size="large" icon={addCircle} />
                </IonButton>
              </IonCol>
              <IonCol></IonCol>
            </IonRow>
          </IonGrid>
        ) : null}
      </IonContent>
      {nextstate ? (
        <Tab2Lo location={location} setNextstate={setNextstate} />
      ) : null}
    </IonPage>
  );
};

export default Tab2;
