import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { person, map, videocam } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/:tab(Characters)" component={Tab1} exact={true} />
          <Route path="/:tab(Locations)" component={Tab2}/>
          <Route path="/:tab(Episodes)" component={Tab3}/>
          <Route exact path="/">
            <Redirect to="/Characters" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="Characters" href="/Characters">
            <IonIcon icon={person} />
            <IonLabel>Characters</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Locations" href="/Locations">
            <IonIcon icon={map} />
            <IonLabel>Locations</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Episodes" href="/Episodes">
            <IonIcon icon={videocam} />
            <IonLabel>Episodes</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
