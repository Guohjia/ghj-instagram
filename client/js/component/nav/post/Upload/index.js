import React, { Component } from "react";
import { message,Upload, Icon, Modal } from "antd";
import Style from "./index.less";
import PropTypes from "prop-types";

export default class PicturesWall extends Component {
  state = {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      upload_token:"HjqY4nn-N7JIBvt1YPDzj4gHjhEte-asl4hQdxHz:NHVUgiTeHWyxR3RqQWIP0y4OKrE=:eyJzY29wZSI6Im11c2ljIiwiZGVhZGxpbmUiOjE4NjI4NDUyMDB9"
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
      this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true
      });
  }

  handleChange = ({ fileList,file }) => {
      this.setState({ fileList });
      if(file.status === "error"){message.error("上传图片出错");return;}
      if(file.status!== "done"){return;}
      let { response } = file;
      if(response.hash){this.props.getUrl(response.hash)}
  }

  render() {
      const { previewVisible, previewImage, fileList,upload_token } = this.state;
      const uploadButton = (
          <div>
              <Icon type="upload" />
              <div className="ant-upload-text">Upload</div>
          </div>
      );
      return (
          <div className={Style.Upload}>
              <Upload
                  action="http://upload.qiniup.com/"
                  listType="picture-card"
                  fileList={fileList}
                  data={{token:upload_token}}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange.bind(this)}
              >
                  {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: "100%" }} src={previewImage} />
              </Modal>
          </div>
      );
  }
}

PicturesWall.propTypes = {
    getUrl: PropTypes.func.isRequired
}