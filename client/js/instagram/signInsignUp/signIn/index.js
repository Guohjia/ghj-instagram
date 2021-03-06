import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox,message } from "antd";
import Style from "./index.less";
import { signIn } from "../../../util/request";
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
                // console.log("Received values of form: ", values);
                signIn(values).then((res)=>{
                    if(res.data.message === "Match"){
                        window.location.href = "/";
                    }else if(res.data.message === "UNEXIT"){
                        message.error("用户不存在,先注册")
                    }else{
                        message.error("密码不对")
                    }
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
            <div className={Style.SignIn}>
                <div className="u-title">
                    <h1 className="u-titleImg"></h1>
                </div>
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
                            Or <span onClick={this.props.ToSignUp} className="ToSignUp">Register now!</span>
                    </FormItem>
                </Form>
            </div>
        );
    }
}


NormalLoginForm.propTypes = {
    form: PropTypes.object.isRequired,
    ToSignUp: PropTypes.func.isRequired
    // goback: PropTypes.func.isRequired,
    // children: PropTypes.object.isRequired
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm