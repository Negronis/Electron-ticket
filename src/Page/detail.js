import React from 'react';
import { RouterLink } from "../Util/RouterUtil";
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import QRCode from 'qrcode.react';
import logo from '../assets/zhkj.png';
import './index.css';
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.Rlink = this.Rlink.bind(this);
    this.state = {
      detail: {},
      Height: window.innerHeight
    }
  }
  componentDidMount() {
    if (!localStorage.getItem('detail') || localStorage.getItem('detail') === "{}" || this.props.location.params) {
      this.setState((state) => {
        let detailObject = {};
        detailObject = Object.assign(detailObject, this.props.location.params);
        localStorage.setItem('detail', JSON.stringify(detailObject));
        return {
          detail: detailObject,
        }
      })
    } else {
      this.setState({
        detail: JSON.parse(localStorage.getItem('detail'))
      })
    }
  }
  Rlink() {
    RouterLink.call(this, "/list", 'replace');
  }
  render() {
    return (
      <div>
        <Header back={this.Rlink} />
        <Content detail={this.state.detail} Height={this.state.Height} />
        <DetailBottom />
      </div>
    )
  }
}
class Header extends React.Component { 
  render() {
    return (
      <div className="list-header">
        <Button variant="contained"
          startIcon={<HomeIcon style={{ transform: "scale(1.3)" }} />}
          style={{ color: "#2d8cf0", background: "#fff", fontSize: ".7em", width: "150px", marginLeft: "1.5em" }}
          onClick={this.props.back}>
          列表
      </Button>
        <span className="list-header-title">山海关工人医院</span>
      </div>
    )
  }
}
class Content extends React.Component {
  constructor(props) {
    super(props)
    this.queueFunc = this.queueFunc.bind(this);
  }
  // 确认打印
  queueFunc() {
    alert(this.props.detail);
  }
  render() {
    let { detail } = this.props;
    let { 
      patientType,
      patientName,
      PatientNumber,
      feeNo,
      deptName,
      docName,
      registerNo,
      deptAddress,
      registerDate,
      electronicBillDate,
      electronicBillCode,
      electronicBillCheckCode,
      workStation,
      electronicBillNumber,
      totalMoney,
      electronicBillUrl
    } = detail;
    let fDiv = (
      <div className="detail-content-ticket-child">
        <div>姓 名：{patientName}</div>
        <div>{patientType}号：{PatientNumber}</div>
        <div>单据号：{feeNo}</div>
        <div>科室：{deptName}</div>
        <div>医生：{docName}</div>
        <div>就诊序号：{registerNo}</div>
      </div>
    )
    let sDiv = (
      <div className="detail-content-ticket-child">
        <div>结算时间：{registerDate}</div>
        <div>票据代码：{electronicBillCode}</div>
        <div>票据号码：{electronicBillNumber}</div>
        <div>校验位：{electronicBillCheckCode}</div>
        <div>就诊地点：{deptAddress}</div>
        <div>合计金额：{totalMoney}</div>
      </div>
    );
    let lDiv = (
      <div className="detail-content-ticket-child">
        <div>执收单位：{workStation}</div>
        <div ><QRCode style={{border:".5em solid #fff",borderRadius:".3em"}} value={"http://" + electronicBillUrl} size={190} fgColor="#000000" imageSettings={{
          src: logo,
          height: 25,
          width: 25,
          excavate: true
        }} /> </div>
        <div>票据开单时间：{electronicBillDate}</div>
      </div>
    );
    return (
      <div className="detail-content" style={{ height: this.props.Height - 64 - 87.31 - 56.19 + "px" }}>
        <div className="detail-content-ticket">
          {fDiv}
          {sDiv}
          {lDiv}
        </div>
        <div className="detail-content-ticket-submit">
          <Button onClick={this.queueFunc} style={{ background: "#ffa200", padding: ".7em", width: "15em", fontSize: "1.5em" }} variant="contained" color="primary">
            确认打印
        </Button>
        </div>
      </div>
    )
  }
}
class DetailBottom extends React.Component { 
  render() {
    return (
      <div className="list-bottom" style={{color:"#2d8cf0"}}>123</div>
    )
  }
}