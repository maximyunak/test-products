import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { setupStore } from './store/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const store = setupStore();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
