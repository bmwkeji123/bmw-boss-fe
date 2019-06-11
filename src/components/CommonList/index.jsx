import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import { Table, Pagination, Button, Message } from '@alifd/next';
import SearchFilter from './SearchFilter';
import styles from './index.module.scss';

export default class CommonList extends Component {
  static displayName = 'CommonList';

  static propTypes = {
    enableFilter: PropTypes.bool,
    searchQueryHistory: PropTypes.object,
  };

  static defaultProps = {
    enableFilter: true,
    searchQueryHistory: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchQuery: cloneDeep(this.props.filterValue),
      pageIndex: 1,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.fetchDataSource();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('searchQueryHistory')) {
      this.setState(
        {
          searchQuery: Object.assign(
            cloneDeep(this.props.filterValue),
            nextProps.searchQueryHistory
          ),
          pageIndex: 1,
        },
        this.fetchDataSource
      );
    }
  }

  fetchDataSource = () => {
    this.setState({
      loading: true,
    });

    // 根据当前的 searchQuery/pageIndex 获取列表数据，使用 setTimeout 模拟异步请求
    // const { searchQuery, pageIndex } = this.state;

    setTimeout(() => {
      const dataSource = Array.from({ length: 20 }).map((item, index) => {
        return {
          id: `00000${index}`,
          name: '聘用合同',
          ourCompany: '杭州xxx科技有限公司',
          otherCompany: '上海xxx科技有限公司',
          amount: '999,999',
          currency: 'CNY',
          state: '签约中',
        };
      });

      this.setState({
        loading: false,
        dataSource,
      });
    }, 1 * 1000);
  };

  onSearchChange = (searchQuery) => {
    this.setState({
      searchQuery,
    });
  };

  onSearchSubmit = (searchQuery) => {
    this.setState(
      {
        searchQuery,
        pageIndex: 1,
      },
      this.fetchDataSource
    );
  };

  onSearchReset = () => {
    this.setState({
      searchQuery: cloneDeep(this.props.filterValue),
    });
  };

  onPaginationChange = (pageIndex) => {
    this.setState(
      {
        pageIndex,
      },
      this.fetchDataSource
    );
  };

  getTableColumns = () => {
    return this.props.colConfig;
  };

  render() {
    const { enableFilter } = this.props;
    const { searchQuery, dataSource, loading, pageIndex } = this.state;

    return (
      <div>
        {enableFilter && (
          <SearchFilter
            value={searchQuery}
            onChange={this.onSeacrhChange}
            onSubmit={this.onSearchSubmit}
            onReset={this.onSearchReset}
            filterConfig={this.props.filterConfig}
          />
        )}
        <Table dataSource={dataSource} hasBorder={false} loading={loading}>
          {this.getTableColumns().map((item) => {
            return (
              <Table.Column
                title={item.title}
                dataIndex={item.dataIndex}
                key={item.key}
                sortable={item.sortable || false}
                cell={item.cell}
                width={item.width || 'auto'}
                lock={item.lock}
              />
            );
          })}
        </Table>
        <Pagination
          className={styles.pagination}
          current={pageIndex}
          total={dataSource.length}
          totalRender={total => `共计 ${total} 条`}
          onChange={this.onPaginationChange}
        />
      </div>
    );
  }
}
