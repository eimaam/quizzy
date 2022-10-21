import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Quiz } from "./components/Quiz";
import { Login } from "./components/Login";
import { QuizProvider} from "./components/context/QuizContext";
import { Prep } from "./components/Prep";
import { DataProvider } from "./components/context/DataContext";

function App() {

  return (
    <Router>
      {/* <SideNav /> */}
      <DataProvider>
        <QuizProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/prep" element={<Prep />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
        </QuizProvider>
      </DataProvider>
    </Router>
  );
}

export default App;
