import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import popup from "components/common/Popup/index";
import { LOCAL_STORAGE } from "constants/localstorage";
import { FastField, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginSuccess } from "redux/authSlice";
import { AuthServices } from "services/auth-service";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import InputField from "../register/InputField";
import "./style.scss";

const Login = () => {
  const user = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
    password: Yup.string().required("Mật khẩu không được để trống"),
  });
  const authServices = new AuthServices();
  const handleRegister = async (values) => {
    try {
      console.log(values);
      const result = await authServices.login(values);
      localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, result.accesstoken);
      // const res = await authServices.refreshToken();
      // console.log({ result, res });
      localStorage.setItem(LOCAL_STORAGE.REFESH_TOKEN, result.accesstoken);
      dispatch(loginSuccess());
      popup("Đăng nhập", "Đăng nhập thành công", "success");
      history.push("/");
    } catch (err) {
      console.log(err.response.data);
      popup("Đăng nhập", `${err.response.data.msg}`, "error");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <Formik
          initialValues={user}
          validationSchema={SignupSchema}
          onSubmit={(values) => handleRegister(values)}
        >
          {(formikProps) => {
            return (
              <Form>
                <h2>Đăng nhập</h2>
                <FastField
                  icon={<UserOutlined className="site-form-item-icon" />}
                  name="email"
                  component={InputField}
                  placeholder="Email"
                />
                <FastField
                  name="password"
                  component={InputField}
                  placeholder="Mật khẩu"
                  type="password"
                  icon={<LockOutlined className="site-form-item-icon" />}
                />

                <Button className="btn-login" type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form>
            );
          }}
        </Formik>
        <p style={{ textAlign: "right" }}>
          Bạn chưa có tài khoản ?
          <Button type="link" danger>
            <Link to={"/register"}>Đăng ký</Link>
          </Button>
        </p>
      </div>
      r
    </div>
  );
};

export default Login;
