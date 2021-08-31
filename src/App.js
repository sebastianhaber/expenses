import { Box } from "@chakra-ui/layout";
import Nav from "./components/nav/Nav";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomePage from "./views/HomePage";

function App() {
  return (
    <Box minH='200vh' pos='relative'>
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </Box>
  );
}

export default App;
