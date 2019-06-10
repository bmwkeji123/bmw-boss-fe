/* eslint react/no-string-refs:0, array-callback-return:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import {
  CascaderSelect,
} from '@alifd/next';

import regionsData from './china-regions.json';

class RegionSelector extends Component {
  static displayName = 'RegionSelector';

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
}

  handleChange(value, data, extra) {
    console.log(value, data, extra);
  }

  render() {

    return (
      <div>
        <CascaderSelect style={{ width: '100%' }} placeholder="请选择省市区" dataSource={regionsData} onChange={this.handleChange} />
      </div>
    );
  }
}


export default RegionSelector;
