import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tab, Button, Balloon } from '@alifd/next';
import IceContainer from '@icedesign/container';
import CommonList from '../../../components/CommonList';
import { containerTypeData, wharfData } from '../../../common/enum';

@withRouter
export default class App extends Component {
  static displayName = 'OrderList';

  constructor(props) {
    super(props);

    this.baseConfig = {
      api: '/api/order_search/',
      reqCallback: (req) => {console.log(req);
        return req;
      },
      resCallback: (res) => {console.log(res);
        return res;
      },
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
        label: '做箱时间',
        component: 'RangePicker',
        componentProps: {
          placeholder: '请选择提单时间',
        },
        formBinderProps: {
          name: 'loadingTime',
        },
      },
    ];

    this.colConfig = [
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
        cell: this.renderContainerType,
      },
      {
        title: '柜号/封条号',
        dataIndex: 'containerno',
        key: 'containerno',
        width: 160,
        cell: this.renderContainerNo,
      },
      {
        title: '港口码头',
        dataIndex: 'wharf',
        key: 'wharf',
        width: 160,
        cell: this.renderContainerWharf,
      },
      {
        title: '装货地',
        dataIndex: 'loadingaddressinfo',
        key: 'loadingaddress',
        width: 100,
        cell: this.renderLoadingAddress,
      },
      {
        title: '做箱时间',
        dataIndex: 'orderloadingtime',
        key: 'orderloadingtime',
        width: 100,
      },
      {
        title: '客户名称',
        dataIndex: 'entname',
        key: 'entname',
        width: 100,
      },
      {
        title: '当前状态',
        dataIndex: 'orderstatus',
        key: 'orderstatus',
        cell: this.renderState,
        width: 100,
      },
      {
        title: '下单时间',
        dataIndex: 'orderloadingtime',
        key: 'orderloadingtime',
        width: 100,
      },
      {
        title: '车辆信息',
        dataIndex: 'drivername',
        key: 'drivername',
        cell: this.renderDriver,
        width: 100,
      },
      {
        title: '操作',
        dataIndex: 'oper',
        key: 'oper',
        cell: this.renderOper,
        width: 100,
      },
    ];

    console.log('a1');
  }

  componentDidMount() {
    console.log('a2');
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'a3');
  }

  renderContainerType = (value, index, record) => {
    return (
      <div>
        <span>{containerTypeData[record.containertype]}</span>
      </div>
    );
  };

  renderContainerWharf = (value, index, record) => {
    return (
      <div>
        <span>深圳-{wharfData[record.wharf]}</span>
      </div>
    );
  };

  renderLoadingAddress = (value, index, record) => {
    return (
      <div>
        <span>{record.loadingaddressprovince} {record.loadingaddresscity} {record.loadingaddressarea}</span>
      </div>
    );
  };

  renderContainerNo = (value, index, record) => {
    return (
      <div>
        <span>{record.containerno}{record.sealno ? `/${record.sealno}` : ``}</span>
      </div>
    );
  };

  renderState = (value, index, record) => {
    return (
      <div>
        <span>{record.orderstatus}</span>
      </div>
    );
  };

  renderDriver = (value, index, record) => {
    return (
      <div>
        <Balloon
          trigger={<Button text type="primary">查看</Button>}
          align="b"
          triggerType="click"
          style={{ width: 300 }}
        >
          <span>{record.drivername}<br />{record.driverphone}<br />{record.drivercarno}</span>
        </Balloon>
      </div>
    );
  };

  renderOper = (value, index, record) => {
    return (
      <div>
        <Button
          type="primary"
          text
          onClick={() => {
            this.props.history.push(`/order/detail?id=${record.orderid}`);
          }}
        >
          详情
        </Button>
      </div>
    );
  };

  render() {
    console.log('a4');
    const params = new URLSearchParams(this.props.location.search);

    const filterValue = {
      orderstatus: params.get('status'),
    };

    return (
      <IceContainer title="订单列表">
        <Tab style={{ marginBottom: '15px' }}
          onChange={(key) => {
            this.props.history.push(`/order/list?status=${key}`);
          }}
        >
          <Tab.Item title="待确认做柜" key="1"></Tab.Item>
          <Tab.Item title="待分配车辆" key="2"></Tab.Item>
          <Tab.Item title="待司机接单" key="3"></Tab.Item>
          <Tab.Item title="待提柜" key="4"></Tab.Item>
          <Tab.Item title="待到厂" key="5"></Tab.Item>
          <Tab.Item title="待离厂" key="6"></Tab.Item>
          <Tab.Item title="待还柜" key="7"></Tab.Item>
          <Tab.Item title="已完成" key="8"></Tab.Item>
          <Tab.Item title="已取消" key="9"></Tab.Item>
        </Tab>
        <CommonList filterConfig={this.filterConfig} filterValue={filterValue} colConfig={this.colConfig} baseConfig={this.baseConfig} />
      </IceContainer>
    );
  }
}
