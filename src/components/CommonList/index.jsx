import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import { Table, Pagination, Button, Message } from '@alifd/next';
import axios from '../../utils/http';
import SearchFilter from './SearchFilter';
import styles from './index.module.scss';

export default class CommonList extends Component {
  static displayName = 'CommonList';

  static propTypes = {
    enableFilter: PropTypes.bool,
  };

  static defaultProps = {
    enableFilter: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      searchQuery: cloneDeep(this.props.filterValue),
      page: 1,
      pageSize: 20,
      total: 0,
      list: [],
    };
    console.log(1);
  }

  componentDidMount() {
    this.fetchDataSource();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'nextProps');
  }

  fetchDataSource = async () => {
    this.setState({
      loading: true,
    });

    const { page } = this.state;
    const { baseConfig: { api, reqCallback, resCallback, } } = this.props;

    let { searchQuery } = this.state;

    if (reqCallback) {
      searchQuery = reqCallback(searchQuery);
    }

    let result = await axios.get(api, {
      params: searchQuery,
    });

    if (resCallback) {
      result = resCallback(result);
    }

    this.setState({
      loading: false,
    });

    if (result) {
      this.setState({
        total: result.count,
        list: result.results,
      });
    }

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
        page: 1,
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
        page: pageIndex,
      },
      this.fetchDataSource
    );
  };

  getTableColumns = () => {
    return this.props.colConfig;
  };

  render() {
    const { enableFilter } = this.props;
    const { searchQuery, list, loading, page, pageSize, total } = this.state;

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
        <Table dataSource={list} hasBorder={false} loading={loading}>
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
          current={page}
          pageSize={pageSize}
          total={total}
          totalRender={count => `共计 ${count} 条`}
          onChange={this.onPaginationChange}
        />
      </div>
    );
  }
}
