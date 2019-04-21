/* eslint react/no-string-refs:0, array-callback-return:0, react/forbid-prop-types:0 */
import React, { Component } from 'react';
import {
  Select,
} from '@alifd/next';

class WharfSelector extends Component {
  static displayName = 'WharfSelector';

  render() {

    return (
      <div>
        <Select
          dataSource={[
            { label: '港口', value: 'location1' },
            { label: '区域二', value: 'location2' },
          ]}
        />
        &nbsp;&nbsp;
        <Select
          dataSource={[
            { label: '码头', value: 'location1' },
            { label: '区域二', value: 'location2' },
          ]}
        />
      </div>
    );
  }
}


export default WharfSelector;
