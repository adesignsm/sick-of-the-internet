import Entry from "./Entry";
import Webcam from "./Webcam";
import Scene from "./Scene";
import "./root.css";

const App = () => {
    return (
        <>
            <Webcam />
            <Entry />
            <div id="paper-overlay" />
            <div id="noise-overlay" />
        </>
    )
}

export default App;