import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import Style from "./index.less";
import { signUp } from "../../../util/request";
import PropTypes from "prop-types";
// import { Redirect } from "react-router-dom";
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     redirectToReferrer:false
        // }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                signUp(values).then(()=>{
                    console.log("注册成功");
                    // window.location.href = "/";
                    // this.setState({
                    //     redirectToReferrer:true
                    // })
                })
            }
        });
    }
    render() {
        // const { redirectToReferrer } =this.state
        // if (redirectToReferrer) {
        //     return <Redirect to="/" />;
        // }
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={Style.SignInSignUp}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator("userName", {
                            rules: [{ required: true, message: "Please input your username!" }]
                        })(
                            <Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator("password", {
                            rules: [{ required: true, message: "Please input your Password!" }]
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator("remember", {
                            valuePropName: "checked",
                            initialValue: true
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                            Or <a href="">register now!</a>
                    </FormItem>
                </Form>
            </div>
        );
    }
}


NormalLoginForm.propTypes = {
    form: PropTypes.object.isRequired
    // goback: PropTypes.func.isRequired,
    // children: PropTypes.object.isRequired
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm