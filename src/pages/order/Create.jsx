import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Select,
  DatePicker,
  Button,
  Upload,
  Grid,
} from '@alifd/next';
import { FormBinderWrapper, FormBinder, FormError, } from '@icedesign/form-binder';

import axios from '../../utils/http';

import RegionSelector from '../../components/RegionSelector';
import WharfSelector from '../../components/WharfSelector';

import './Create.scss';

const { RangePicker } = DatePicker;
const { Row, Col } = Grid;


const formItemLayout = {
  labelCol: { xxs: "8", s: "4", l: "4", },
  wrapperCol: { s: "14", l: "12", },
};

export default class OrderCreate extends Component {
  static displayName = 'OrderCreate';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        entname: '',

      },
    };
  }

  reset = () => {

  };

  submit = async () => {
    const { validateFields } = this.refs.form;

    validateFields(async (errors, values) => {
      console.log(errors, values);
      if (errors) {
        return;
      }

      const result = await axios.post('/api/ordercreator/', values);

      console.log(result);
    });

  };

  render() {

    return (
      <div className="create-order-form">
        <IceContainer title="录单" style={styles.container}>
          <FormBinderWrapper
            value={this.state.value}
            ref="form"
          >
              <h4>基本信息</h4>
              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>客户名称：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="entname" required message="请输入正确的客户名称" >
                    <Input style={{ width: '100%' }} />
                  </FormBinder>
                  <FormError className="formItemError" name="entname" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>还柜码头：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="wharf" required message="请输入正确的还柜码头" >
                    <WharfSelector />
                  </FormBinder>
                  <FormError className="formItemError" name="wharf" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>装货地：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="loadingaddress" required message="请输入正确的装货地" >
                    <RegionSelector />
                  </FormBinder>
                  <FormError className="formItemError" name="loadingaddress" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label></label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="loadingaddressinfo" required message="请输入正确的详细地址" >
                    <Input style={{ width: '100%' }} placeholder="详细地址" />
                  </FormBinder>
                  <FormError className="formItemError" name="loadingaddressinfo" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>柜型：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="containertype" required message="请输入正确的柜型" >
                    <Select
                      dataSource={[
                        { label: '20', value: 1 },
                        { label: '30', value: 2 },
                        { label: '40', value: 3 },
                      ]}
                    />
                  </FormBinder>
                  <FormError className="formItemError" name="containertype" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>货物毛重(KG)：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="goodsweight" required message="请输入正确的货物毛重(KG)" >
                    <Input style={{ width: '100%' }} />
                  </FormBinder>
                  <FormError className="formItemError" name="goodsweight" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>预约到厂提柜时间：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="orderloadingtime" required message="请输入正确的预约到厂提柜时间：" >
                    <RangePicker showTime />
                  </FormBinder>
                  <FormError className="formItemError" name="orderloadingtime" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>SO提单号：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="sono" required message="请输入正确的SO提单号" >
                    <Input style={{ width: '100%' }} />
                  </FormBinder>
                  <FormError className="formItemError" name="sono" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>做柜文件：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="containerfile" required message="请输入正确的做柜文件" >
                    <Upload
                        action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
                        multiple
                    >
                        <Button type="normal">上传</Button>
                    </Upload>
                  </FormBinder>
                  <FormError className="formItemError" name="containerfile" />
                </Col>
              </Row>


              <h4>本单联系人</h4>
              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>本单联系人：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="entcontacts" required message="请输入正确的本单联系人" >
                    <Input style={{ width: '100%' }} />
                  </FormBinder>
                  <div className="formItemHelp">用于确定做柜以及后续沟通的联系人</div>
                  <FormError className="formItemError" name="entcontacts" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>联系人电话：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="entcontactsphone" required message="请输入正确的联系人电话" >
                    <Input style={{ width: '100%' }} />
                  </FormBinder>
                  <FormError className="formItemError" name="entcontactsphone" />
                </Col>
              </Row>

              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>联系人邮箱：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="entcontactsemail" required message="请输入正确的联系人邮箱" >
                    <Input style={{ width: '100%' }} />
                  </FormBinder>
                  <FormError className="formItemError" name="entcontactsemail" />
                </Col>
              </Row>

              <h4>装货联系人</h4>
              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>装货工厂名称：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="factoryname" required message="请输入正确的装货工厂名称" >
                    <Input style={{ width: '100%' }} />
                  </FormBinder>
                  <FormError className="formItemError" name="factoryname" />
                </Col>
              </Row>
              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>装货联系人：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="factorycontacts" required message="请输入正确的装货联系人" >
                    <Input style={{ width: '100%' }} />
                  </FormBinder>
                  <FormError className="formItemError" name="factorycontacts" />
                </Col>
              </Row>
              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>联系人电话：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="factorycontactsphone" required message="请输入正确的联系人电话" >
                    <Input style={{ width: '100%' }} />
                  </FormBinder>
                  <FormError className="formItemError" name="factorycontactsphone" />
                </Col>
              </Row>
              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>联系人邮箱：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="factorycontactsemail" required message="请输入正确的联系人邮箱" >
                    <Input style={{ width: '100%' }} />
                  </FormBinder>
                  <FormError className="formItemError" name="factorycontactsemail" />
                </Col>
              </Row>
              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label required>备注：</label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <FormBinder name="orderremark">
                    <Input.TextArea style={{ width: '100%' }} />
                  </FormBinder>
                  <FormError className="formItemError" name="orderremark" />
                </Col>
              </Row>


              <Row className="formItem">
                <Col {...formItemLayout.labelCol} className="formItemLabel">
                  <label></label>
                </Col>
                <Col {...formItemLayout.wrapperCol}>
                  <Button type="primary" validate onClick={this.submit}>
                    提交
                  </Button>
                  <Button style={styles.resetBtn} onClick={this.reset}>
                    关闭
                  </Button>
                </Col>
              </Row>

          </FormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    marginBottom: '16px',
  },
  formItemLabel: {
    textAlign: 'right',
    paddingRight: '12px',
    color: '#666',
    lineHeight: '32px',
    display: 'inline-block',
    verticalAlign: 'top',
  },
  formItemError: {
    marginLeft: '10px',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
