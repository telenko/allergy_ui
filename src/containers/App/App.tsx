import './App.css';
import Localizer from '../Localizer/Localizer';
import Router from '../Router/Router';

function App() {
  return (
    <div className="App">
      <Localizer>
        <Router/>
      </Localizer>
    </div>
  );
}

export default App;
