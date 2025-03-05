import { useEffect, useState } from 'react';
import { ExtensionSingle } from './components/extensionSingle/extensionSingle';
import './App.css';
import { fetchExtensions } from '../utils/extensionHelpers';
import { Header } from './components/branding/Header';

function App() {
  const [count, setCount] = useState(0);
  const [extensions, setExtensions] = useState<chrome.management.ExtensionInfo[]>([]);
  useEffect(() => {
    (async () => fetchExtensions().then((extensions) => setExtensions(extensions)))();
  }, []);


  return (
    <div>
      <Header />
      {extensions.map((extension) => <ExtensionSingle extension={extension} />)}
    </div>
  );
}

export default App;
