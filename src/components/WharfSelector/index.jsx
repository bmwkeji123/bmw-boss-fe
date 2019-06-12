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
            { label: '深圳', value: 'shenzhen' },
          ]}
          value="shenzhen"
        />
        &nbsp;&nbsp;
        <Select
          dataSource={[
            { label: '盐田', value: 1 },
            { label: '妈湾', value: 2 },
            { label: '蛇口', value: 3 },
          ]}
          value={this.props.value}
          onChange={(value, actionType, item) => this.props.onChange(value)}
        />
      </div>
    );
  }
}


export default WharfSelector;
