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
import "./Tab1.css";
import axios from "axios";
import CharacterContainer from "../components/CharacterContainer";
import { addCircle } from "ionicons/icons";
import { Character } from "./../models/character.model";
import Tab1Ch from "./Tab1Ch";

const Tab1: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [nextstate, setNextstate] = useState(false);
  const [character, setCharacter] = useState<Character>({});
  const [page, setPage] = useState(2);
  const [plusicon, setPlusicon] = useState(true);

  useEffect(() => {
    const consultarApi = async () => {
      const url = "https://rickandmortyapi.com/api/character";
      const resultado = await axios.get(url);
      setCharacters(resultado.data.results);
    };
    consultarApi();
  }, []);

  const consultarApifill = async () => {
    const url = `https://rickandmortyapi.com/api/character?page=${page}`;
    const resultado = await axios.get(url);
    if (resultado.data.info.next === null) {
      setPlusicon(false);
    }
    setCharacters((characters) => [
      ...characters.concat(resultado.data.results),
    ]);
    setPage(page + 1);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {characters.map((character, index) => (
            <CharacterContainer
              key={index}
              character={character}
              setNextstate={setNextstate}
              setCharacter={setCharacter}
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
        <Tab1Ch character={character} setNextstate={setNextstate} />
      ) : null}
    </IonPage>
  );
};

export default Tab1;
