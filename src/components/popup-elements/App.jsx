import React from 'react';
import DataProvider from './DataProvider.jsx';
import Page from './Page.jsx'

class App extends React.Component {
  render() {
    return (
      <DataProvider>
        <Page />
      </DataProvider>
    );
  }
}

export default App;
