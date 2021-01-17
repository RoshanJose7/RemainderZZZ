import React from "react";
import { IonIcon, IonText, IonTitle } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";

function Header() {
  return (
    <IonTitle>
      <IonText color="danger">
        <IonIcon icon={notificationsOutline} size="medium" />
        <h1 style={{ display: "inline-block", margin: "20px 10px" }}>
          RemainderZZZ
        </h1>
      </IonText>
    </IonTitle>
  );
}

export default Header;
