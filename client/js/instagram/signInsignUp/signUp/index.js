import React from "react";
import { message,Form, Input, Tooltip, Icon, Select, Row, Col,Button} from "antd";
import PropTypes from "prop-types";
import Style from "./index.less";

const FormItem = Form.Item;
const Option = Select.Option;
import { signUp,signIn } from "../../../util/request";

class RegistrationForm extends React.Component {
  state = {
      confirmDirty: false
  };
  handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
              //   console.log(values)
              let { password,phone} = values,userName = values.nickname;
              let _user = {
                  userName:userName,
                  password:password,
                  phone:phone
              }
              signUp(_user).then((res)=>{
                  if(res.data.code === 200){
                      message.success("注册成功");
                      setTimeout(()=>{
                          signIn({userName:userName,password:password}).then((res)=>{
                              if(res.data.message === "Match"){
                                  window.location.href = "/";
                              }else{
                                  message.error("自动登录失败,请手动登录");
                              }
                          })
                      },100)  //数据库连续操作,貌似写入后直接读取会有问题;
                  }else{
                      message.error(res.data.message);
                  }
              })
          }else{
              message.error(err)
          }
      });
  }
  handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue("password")) {
          callback("Two passwords that you enter is inconsistent!");
      } else {
          callback();
      }
  }
  validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
          form.validateFields(["confirm"], { force: true });
      }
      callback();
  }
  render() {
      const { getFieldDecorator } = this.props.form;

      const formItemLayout = {
          labelCol: {
              xs: { span: 24 },
              sm: { span: 8 }
          },
          wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 }
          }
      };
      const tailFormItemLayout = {
          wrapperCol: {
              xs: {
                  span: 24,
                  offset: 0
              },
              sm: {
                  span: 16,
                  offset: 8
              }
          }
      };
      const prefixSelector = getFieldDecorator("prefix", {
          initialValue: "86"
      })(
          <Select style={{ width: 70 }}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
          </Select>
      );


      return (
          <div className={Style.SignUp}>
              <div className="u-title">
                  <h1 className="u-titleImg"></h1>
              </div>
              <Form onSubmit={this.handleSubmit}>
                  <FormItem
                      {...formItemLayout}
                      label={(
                          <span>
                            Nickname&nbsp;
                              <Tooltip title="What do you want others to call you?">
                                  <Icon type="question-circle-o" />
                              </Tooltip>
                          </span>
                      )}
                  >
                      {getFieldDecorator("nickname", {
                          rules: [{ required: true, message: "Please input your nickname!", whitespace: true }]
                      })(
                          <Input />
                      )}
                  </FormItem>
                  <FormItem
                      {...formItemLayout}
                      label="Password"
                  >
                      {getFieldDecorator("password", {
                          rules: [{
                              required: true, message: "Please input your password!"
                          }, {
                              validator: this.validateToNextPassword
                          }]
                      })(
                          <Input type="password"/>
                      )}
                  </FormItem>
                  <FormItem
                      {...formItemLayout}
                      label="Confirm Password:"
                      className="Form_ConfirmPassword"
                  >
                      {getFieldDecorator("confirm", {
                          rules: [{
                              required: true, message: "Please confirm your password!"
                          }, {
                              validator: this.compareToFirstPassword
                          }]
                      })(
                          <Input type="password" onBlur={this.handleConfirmBlur} />
                      )}
                  </FormItem>
                  <FormItem
                      {...formItemLayout}
                      label="Phone Number"
                  >
                      {getFieldDecorator("phone", {
                          rules: [{ required: true, message: "Please input your phone number!" }]
                      })(
                          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
                      )}
                  </FormItem>
                  <FormItem
                      {...formItemLayout}
                      label="Captcha"
                      extra="注册成功后将为您自动登录"
                  >
                      <Row gutter={8}>
                          <Col span={12}>
                              {getFieldDecorator("captcha", {
                                  rules: [{ required: true, message: "Please input the captcha you got!" }]
                              })(
                                  <Input />
                              )}
                          </Col>
                          <Col span={12}>
                              <Button>Get captcha</Button>
                          </Col>
                      </Row>
                  </FormItem>
                  <FormItem {...tailFormItemLayout} className="Form_Register">
                      <Button type="primary" htmlType="submit">Register</Button>
                  </FormItem>
              </Form>
              Or <span className="ToSignIn"  onClick={this.props.ToSignIn}>Log in</span>
          </div>
      );
  }
}

RegistrationForm.propTypes = {
    form: PropTypes.object.isRequired,
    ToSignIn: PropTypes.func.isRequired
    // goback: PropTypes.func.isRequired,
    // children: PropTypes.object.isRequired
}


const WrappedRegistrationForm = Form.create()(RegistrationForm);


export default WrappedRegistrationForm