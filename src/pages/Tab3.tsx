import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
} from "@ionic/react";
import "./Tab3.css";
import axios from "axios";
import { Episode } from "./../models/episode.model";
import EpisodeContainer from "../components/EpisodeContainer";
import Tab3Ep from "./Tab3Ep";
import { addCircle } from "ionicons/icons";

const Tab3: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [nextstate, setNextstate] = useState(false);
  const [episode, setEpisode] = useState<Episode>({});
  const [page, setPage] = useState(2);
  const [plusicon, setPlusicon] = useState(true);

  useEffect(() => {
    const consultarApi = async () => {
      const url = "https://rickandmortyapi.com/api/episode";
      const resultado = await axios.get(url);
      setEpisodes(resultado.data.results);
    };
    consultarApi();
  }, []);

  const consultarApiFill = async () => {
    const url = `https://rickandmortyapi.com/api/episode?page=${page}`;
    const resultado = await axios.get(url);
    if(resultado.data.info.next === null){
      setPlusicon(false);
    }
    setEpisodes((episodes) => [...episodes.concat(resultado.data.results)]);
    setPage(page + 1);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Episodes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {episodes.map((episode, index) => (
            <EpisodeContainer
              key={index}
              episode={episode}
              setNextstate={setNextstate}
              setEpisode={setEpisode}
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
                  onClick={consultarApiFill}
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
        <Tab3Ep episode={episode} setNextstate={setNextstate} />
      ) : null}
    </IonPage>
  );
};

export default Tab3;
