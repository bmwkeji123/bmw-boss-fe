/* eslint react/no-string-refs:0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from '@alifd/next';
import FilterForm from './FilterForm';

export default class SearchFilter extends Component {
  static displayName = 'SearchFilter';

  static propTypes = {
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
    onSubmit: () => {},
    onReset: () => {},
  }

  state = {
    showAdvancedFields: false,
  };

  /**
   * 提交回调函数
   */
  handleSubmit = (errors, value) => {
    if (errors) {
      console.log({ errors });
      return;
    }

    this.props.onSubmit(value);
  };

  /**
   * 高级搜索
   */
  handleAdvancedSearch = () => {
    const { showAdvancedFields } = this.state;
    this.setState({
      showAdvancedFields: !showAdvancedFields,
    });
  };

  /**
   * 渲染按钮
   */
  renderExtraContent = () => {
    return (
      <Button text onClick={this.handleAdvancedSearch}>
        高级搜索{' '}
        <Icon
          size="xs"
          type={this.state.showAdvancedFields ? 'arrow-up' : 'arrow-down'}
        />
      </Button>
    );
  };

  render() {
    const { value, onChange, onReset, filterConfig } = this.props;
    const { showAdvancedFields } = this.state;

    const config = showAdvancedFields ? filterConfig : (
      filterConfig.filter(item => !item.advanced)
    );

    return (
      <FilterForm
        config={config}
        value={value}
        formChange={onChange}
        handleSubmit={this.handleSubmit}
        handleReset={onReset}
        extraContent={this.renderExtraContent()}
      />
    );
  }
}
