import StoreContextProvider from './state/StoreState';
import { ErrorBoundary } from './ErrorBoundary';
import Store from './components/Store/Store'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function  App() {

  return (
    <ErrorBoundary>
      <div className="App">
      <I18nextProvider i18n={i18n}>
        <StoreContextProvider>
        <Store />
        </StoreContextProvider>
        </I18nextProvider>
      </div>
      </ErrorBoundary>
  );
}


export default App;
