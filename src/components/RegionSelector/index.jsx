/* eslint react/no-string-refs:0, array-callback-return:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import {
  Select,
} from '@alifd/next';

class RegionSelector extends Component {
  static displayName = 'RegionSelector';

  render() {

    return (
      <div>
        <Select
          dataSource={[
            { label: '省', value: 'location1' },
            { label: '区域二', value: 'location2' },
          ]}
        />
        &nbsp;&nbsp;
        <Select
          dataSource={[
            { label: '市', value: 'location1' },
            { label: '区域二', value: 'location2' },
          ]}
        />
        &nbsp;&nbsp;
        <Select
          dataSource={[
            { label: '区', value: 'location1' },
            { label: '区域二', value: 'location2' },
          ]}
        />
      </div>
    );
  }
}


export default RegionSelector;
