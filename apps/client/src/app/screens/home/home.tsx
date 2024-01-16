import { useAuthContext } from '../../contexts/auth-provider/auth-provider';
import { FeedProvider } from '../../contexts/feed-provider/feed-provider';
import Feed from '../feed/feed';
import Signin from '../signin/signin';

export function Home() {
  const { isLoggedIn } = useAuthContext();
  return isLoggedIn ? (
    <FeedProvider>
      <Feed groupFeed={false} />
    </FeedProvider>
  ) : (
    <Signin />
  );
}

export default Home;
