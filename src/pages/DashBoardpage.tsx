import React from "react";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import { Link } from "react-router-dom";

import forgot from "../img/forgot.jpeg";

function DashBoardpage() {
  return (
    <IonGrid className="ion-grid-padding ion-grid-width">
      <IonRow>
        <IonCol>
          <IonTitle>
            <IonText color="primary">
              <h1>Tired of forgetting your daily chores?</h1>
            </IonText>
            <IonText color="medium">
              <h4>
                Add it to RemainderZZZ, <br />
                and let it do the rest!!!
              </h4>
            </IonText>
          </IonTitle>
        </IonCol>
        <IonCol>
          <IonImg
            src={forgot}
            style={{
              minWidth: "300px",
              maxWidth: "450px",
              objectFit: "contain",
              margin: "0 auto",
            }}
          ></IonImg>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="3" offset="3">
          <IonButton color="danger">
            <Link to="/login">
              <IonText color="light">Login</IonText>
            </Link>
          </IonButton>
        </IonCol>
        <IonCol size="3">
          <IonButton color="primary">
            <Link to="/signup">
              <IonText color="light">SignUp</IonText>
            </Link>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default DashBoardpage;
