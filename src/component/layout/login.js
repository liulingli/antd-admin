/**
 * Created by liulingli on 2017-09-17
 */

import React from 'react';
import {Form,Input,Button,Icon,Checkbox} from 'antd';
const FormItem = Form.Item;

 class LoginForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLogin : false
    }
  }

  /**
   * @method 登录
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.checkLogin(values);
      }
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="login">
        <div className="login-content">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="desc">
              <img src="./static/logo.png"/>
              <span>antd-admin后台管理系统</span>
            </div>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入登录密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住密码</Checkbox>
              )}
              <a className="login-form-forgot" href="">忘记密码？</a>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
              Or <a href="">立即注册!</a>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}
const Login = Form.create()(LoginForm);

export default Login;