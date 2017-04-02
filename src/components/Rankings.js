import React, { Component } from 'react';
import RankingTable from './RankingTable';
import Section from 'rebass/dist/Section';
import Select from 'rebass/dist/Select';

class Rankings extends Component {
  state = {
    sortBy: 'matches'
  };
  sortingOptions = [
    {
      children: 'Number of matches',
      value: 'matches'
    },
    {
      children: 'Wins',
      value: 'wins'
    },
    {
      children: 'Loss',
      value: 'loss'
    }
  ];

  handleSortingChange = ({ target: { value } }) => {
    this.setState(prevState => ({
      ...prevState,
      sortBy: value
    }));
  };

  render() {
    return (
      <Section mt={0} pt={3}>
        <Select
          label="Sort by"
          name="sort_by"
          value={this.state.sortBy}
          onChange={this.handleSortingChange}
          options={this.sortingOptions}
          rounded
        />
        <RankingTable
          rankingData={this.props.rankingData}
          defaultSort={this.state.sortBy}
        />
      </Section>
    );
  }
}

export default Rankings;
