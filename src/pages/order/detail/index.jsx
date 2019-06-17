import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Step, Loading, Table } from '@alifd/next';
import IceContainer from '@icedesign/container';
import axios from '../../../utils/http';

import './index.scss';

const { Row, Col } = Grid;

const formItemLayout = {
  labelCol: { xxs: '8', s: '4', l: '4' },
  wrapperCol: { s: '14', l: '12' },
};

@withRouter
export default class OrderDetail extends Component {
  static displayName = 'OrderDetail';

  constructor(props) {
    super(props);
    const params = new URLSearchParams(this.props.location.search);
    this.id = params.get('id');
    this.state = {
      loading: false,
      orderData: {},
    };
  }

  componentDidMount() {
    //this.getData();
  }

  async getData() {
    this.setState({
      loading: true,
    });
    const result = await axios.get('/api/order_search/', {
      params: {
        orderid: this.id
      }
    });

    this.setState({
      loading: false,
    });

    if (result.results.length) {
      this.setState({
        orderData: result.results[0],
      });
    }

  }

  render() {

    const { orderData } = this.state;

    return (
      <Loading visible={this.state.loading} style={{width: '100%'}}>
        <IceContainer title="订单详情">
          <Row gutter={20} wrap>
            <Col l="18">

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label>客户名称：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  {orderData.entname}
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label>还柜码头：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  {orderData.port}{orderData.wharf}
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label>装货地：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  b
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label />
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  c
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label>柜型：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  d
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label>货物毛重(KG)：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  e
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label>做箱时间：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  f
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label>SO提单号：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  g
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label>做柜文件：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  <div style={{
                    lineHeight: '32px',
                    height: '32px',
                  }}>
                    h
                  </div>
                </Col>
              </Row>



              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label>本单联系人：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  <Table dataSource={[]}>
                    <Table.Column title="本单联系人" dataIndex="id" />
                    <Table.Column title="联系人电话" dataIndex="name" />
                    <Table.Column title="联系人邮箱" dataIndex="time" />
                  </Table>
                </Col>
              </Row>


              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label>装货联系人：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  <Table dataSource={[]}>
                    <Table.Column title="装货工厂名称" dataIndex="id" />
                    <Table.Column title="装货联系人" dataIndex="id" />
                    <Table.Column title="联系人电话" dataIndex="name" />
                    <Table.Column title="联系人邮箱" dataIndex="time" />
                  </Table>
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label>备注：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol} className="formItemControl">
                  p
                </Col>
              </Row>


            </Col>
            <Col l="6">
              <Step current={1} direction="ver" shape="dot" animation={false}>
                <Step.Item title="提交订单" content="2019-03-01 00:00:00" />
                <Step.Item title="确定做柜" content="2019-03-01 00:00:00" />
                <Step.Item title="分配车辆" content="" />
                <Step.Item title="司机接单" content="" />
                <Step.Item title="提空柜" content="" />
                <Step.Item title="到厂" content="" />
                <Step.Item title="离厂" content="" />
                <Step.Item title="还柜" content="" />
              </Step>
            </Col>
          </Row>
        </IceContainer>
      </Loading>
    );
  }
}
