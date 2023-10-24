import { useEffect, useState } from 'react'
import { 
  AuthProvider,
  OreId,
  UserData,
} from 'oreid-js';
import LoginButton from 'oreid-login-button';
import {
  OreidProvider,
  useIsLoggedIn,
  useOreId,
  useUser
} from 'oreid-react';
import { WebPopup } from "oreid-webpopup";
import './App.css'

const REACT_APP_OREID_APP_ID = import.meta.env.VITE_OREID_APP_ID;
const APP_NETWORK = import.meta.env.VITE_OREID_NETWORK;

const oreId = new OreId({
  appName: "My Amazing App",
  appId: REACT_APP_OREID_APP_ID,
  plugins: { popup: WebPopup() }
});

const NotLoggedInView: React.FC = () => {
  const oreId = useOreId();
  const [error, setErrors] = useState<string>();

  const onError = (error: Error) => {
    console.log("Login failed", error.message);
    setErrors(error.message);
  };
  const onSuccess = ({ user }: { user: UserData }) => {
    console.log("Login successful")
  };

  const loginWithOreidPopup = (provider: AuthProvider) => {
    // Launch popup for user to login
    oreId.popup.auth({ provider }).then(onSuccess).catch(onError);
  };

  return (
    <>
      <h2>Log In to Begin</h2>
      <div>
        <LoginButton
          provider="facebook"
          onClick={() => loginWithOreidPopup(AuthProvider.Facebook)}
        />
        <LoginButton
          provider="google"
          onClick={() => loginWithOreidPopup(AuthProvider.Google)}
        />
        <LoginButton
          provider="email"
          onClick={() => loginWithOreidPopup(AuthProvider.Email)}
        />
      </div>
      {error && <div className="App-error">Error: {error}</div>}
    </>
  );
};

const LoggedInView: React.FC = () => {
  const oreId = useOreId();
  const user = useUser();

  const [error, setError] = useState<string>();
  const [signResults, setSignResults] = useState<any | undefined>();


  if (!user) return null;

  
  const { accountName, email, name, picture, username, chainAccounts } = user;
  const onError = (error: Error) => {
    console.log("Sign failed", error.message);
    setError(error.message);
  };
  const onSuccess = (results: any) => {
    console.log("Sign successful. Results:", results);
    setSignResults(results);
  };


/*   const handleCreateNewAccountWithPopup = ( chainNetwork, permission ) => {
    this.clearErrors();
    try {
      const response = await this.oreId.popup.newChainAccount({
        chainNetwork,
        accountType: 'native',
      })
      this.setState({ popupResponse: JSON.stringify(response) });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  } */

  return (
    <div style={{ marginTop: 10, marginLeft: 0 }}>
      <h2>User Info</h2>
      <h3>{name}</h3>
      <img
        src={picture.toString()}
        style={{ width: 100, height: 100, paddingBottom: 30 }}
        alt={"user"}
      />
      <br />
      OreId Account: {accountName}
      <br />
      Email: {email}
      <br /><br />
      <b>Chain Accounts</b>
      <br />
      {chainAccounts.map((ca) => (
        <div key={ca.chainNetwork}>
          <b>{ca.chainNetwork}</b>: {ca.chainAccount}
        </div>
      ))}
      <br />
      <button onClick={() => oreId.popup.sign({
          signString: {
            string: "Hello World!",
            chainNetwork: APP_NETWORK,
            chainAccount: user.chainAccounts.find((ca) => ca.chainNetwork === APP_NETWORK)?.chainAccount || '',
            account: user.accountName
          } 
        }).then(onSuccess).catch(onError)}>Sign Message</button>
      <br />
      <button onClick={() => oreId.logout()}>Logout</button>
    </div>
  );
};

const AppWithProvider: React.FC = () => {
  const isLoggedIn = useIsLoggedIn();

  return (
    <div className="App">
      <header className="App-header">
        <h1>OreId React Demo</h1>
        {isLoggedIn ? <LoggedInView /> : <NotLoggedInView />}
      </header>
    </div>
  );
};

export const App: React.FC = () => {
  const [oreidReady, setOreidReady] = useState(false);

  useEffect(() => {
    oreId.init().then(() => {
      setOreidReady(true);
    });
  });

  if (!oreidReady) {
    return <>Loading...</>
  }

  return (
    <>
      <div className="card">
        <OreidProvider oreId={oreId}>
          <AppWithProvider />
        </OreidProvider>
      </div>
      <p className="read-the-docs">
        Blockchain Identity for Everyone
      </p>
    </>
  );
};

export default App
