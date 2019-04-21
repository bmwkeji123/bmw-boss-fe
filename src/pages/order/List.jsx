import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import ContractTable from '../../components/ContractTable';

export default class App extends Component {
  static displayName = 'OrderList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: {},
    };
  }

  onSearch = (searchQuery) => {
    this.setState({
      searchQuery,
    });
  }

  render() {
    const { searchQuery } = this.state;

    return (
      <IceContainer>
        <ContractTable searchQuery={searchQuery} />
      </IceContainer>
    );
  }
}
