import React, { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';

const App: React.FC = () => {
  const webViewerDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/public',
        fullAPI: true,
        preloadWorker: 'all',
        initialDoc: './dummy.pdf',
      },
      webViewerDivRef.current!,
    ).then((instance) => {
      instance.UI.enableFeatures([instance.UI.Feature.ContentEdit]);
      instance.UI.addEventListener('documentLoaded', () => {
        instance.Core.documentViewer.addEventListener(
          'textContentUpdated',
          (a: any, ...rest: any[]) => {
            console.log(a, rest);
          },
        );
        instance.UI.addEventListener(
          'textContentUpdated',
          (a: any, ...rest: any[]) => {
            console.log(a, rest);
          },
        );
        instance.Core.annotationManager.addEventListener(
          'textContentUpdated',
          (a: any, ...rest: any[]) => {
            console.log(a, rest);
          },
        );

        const ce = instance.Core.ContentEdit as any;
        ce.addEventListener('textContentUpdated', (a: any, ...rest: any[]) => {
          console.log(a, rest);
        });
        instance.Core.documentViewer.addEventListener(
          'pagesUpdated',
          (changes) => {
            console.log('pagesUpdated', changes);
          },
        );
      });
    });
  }, []);

  return <div ref={webViewerDivRef} style={{ height: '100vh' }} />;
};

export default App;
