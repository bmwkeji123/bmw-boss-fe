import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Form,
  Upload,
} from '@alifd/next';

const { Row, Col } = Grid;

// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;


const formItemLayout = {
  labelCol: { xxs: "8", s: "4", l: "4", },
  wrapperCol: { s: "14", l: "12", }
};

export default class App extends Component {
  static displayName = 'OrderCreate';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        name: 'test',
        area: 'location1',
        time: [],
        delivery: false,
        type: ['地推活动'],
        resource: '线下场地免费',
        extra: '',
      },
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {

  };

  submit = (value, error) => {
    console.log('error', error, 'value', value);
    if (error) {
      // 处理表单报错
    }
    // 提交当前填写的数据
  };

  render() {
    return (
      <div className="create-order-form">
        <IceContainer title="录单" style={styles.container}>
          <Form
            value={this.state.value}
            onChange={this.onFormChange}
          >
              <h4>基本信息</h4>
              <FormItem {...formItemLayout} label="客户名称："
                required
                requiredMessage="客户名称必须填写"
              >
                <Input name="name" style={{ width: '100%' }} />
              </FormItem>

              <FormItem {...formItemLayout} label="还柜码头：">
                <Select
                  name="area"
                  dataSource={[
                    { label: '港口', value: 'location1' },
                    { label: '区域二', value: 'location2' },
                  ]}
                />
                &nbsp;&nbsp;
                <Select
                  name="area"
                  dataSource={[
                    { label: '码头', value: 'location1' },
                    { label: '区域二', value: 'location2' },
                  ]}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="装货地：">
                <Select
                  name="area"
                  dataSource={[
                    { label: '省', value: 'location1' },
                    { label: '区域二', value: 'location2' },
                  ]}
                />
                &nbsp;&nbsp;
                <Select
                  name="area"
                  dataSource={[
                    { label: '市', value: 'location1' },
                    { label: '区域二', value: 'location2' },
                  ]}
                />
                &nbsp;&nbsp;
                <Select
                  name="area"
                  dataSource={[
                    { label: '区', value: 'location1' },
                    { label: '区域二', value: 'location2' },
                  ]}
                />
                <br />
                <br />
                <Input name="name" style={{ width: '100%' }} placeholder="详情地址" />
              </FormItem>

              <FormItem {...formItemLayout} label="柜型：">
                <Select
                  name="area"
                  dataSource={[
                    { label: '请选择', value: 'location1' },
                    { label: '区域二', value: 'location2' },
                  ]}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="货物毛重(KG)：">
                <Input name="name" style={{ width: '100%' }} />
              </FormItem>

              <FormItem {...formItemLayout} label="预约到厂提柜时间：" >
                <RangePicker name="time" showTime />
              </FormItem>

              <FormItem {...formItemLayout} label="SO提单号：">
                <Input name="name" style={{ width: '100%' }} />
              </FormItem>

              <FormItem {...formItemLayout} label="做柜文件：">
                <Upload
                    action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
                    multiple
                >
                    <Button type="normal">上传</Button>
                </Upload>
              </FormItem>
              <h4>本单联系人</h4>
              <FormItem {...formItemLayout} label="本单联系人：" help="用于确定做柜以及后续沟通的联系人">
                <Input name="name" style={{ width: '100%' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="联系人电话：">
                <Input name="name" style={{ width: '100%' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="联系人邮箱：">
                <Input name="name" style={{ width: '100%' }} />
              </FormItem>

              <h4>装货联系人</h4>
              <FormItem {...formItemLayout} label="装货工厂名称：">
                <Input name="name" style={{ width: '100%' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="装货联系人：">
                <Input name="name" style={{ width: '100%' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="联系人电话：">
                <Input name="name" style={{ width: '100%' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="联系人邮箱：">
                <Input name="name" style={{ width: '100%' }} />
              </FormItem>

              <FormItem {...formItemLayout} label="备注：">
                <Input.TextArea name="extra" style={{ width: '100%' }} />
              </FormItem>

              <FormItem {...formItemLayout} label=" ">
                <Form.Submit type="primary" validate onClick={this.submit}>
                  提交
                </Form.Submit>
                <Form.Reset style={styles.resetBtn} onClick={this.reset}>
                  关闭
                </Form.Reset>
              </FormItem>
          </Form>
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
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
