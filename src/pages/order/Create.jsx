import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Button,
  Select,
  DatePicker,
  Field,
  Form,
  Upload,
} from '@alifd/next';

import RegionSelector from '../../components/RegionSelector';
import WharfSelector from '../../components/WharfSelector';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;


const formItemLayout = {
  labelCol: { xxs: "8", s: "4", l: "4", },
  wrapperCol: { s: "14", l: "12", }
};

export default class OrderCreate extends Component {
  static displayName = 'OrderCreate';

  static defaultProps = {};

  field = new Field(this);

  constructor(props) {
    super(props);

  }

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

    const init = this.field.init;

    return (
      <div className="create-order-form">
        <IceContainer title="录单" style={styles.container}>
          <Form
            field={this.field}
          >
              <h4>基本信息</h4>
              <FormItem {...formItemLayout} label="客户名称："
                required
                requiredMessage="客户名称必须填写"
              >
                <Input {...init('entname')} style={{ width: '100%' }} />
              </FormItem>

              <FormItem {...formItemLayout} label="还柜码头：">
                <WharfSelector {...init('wharf')} />
              </FormItem>

              <FormItem {...formItemLayout} label="装货地：">
                <RegionSelector {...init('loadingaddress')} />
              </FormItem>

              <FormItem {...formItemLayout} label=" ">
                <Input {...init('loadingaddressinfo')} style={{ width: '100%' }} placeholder="详细地址" />
              </FormItem>

              <FormItem {...formItemLayout} label="柜型：">
                <Select
                  {...init('containerno')}
                  dataSource={[
                    { label: '请选择', value: 'location1' },
                    { label: '区域二', value: 'location2' },
                  ]}
                />
              </FormItem>

              <FormItem {...formItemLayout} label="货物毛重(KG)：">
                <Input {...init('goodsweight')} style={{ width: '100%' }} />
              </FormItem>

              <FormItem {...formItemLayout} label="预约到厂提柜时间：" >
                <RangePicker {...init('goodsweight')} showTime />
              </FormItem>

              <FormItem {...formItemLayout} label="SO提单号：">
                <Input {...init('sono')} style={{ width: '100%' }} />
              </FormItem>

              <FormItem {...formItemLayout} label="做柜文件：">
                <Upload
                    {...init('containerfile')}
                    action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
                    multiple
                >
                    <Button type="normal">上传</Button>
                </Upload>
              </FormItem>
              <h4>本单联系人</h4>
              <FormItem {...formItemLayout} label="本单联系人：" help="用于确定做柜以及后续沟通的联系人">
                <Input {...init('goodsweight')} style={{ width: '100%' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="联系人电话：">
                <Input {...init('goodsweight')} style={{ width: '100%' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="联系人邮箱：">
                <Input {...init('goodsweight')} style={{ width: '100%' }} />
              </FormItem>

              <h4>装货联系人</h4>
              <FormItem {...formItemLayout} label="装货工厂名称：">
                <Input {...init('goodsweight')} style={{ width: '100%' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="装货联系人：">
                <Input {...init('goodsweight')} style={{ width: '100%' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="联系人电话：">
                <Input {...init('goodsweight')} style={{ width: '100%' }} />
              </FormItem>
              <FormItem {...formItemLayout} label="联系人邮箱：">
                <Input {...init('goodsweight')} style={{ width: '100%' }} />
              </FormItem>

              <FormItem {...formItemLayout} label="备注：">
                <Input.TextArea {...init('goodsweight')} style={{ width: '100%' }} />
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
