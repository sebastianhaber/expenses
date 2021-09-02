import { Box } from "@chakra-ui/layout";
import Nav from "./components/nav/Nav";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from "./views/HomePage";
import { useEffect, useState } from "react";
import Dashboard from "./views/Dashboard";
import { createContext } from "react";

const CONTEXT_INIT = {
  user: {},
  colorScheme: 'cyan',
  setUser: null,
  token: null,
}
export const EXPENSES_CONTEXT = createContext(CONTEXT_INIT);

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  useEffect(() => {
    console.log(user);
  }, [user])

  return (
    <EXPENSES_CONTEXT.Provider value={{
      user: user,
      colorScheme: 'cyan',
      setUser: setUser,
      token
    }}>
      <Box pos='relative'>
        <Router>
          <Nav user={user} setUser={setUser} />
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/dashboard'>
              <Dashboard setUser={setUser} user={user} />
            </Route>
            <Route>
              404
            </Route>
          </Switch>
        </Router>
      </Box>
    </EXPENSES_CONTEXT.Provider>
  );
}

export default App;
