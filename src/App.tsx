import React from "react";
import { IonApp, IonHeader, IonRouterOutlet, IonContent } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Contexts */
import { AuthProvider } from "./utils/context";

/* Components */
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import HomePage from "./pages/HomePage";
import DashBoardPage from "./pages/DashBoardpage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <IonHeader>
          <Header />
        </IonHeader>
        <IonContent>
          <IonReactRouter>
            <IonRouterOutlet>
              <ProtectedRoute
                isExact={true}
                path="/home"
                Component={HomePage}
              />
              <Route exact path="/" component={DashBoardPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignUpPage} />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonContent>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
