import React from "react";
import { IonItem, IonLabel, IonAvatar } from "@ionic/react";
import { Episode } from "../models/episode.model";

const EpisodeContainer: React.FC<{
  episode: Episode;
  setNextstate: Function;
  setEpisode: Function;
}> = ({ episode, setNextstate, setEpisode }) => {
  return (
    <IonItem
      button
      onClick={(e) => {
        setNextstate(true);
        setEpisode(episode);
      }}
    >
      <IonAvatar style={{ width: "16vw" }} slot="start">
        <h6 style={{ fontSize: 15, textAlign: "center", marginTop: 10 }}>
          {episode.episode}
        </h6>
      </IonAvatar>
      <IonLabel>
        <h2>{episode.name}</h2>
        <p>{episode.air_date}</p>
      </IonLabel>
    </IonItem>
  );
};

export default EpisodeContainer;
