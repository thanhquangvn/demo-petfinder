import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Animals from '../Animals/Animals';
import Login from '../Authentication/Login';
import Logout from '../Authentication/Logout';
import { useState } from 'react';


function App() {

  const { token, setToken } = useToken();

  function useToken() {

    const [token, setToken] = useState(() => {
      const userToken = sessionStorage.getItem('access_token');
      return userToken;
    });

    const saveToken = (userToken) => {
      sessionStorage.setItem('access_token', userToken);
      setToken(userToken);
    };

    return {
      setToken: saveToken,
      token,
    };
  }

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/animals'>
            <Logout setToken={setToken} />
            <Animals accessToken={token} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
