import React, { Component } from 'react';
import Container from 'rebass/dist/Container';
import ScoreForm from './components/ScoreForm';
import PageHeader from 'rebass/dist/PageHeader';

class App extends Component {
  handleSave = () => {};
  render() {
    return (
      <Container>
        <PageHeader
          pt={0}
          pb={0}
          mt={1}
          mb={2}
          heading={`Foosball Matches`}
          description={`So who won?`}
        />
        <ScoreForm onSave={this.handleSave} />
      </Container>
    );
  }
}

export default App;
