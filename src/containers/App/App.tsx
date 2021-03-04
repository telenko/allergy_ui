import './App.css';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Localizer from '../Localizer/Localizer';
import Router from '../Router/Router';
import NotificationHandler from '../NotificationHandler';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Localizer>
        <Router/>
        <NotificationHandler/>
      </Localizer>
    </Provider>
  );
}

export default App;
