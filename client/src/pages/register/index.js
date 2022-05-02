import { Button } from "antd";
import popup from "components/common/Popup/index";
import { ROUTES } from "constants/routes";
import { FastField, Form, Formik } from "formik";
import React from "react";
import { AuthServices } from "services/auth-service";
import * as Yup from "yup";
import InputField from "./InputField";
import "./style.scss";

const Register = (props) => {
  const user = {
    name: "",
    email: "",
    password: "",
    comfirmpassword: "",
  };
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Họ tên không được để trống !"),
    email: Yup.string()
      .email("Email không hợp lệ !")
      .required("Email không được để trống !"),
    password: Yup.string().required("Mật khẩu không được để trống !"),
    comfirmpassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Nhập lại mật khẩu không khớp với mật khẩu !"
      )
      .required("Nhập lại mật khẩu không được để trống !"),
  });
  const authServices = new AuthServices();
  const handleRegister = async (values) => {
    try {
      console.log(values);
      const result = await authServices.register(values);
      console.log(result);
      popup("Đăng ký", "Vui lòng kiểm tra và xác nhận email", "success");
    } catch (err) {
      console.log(err);
      popup("Đăng ký", `${err.response.data.message}`, "error");
    }

    // dispatch({ type: USER_ACTIONS.USER_LOGIN_SUCCESS, payload: values });
    // localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, "aaaaaaa");
    // props.history.push(ROUTES.HOMEPAGE);
    // popup("Register", "Successfully Register", "success");
  };

  return (
    <div className="register">
      <Formik
        initialValues={user}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleRegister(values)}
      >
        {(formikProps) => {
          return (
            <Form>
              <h2>Đăng ký</h2>

              <FastField
                name="name"
                component={InputField}
                label="Họ tên"
                placeholder="Nhập họ tên"
              />
              <FastField
                name="email"
                component={InputField}
                label="Email"
                placeholder="Nhập email"
              />
              <FastField
                name="password"
                component={InputField}
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                type="password"
              />
              <FastField
                name="comfirmpassword"
                component={InputField}
                label="Nhập lại mật khẩu"
                placeholder="Nhập lại mật khẩu"
                type="password"
              />
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;
