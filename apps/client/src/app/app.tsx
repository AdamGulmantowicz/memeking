import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './contexts/auth-provider/auth-provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ApplicationFrame from './layouts/application-frame/application-frame';
import PrivateRoute from './containers/private-route/private-route';
import Header from './layouts/header/header';
import Navbar from './layouts/navbar/navbar';
import Sidebar from './layouts/sidebar/sidebar';
import Footer from './layouts/footer/footer';
import Home from './screens/home/home';
import Signin from './screens/signin/signin';
import Signup from './screens/signup/signup';
import Groups from './screens/groups/groups';
import Group from './screens/group/group';
import Creator from './screens/creator/creator';
import Create from './screens/create/create';
import Games from './screens/games/games';
import Game from './screens/game/game';
import Profile from './screens/profile/profile';
import Settings from './screens/settings/settings';
/* eslint-disable-next-line */
export function App() {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      theme={{ colorScheme: 'dark' }}
    >
      <AuthProvider>
        <BrowserRouter>
          <ApplicationFrame
            header={<Header />}
            navbar={<Navbar />}
            sidebar={<Sidebar />}
            footer={<Footer />}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                element={<PrivateRoute hasToBeAuth={false} isAuth={true} />}
              >
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route
                element={
                  <PrivateRoute
                    hasToBeAuth={true}
                    redirectPath="/"
                    isAuth={true}
                  />
                }
              >
                <Route path="/groups" element={<Groups />} />
                <Route path="/groups/:groupId" element={<Group />} />
                <Route path="/create" element={<Create />} />
                <Route path="/create/:createId" element={<Create />} />
                <Route path="/games" element={<Games />} />
                <Route path="/games/:gameId" element={<Game />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
          </ApplicationFrame>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
