import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import {Intro} from "./Components/Intro";
import {Profil} from "./Components/Profil";
import {Project} from "./Components/Project";
import {Skills} from "./Components/Skills";

function App() {
  return (
    <div className={`App dark:bg-dark-bg bg-white}`}>
      <ToastContainer />
      <Header />
      <Intro />
      <Skills />
      <Profil />
      <Project />
      <Footer />
    </div>
  )
}

export default App
