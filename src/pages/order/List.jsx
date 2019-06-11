import React, { Component } from 'react';
import { Button, Message } from '@alifd/next';
import IceContainer from '@icedesign/container';
import CommonList from '../../components/CommonList';

export default class App extends Component {
  static displayName = 'OrderList';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };

    this.filterValue = {
      sono: '',
      createTime: [],
      signTime: [],
    };

    this.filterConfig = [
      {
        label: '提单号',
        component: 'Input',
        componentProps: {
          placeholder: '请输入提单号',
        },
        formBinderProps: {
          name: 'sono',
          required: false,
          message: '请输入正确的提单号',
        },
      },
      {
        label: '下单日期',
        component: 'RangePicker',
        componentProps: {
          placeholder: '请选择下单日期',
        },
        formBinderProps: {
          name: 'createTime',
        },
      },
      {
        label: '提单时间',
        component: 'RangePicker',
        componentProps: {
          placeholder: '请选择提单时间',
        },
        formBinderProps: {
          name: 'signTime',
        },
      },
    ];
  }

  renderContainer = (value) => {
    return (
      <div>
        <span>{value}</span>
      </div>
    );
  };

  renderOper = () => {
    return (
      <div>
        <Button
          text
          onClick={() => {
            Message.success('查看详情');
          }}
        >
          详情
        </Button>
      </div>
    );
  };

  render() {

    const colConfig = [
      {
        title: 'SO号',
        dataIndex: 'sono',
        key: 'sono',
        width: 100,
      },
      {
        title: '柜型',
        dataIndex: 'containertype',
        key: 'containertype',
        width: 100,
      },
      {
        title: '柜号/封条号',
        dataIndex: 'containerno',
        key: 'containerno',
        width: 160,
        cell: this.renderContainer,
      },
      {
        title: '港口码头',
        dataIndex: 'otherCompany',
        key: 'otherCompany',
        width: 160,
      },
      {
        title: '装货地',
        dataIndex: 'amount',
        key: 'amount',
        width: 100,
      },
      {
        title: '做箱时间',
        dataIndex: 'currency',
        key: 'currency',
        width: 100,
      },
      {
        title: '客户名称',
        dataIndex: 'state',
        key: 'state',
        cell: this.renderState,
        width: 100,
      },
      {
        title: '当前状态',
        dataIndex: 'state',
        key: 'state',
        cell: this.renderState,
        width: 100,
      },
      {
        title: '下单时间',
        dataIndex: 'state',
        key: 'state',
        cell: this.renderState,
        width: 100,
      },
      {
        title: '车辆信息',
        dataIndex: 'state',
        key: 'state',
        cell: this.renderState,
        width: 100,
      },
      {
        title: '操作',
        dataIndex: 'detail',
        key: 'detail',
        cell: this.renderOper,
        width: 100,
      },
    ];

    return (
      <IceContainer title="订单列表">
        <CommonList filterConfig={this.filterConfig} filterValue={this.filterValue} colConfig={colConfig} />
      </IceContainer>
    );
  }
}
