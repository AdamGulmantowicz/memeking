import { MantineProvider } from '@mantine/core';
import MemeEditor from './components/meme-editor/meme-editor';
import EditorProvider from './contexts/editor-provider/editor-provider';
import { useState } from 'react';
import { EditorDocument } from './types';

const sampleMemes = [
  {
    url: 'https://images-ext-2.discordapp.net/external/Yq9r5xwqHCDH2DIqO6Q-OvfF8swFNw1O7iGtpDPmEuk/https/indianmemetemplates.com/wp-content/uploads/Quiz-Kid.jpg?width=594&height=562',
    id: 'hi-mom',
  },
  {
    url: 'https://memetemplate.in/uploads/1639171849.jpeg',
    id: 'hi-mom-2',
  },
  {
    url: 'https://i.kym-cdn.com/photos/images/original/001/167/523/ada.jpg',
    id: 'hi-mom-3',
  },
  {
    url: 'https://i.imgflip.com/1quxff.jpg',
    id: 'hi-mom-4',
  },
];

export function App() {
  const [doc, setDoc] = useState<EditorDocument>();
  return (
    <MantineProvider
      withCSSVariables
      withGlobalStyles
      theme={{ colorScheme: 'dark' }}
    >
      <EditorProvider
        images={sampleMemes}
        onDocumentSubmit={(data) => {
          console.log('Document submitted', data);
          setDoc(data);
        }}
      >
        <MemeEditor />
      </EditorProvider>
      {doc && <img src={doc.image} alt="Generated meme" />}
    </MantineProvider>
  );
}

export default App;
