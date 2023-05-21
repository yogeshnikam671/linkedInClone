import { configureStore } from '@reduxjs/toolkit'
import './App.css'
import { reducer } from './store/reducers/reducer'
import { Provider } from 'react-redux'
import Home from './Home'

function App() {
  const store = configureStore({
   reducer: reducer
  });

  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );  
}

export default App
