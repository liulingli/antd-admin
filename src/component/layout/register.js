/**
 * Created by liulingli on 2017-09-17
 */

import React from 'react';
import {browserHistory, Router} from "react-router";
import {Form, Input, Button, Icon, Checkbox} from 'antd';
import '../../fetch';

const FormItem = Form.Item;

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }

    /**
     * @method 注册
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch("/api/users", {method: "post", body: values}).then((response) => {
                    console.log(response)
                    if (response.success) {
                        browserHistory.push('/login');
                    }
                })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="login-content">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <div className="desc">
                            <img src="./static/logo.png"/>
                            <span>antd-admin后台管理系统</span>
                        </div>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{required: true, message: '请输入用户名!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: '请输入登录密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('repassword', {
                                rules: [{required: true, message: '请重新输入登录密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                                       placeholder="重新输入密码"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

const Register = Form.create()(RegisterForm);

export default Register;