/**
 * Created by liulingli on 2017-09-17
 */

import React from 'react';
import {browserHistory, Router} from "react-router";
import {Form, Input, Button, Icon, Checkbox, message} from 'antd';

const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmLoading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.register = this.register.bind(this);
    }
    componentWillMount(){
        let loginData = localStorage.getItem('user');
        if(loginData){
            browserHistory.push('/');
        }
    }
    /**
     * @method 登录
     */
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({confirmLoading: true})
                fetch("/api/login", {method: "post", body: values}).then((response) => {
                    this.setState({confirmLoading: false})
                    if (response.success) {
                        message.success("登录成功！")
                        browserHistory.push('/');
                        localStorage.setItem('user', response.result)
                    } else {
                        const code = response.code; //错误码 code：-1 用户不存在， code = -2 密码错误
                        switch (code) {
                            case -1 :
                                message.error("用户不存在！");
                                break;
                            case -2 :
                                message.error("密码错误！");
                                break;
                            default :
                                break;
                        }

                    }
                })
            }
        });
    };

    /**
     * @method 进入注册界面
     */
    register() {

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {confirmLoading} = this.state;
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
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">忘记密码？</a>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                                loading={confirmLoading}
                            >登录</Button>
                            Or <a href="javascript:void(0);" onClick={this.register}>立即注册!</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

const Login = Form.create()(LoginForm);

export default Login;