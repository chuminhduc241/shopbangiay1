import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  Tag,
  Checkbox,
  Row,
  Col,
  Radio,
  message,
  InputNumber,
} from "antd";
import Tags from "../Tag";
import "./newproduct.scss";
import UploadImages from "../UploadImages";
import TextArea from "antd/lib/input/TextArea";
import { CategoryService } from "services/category-service";
import { ProductService } from "services/product-service";
const { Option } = Select;
function getBase64(file) {
  console.log("file :", file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
// const renderBase64 = (fileList) => {
//   let Listimages = [];
//   fileList.forEach((img) => {
//     getBase64(img).then((resultImg) => {
//       console.log(resultImg, "duc dep trai");
//       Listimages = [...Listimages, resultImg];
//     });
//   });
//   console.log("truoc");
//   return Listimages;
// };

const NewProduct = ({ setIsNewProduct, isNewProduct }) => {
  const [category, setCategory] = useState([]);
  const categoryServier = new CategoryService();
  const productService = new ProductService();
  const [images, setImages] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [messError, setMessError] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [soluong, setSoLuong] = useState([
    { size: 36, quantity: 0 },
    { size: 37, quantity: 0 },
    { size: 38, quantity: 0 },
    { size: 39, quantity: 0 },
    { size: 40, quantity: 0 },
    { size: 41, quantity: 0 },
    { size: 42, quantity: 0 },
  ]);

  useEffect(() => {
    const getCategory = async () => {
      const res = await categoryServier.getCategory();
      setCategory(res);
    };
    getCategory();
  }, []);
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setMessError(false);
    // setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleAdd = async (value) => {
    if (imagesPreview.length === 0) {
      setMessError(true);
      return;
    }
    const newProduct = {
      ...value,
      price: Number(value.price),
      images: imagesPreview,
    };
    const newArr = [];
    for (let i = 0; i < soluong.length; i++) {
      if (soluong[i].quantity !== 0) {
        newArr.push(soluong[i]);
      }
    }
    await productService.addProduct({ ...newProduct, sizeQuantity: newArr });
    message.success("Th??m s???n ph???m th??nh c??ng");
  };

  console.log(soluong);
  const sizeOptions = [
    { label: "36", value: 36 },
    { label: "37", value: 37 },
    { label: "38", value: 38 },
    { label: "39", value: 39 },
    { label: "40", value: 40 },
    { label: "41", value: 41 },
    { label: "42", value: 42 },
    { label: "43", value: 43 },
  ];
  const [form] = Form.useForm();
  const handleSize = (value, size, index) => {
    console.log(value);
    console.log(size);
    console.log(index);
    const newArr = [...soluong];
    newArr[index] = { size: size, quantity: value };
    setSoLuong([...newArr]);
  };
  return (
    <div className="new-product">
      <Modal
        width={1200}
        title="Th??m s???n ph???m"
        visible={isNewProduct}
        onCancel={() => setIsNewProduct(false)}
        className="themsanpham"
        style={{ top: "50px" }}
        footer={[
          <Form form={form} onFinish={handleAdd}>
            <Button key="back" onClick={() => setIsNewProduct(false)}>
              H???y
            </Button>
            <Button className="addProduct" type="primary" htmlType="submit">
              Th??m
            </Button>
          </Form>,
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="T??n s???n ph???m"
            name="name"
            rules={[{ required: true, message: "Vui l??ng nh???p t??n s???n ph???m" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gi?? s???n ph???m"
            name="price"
            rules={[
              { required: true, message: "Vui l??ng nh???p gi?? s???n ph???m" },
              {
                message: "Gi?? ph???i l?? m???t s???",
                pattern: new RegExp(/^[0-9]+$/),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Th????ng hi???u"
            name="category"
            rules={[{ required: true, message: "Vui l??ng nh???p th????ng hi???u" }]}
          >
            <Select
              showSearch
              placeholder="Ch???n th????ng hi???u"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {category?.map((cate) => (
                <Option key={cate._id} value={cate.name}>
                  {cate.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Mi??u t???"
            name="description"
            rules={[{ required: true, message: "Vui l??ng nh???p gi?? s???n ph???m" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          {/* <Form.Item
            label="K??ch c???"
            name="size"
            rules={[
              { required: true, message: "Vui l??ng nh???p k??ch c??? S???n Ph???m" },
            ]}
          >
            <Checkbox.Group options={sizeOptions} />
          </Form.Item> */}

          <Form.Item
            label="Gi???i t??nh"
            name="gender"
            rules={[{ required: true, message: "Vui l??ng nh???p gi???i t??nh" }]}
          >
            <Radio.Group>
              <Radio value="Nam" checked>
                Nam
              </Radio>
              <Radio value="N???">N???</Radio>
              <Radio value="Nam, N???">Nam, N???</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="M??u s???c"
            name="color"
            rules={[
              { required: true, message: "Vui l??ng nh???p m??u s???c S???n Ph???m" },
            ]}
          >
            <Tags form={form} />
          </Form.Item>
        </Form>
        <Row>
          <Col
            className="ant-col ant-col-6 ant-form-item-label"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            span={8}
          >
            <div className="label-hinhanh">K??ch c???</div>
          </Col>
          <Col>
            <div className="soluong" style={{ display: "flex" }}>
              {soluong.map((item, index) => (
                <div key={item.size} style={{ marginLeft: 8 }}>
                  <span style={{ marginRight: "8px" }}>{item.size}</span>
                  <InputNumber
                    size="large"
                    min={0}
                    max={100000}
                    defaultValue={0}
                    value={item.quantity}
                    onChange={(value) => handleSize(value, item.size, index)}
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <div className="div" style={{ marginTop: "20px" }}>
          <Row style={{ alignItems: "center" }}>
            <Col className="ant-col ant-col-6 ant-form-item-label" span={8}>
              <div className="label-hinhanh">H??nh ???nh</div>
            </Col>
            <Col span={16}>
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>
              <div className="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
                {messError && (
                  <span style={{ color: "red" }}>Vui l??ng th??m h??nh ???nh</span>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default NewProduct;
