import Header from "./components/Header/Header";
import Result from "./components/Result/Result";
import { MeiliSearchProvider } from "./context/MeiliSearchContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <div>
      <MeiliSearchProvider>
        <UserProvider>
          <Header />
          <Result />
        </UserProvider>
      </MeiliSearchProvider>
    </div>
  );
}

export default App;
