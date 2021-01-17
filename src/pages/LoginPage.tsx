import React, { useState, useRef } from "react";
import { logoGoogle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonTitle,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonAlert,
  IonLoading,
} from "@ionic/react";

import { useAuth } from "../utils/context";
import { signInWithGoogle } from "../utils/db";

function LoginPage() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const auth = useAuth();
  const history = useHistory();

  function handleLogin() {
    setLoading(true);
    if (emailRef.current?.value || passwordRef.current?.value) {
      auth?.login(
        emailRef.current?.value as string,
        passwordRef.current?.value as string
      );
      setLoading(false);
      history.push("/home");
    } else {
      setShowAlert(true);
    }
  }

  return (
    <IonGrid style={{ marginTop: "70px" }}>
      <IonRow>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Alert!"}
          message={"Enter Valid Input!"}
          buttons={[
            {
              text: "Ok",
              cssClass: "secondary",
              handler: () => {
                setShowAlert(false);
              },
            },
          ]}
        />
        <IonCol>
          <IonTitle>
            <h1>Login</h1>
            <IonLoading
              isOpen={loading}
              onDidDismiss={() => setLoading(false)}
              message={"Logging in..."}
            />
          </IonTitle>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Email ID</IonLabel>
              <IonInput ref={emailRef} type="text"></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput ref={passwordRef} type="text"></IonInput>
            </IonItem>
          </IonList>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="4" offset="3">
          <IonButton onClick={() => handleLogin()} color="dark">
            Login
          </IonButton>
        </IonCol>
        <IonCol>
          <IonButton
            onClick={async () => {
              setLoading(true);
              await signInWithGoogle();
              setLoading(false);
              history.push("/home");
            }}
            color="light"
          >
            <IonIcon icon={logoGoogle} color="primary" />
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default LoginPage;
