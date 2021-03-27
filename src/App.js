
import './App.css';
// Importing the Context Provider & Home Component
import MyContextProvider from './contexts/MyContext';
import Home from './components/Home'

function App() {
  return (
    <MyContextProvider>
        <Home/>
    </MyContextProvider>
  );
}

export default App;