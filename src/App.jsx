import Header from "./Header";
import Entry from "./Entry";
import Webcam from "./Webcam";

import About from "./About";
import Contact from "./Contact";

import "./root.css";

const App = () => {
    window.onresize = () => {
        console.log(window.innerWidth)
    }
    return (
        <>
            <Header />
            <Webcam />
            <Entry />
            <About />
            <Contact />
            <div id="paper-overlay" />
            <div id="noise-overlay" />
        </>
    )
}

export default App;