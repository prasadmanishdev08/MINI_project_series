import "./App.css";
import Counter from "./components/Counter";
import Clock from "./components/Clock";
import Timer from "./components/Timer";
import Alarm from "./components/Alarm";

function App() {
  return (
    <div className="app">
      <div className="cards-grid">
        <Counter />
        <Clock />
        <Timer />
        <Alarm />
      </div>
    </div>
  );
}

export default App;