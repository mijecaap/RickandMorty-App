import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonIcon,
  IonButton,
  IonItem,
  IonAvatar,
  IonLabel,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonGrid,
} from "@ionic/react";
import { Episode } from "../models/episode.model";
import { Character } from "../models/character.model";
import { arrowBack } from "ionicons/icons";
import axios from "axios";
import Tab1Ch from "./Tab1Ch";

const Tab3Ep: React.FC<{ episode: Episode; setNextstate: Function }> = ({
  episode,
  setNextstate,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextstate2, setNextstate2] = useState(false);
  const [character, setCharacter] = useState<Character>({});

  useEffect(() => {
    const consultarApi = async () => {
      episode.characters?.forEach(async (character) => {
        const url = character;
        const resultado = await axios.get(url);
        setCharacters((characters) => [...characters, resultado.data]);
      });
    };
    consultarApi();
  }, []);

  return (
    <>
      <IonHeader style={{ position: "absolute" }}>
        <IonToolbar>
          <IonButton
            slot="start"
            color="dark"
            style={{ marginLeft: 10 }}
            onClick={() => {
              setNextstate(false);
            }}
          >
            <IonIcon icon={arrowBack} />
          </IonButton>
          <IonTitle>Episode</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen style={{ position: "absolute", top: 56 }}>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>{episode.episode}</IonCardSubtitle>
            <IonCardTitle>{episode.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Air date: {episode.air_date}
            <br />
            Characters:
            <br />
            <IonList>
              {characters.map((char, index) => (
                <IonItem
                  key={index}
                  button
                  onClick={() => {
                    setNextstate2(true);
                    setCharacter(char);
                  }}
                >
                  <IonAvatar slot="start">
                    <img src={char.image} />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{char.name}</h2>
                    <p>{char.status}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
        <IonGrid style={{ height: 56 }}></IonGrid>
      </IonContent>
      {nextstate2 ? (
        <Tab1Ch character={character} setNextstate={setNextstate2} />
      ) : null}
    </>
  );
};

export default Tab3Ep;
