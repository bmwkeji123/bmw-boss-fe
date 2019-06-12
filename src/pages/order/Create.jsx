import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Select,
  DatePicker,
  Button,
  Dialog,
  Grid,
  Message
} from '@alifd/next';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import moment from 'moment';
import 'moment/locale/zh-cn';

import axios from '../../utils/http';

import RegionSelector from '../../components/RegionSelector';
import WharfSelector from '../../components/WharfSelector';

import './Create.scss';

moment.locale('zh-cn');

const { Row, Col } = Grid;


const formItemLayout = {
  labelCol: { xxs: '8', s: '4', l: '4' },
  wrapperCol: { s: '14', l: '12' },
};

export default class OrderCreate extends Component {
  static displayName = 'OrderCreate';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      fromData: {},
    };
    this.fileInput = React.createRef();
  }

  formChange = (value) => {
    this.setState({ fromData: value });
  };

  reset = () => {
    Dialog.confirm({
      title: '提示',
      content: '确认重置表单数据？',
      onOk: () => {
        this.setState({ fromData: {} });
        this.fileInput.current.value = '';
      },
      onCancel: () => {},
    });
  };

  submit = async () => {
    const { validateFields } = this.form;

    validateFields(async (errors, values) => {
      console.log(errors, values);
      console.log(this.fileInput);
      if (errors && errors.length) {
        return;
      }

      let param = new window.FormData();
      for (const key of Object.keys(values)) {
        if (key === 'loadingaddress') {
          param.append('loadingaddressprovince', values[key][0]);
          param.append('loadingaddresscity', values[key][1]);
          param.append('loadingaddressarea', values[key][2]);
        } else {
          param.append(key, values[key]);
        }
      }

      if (!this.fileInput.current.files.length) {
        Message.error('请上传做柜文件');
        return;
      }
      param.append('containerfile', this.fileInput.current.files[0]);

      const result = await axios.post('/api/ordercreator/', param, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(result);
    });
  };

  render() {
    return (
      <div className="create-order-form">{JSON.stringify(this.state, null, 2)}
        <IceContainer title="录单" style={styles.container}>
          <FormBinderWrapper
            value={this.state.fromData}
            onChange={this.formChange}
            ref={c => this.form = c}
          >
            <h4>基本信息</h4>
            <Row className="formItem">
              <Col {...formItemLayout.labelCol} className="formItemLabel">
                <label required>客户名称：</label>
              </Col>
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
                <FormBinder name="loadingaddress" required message="请输入正确的装货地" setFieldValue={(value) => { return value && value[2]; }}>
                  <RegionSelector />
                </FormBinder>
                <FormError className="formItemError" name="loadingaddress" />
              </Col>
            </Row>

            <Row className="formItem">
              <Col {...formItemLayout.labelCol} className="formItemLabel">
                <label />
              </Col>
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
                <FormBinder name="containertype" required message="请输入正确的柜型" >
                  <Select
                    dataSource={[
                      { label: '20GP', value: 1 },
                      { label: '30GP', value: 2 },
                      { label: '40GP', value: 3 },
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
                <FormBinder name="orderloadingtime" required message="请输入正确的预约到厂提柜时间：" getFieldValue={(value) => { return moment(value).format('YYYY-MM-DD HH:mm:ss'); }}>
                  <DatePicker showTime format="YYYY-MM-DD" />
                </FormBinder>
                <FormError className="formItemError" name="orderloadingtime" />
              </Col>
            </Row>

            <Row className="formItem">
              <Col {...formItemLayout.labelCol} className="formItemLabel">
                <label required>SO提单号：</label>
              </Col>
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
                <div style={{
                  lineHeight: '32px',
                  height: '32px',
                }}>
                  <input type="file" name="containerfile" ref={this.fileInput} />
                </div>
              </Col>
            </Row>


            <h4>本单联系人</h4>
            <Row className="formItem">
              <Col {...formItemLayout.labelCol} className="formItemLabel">
                <label required>本单联系人：</label>
              </Col>
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
                <FormBinder name="entcontactsemail" required type="email" message="请输入正确的联系人邮箱" >
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
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
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
                <FormBinder name="factorycontactsemail" required type="email" message="请输入正确的联系人邮箱" >
                  <Input style={{ width: '100%' }} />
                </FormBinder>
                <FormError className="formItemError" name="factorycontactsemail" />
              </Col>
            </Row>
            <Row className="formItem">
              <Col {...formItemLayout.labelCol} className="formItemLabel">
                <label required>备注：</label>
              </Col>
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
                <FormBinder name="orderremark">
                  <Input.TextArea
                    style={{ width: '100%' }}
                    maxLength={200}
                    rows={4}
                    hasLimitHint
                  />
                </FormBinder>
                <FormError className="formItemError" name="orderremark" />
              </Col>
            </Row>


            <Row className="formItem">
              <Col {...formItemLayout.labelCol} className="formItemLabel">
                <label />
              </Col>
              <Col {...formItemLayout.wrapperCol} className="formItemControl">
                <Button type="primary" validate onClick={this.submit}>
                  提交
                </Button>
                <Button style={styles.resetBtn} onClick={this.reset}>
                  重置
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
