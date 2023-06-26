import Entry from "./Entry";
import Webcam from "./Webcam";
import Scene from "./Scene";
import "./root.css";

const App = () => {
    window.onresize = () => {
        console.log(window.innerWidth)
    }
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