import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './contexts/auth-provider/auth-provider';
import { ChatProvider } from './contexts/chat-provider/chat-provider';
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
import ChatsContainer from './components/chat/chats-container/chats-container';
import { PostProvider } from './contexts/post-provider/post-provider';
import { GroupProvider } from './contexts/group-provider/group-provider';
import UserGroupList from './components/groups/user-group-list/user-group-list';
import GroupSearchList from './components/groups/group-search-list/group-search-list';
import { FeedProvider } from './contexts/feed-provider/feed-provider';
import Feed from './screens/feed/feed';

/* eslint-disable-next-line */
export function App() {
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      theme={{ colorScheme: 'dark' }}
    >
      <AuthProvider>
        <ChatProvider>
          <PostProvider>
            <GroupProvider>
              <BrowserRouter>
                <ApplicationFrame
                  header={<Header />}
                  navbar={<Navbar />}
                  sidebar={<Sidebar />}
                  footer={<Footer />}
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={<PrivateRoute hasToBeAuth={false} />}>
                      <Route path="/signin" element={<Signin />} />
                      <Route path="/signup" element={<Signup />} />
                    </Route>
                    <Route
                      element={
                        <PrivateRoute hasToBeAuth={true} redirectPath="/" />
                      }
                    >
                      <Route
                        path="/feed"
                        element={
                          <FeedProvider>
                            <Feed />
                          </FeedProvider>
                        }
                      />
                      <Route
                        path="/groups/feed"
                        element={
                          <FeedProvider>
                            <Feed groupFeed />
                          </FeedProvider>
                        }
                      />
                      <Route
                        path="/groups/search/:groupId"
                        element={<GroupSearchList />}
                      />
                      <Route path="/groups/:groupId" element={<Group />} />
                      <Route path="/groups/joins" element={<UserGroupList />} />

                      <Route path="/create" element={<Create />} />
                      <Route path="/create/:createId" element={<Create />} />
                      <Route path="/games" element={<Games />} />
                      <Route path="/games/:gameId" element={<Game />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route
                        path="/profile/:profileTab"
                        element={<Profile />}
                      />

                      <Route path="/settings" element={<Settings />} />
                    </Route>
                  </Routes>
                  <ChatsContainer />
                </ApplicationFrame>
              </BrowserRouter>
            </GroupProvider>
          </PostProvider>
        </ChatProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
