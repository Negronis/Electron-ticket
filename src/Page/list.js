import React from 'react';
import { RouterLink, RouterLinkParam } from "../Util/RouterUtil";
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination'
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.Rlink = this.Rlink.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeList = this.changeList.bind(this);
    this.linkDetail = this.linkDetail.bind(this);
    this.state = {
      Height: window.innerHeight,
      List: [
        {
          id: 1,
          patientType: "门诊",
          PatientNumber: "0001",
          feeNo: 123123,
          patientName: "患者",
          deptName: "急诊科",
          docName: "阿萨德",
          registerNo: 1,
          deptAddress: "河北省秦皇岛市海港区",
          registerDate: "2020-08-30 12:31:31",
          electronicBillDate: "2020-08-30 12:31:31",
          electronicBillCode: "ZZXZXS22213453",
          electronicBillCheckCode: "AASXXSWE",
          workStation: "秦皇岛市工人医院",
          electronicBillNumber: "EAJHAJHSDJHKASD",
          totalMoney: "111",
          electronicBillUrl: "www.baidu.com"

        },
        {
          id: 2,
          patientName: "患者",
          patientType: "门诊",
          PatientNumber: "0001",
          feeNo: 123123,
          deptName: "急诊科",
          docName: "阿萨德",
          registerNo: 1,
          deptAddress: "河北省秦皇岛市海港区",
          registerDate: "2020-08-30 12:31:31",
          electronicBillDate: "2020-08-30 12:31:31",
          electronicBillCode: "ZZXZXS22213453",
          electronicBillCheckCode: "AASXXSWE",
          workStation: "秦皇岛市工人医院",
          electronicBillNumber: "EAJHAJHSDJHKASD",
          totalMoney: "222",
          electronicBillUrl: "www.baidu.com"
        },
        {
          id: 3,
          patientType: "门诊",
          patientName: "患者",
          PatientNumber: "0001",
          feeNo: 123123,
          deptName: "急诊科",
          docName: "阿萨德",
          registerNo: 1,
          deptAddress: "河北省秦皇岛市海港区",
          registerDate: "2020-08-30 12:31:31",
          electronicBillDate: "2020-08-30 12:31:31",
          electronicBillCode: "ZZXZXS22213453",
          electronicBillCheckCode: "AASXXSWE",
          workStation: "秦皇岛市工人医院",
          electronicBillNumber: "EAJHAJHSDJHKASD",
          totalMoney: "333",
          electronicBillUrl: "www.baidu.com"

        },
      ],
      contentList: [],
      nowPage: 1,
      count: 0
    }
  }
  componentWillMount() {
    if (this.state.contentList.length === 0) {
      this.changeList();
    }
    this.setState({
      count: Math.ceil(this.state.List.length / 3),
    })
  }
  Rlink() {
    RouterLink.call(this, "/");
  }
  linkDetail(e) {
    console.log(e);
    RouterLinkParam.call(this, "/detail", 'default', e);
  }
  // 修改分页
  changePage(value) {
    this.setState({
      nowPage: value
    })
    let arr = this.changeList(value);
    return arr;
  }
  changeList(value) {
    let nowPage = value || 1;
    let arr = [];
    arr.push(...this.state.List);
    if (this.state.List.length > 3) {
      if (nowPage === 1) {
        arr = arr.slice(0, nowPage * 3);
      } else {
        arr = arr.slice((nowPage - 1) * 3, nowPage * 3);
      }
    }
    this.setState((state) => ({
      contentList: arr
    }))
    return arr;
  }
  render() {
    return (
      <div className="list-container" style={{ height: this.state.Height + "px" }}>
        <Header back={this.Rlink} />
        <Content linkDetail={this.linkDetail} Rlink={this.toDetail} changePage={this.changePage} count={this.state.count} nowPage={this.state.nowPage} List={this.state.contentList} Height={this.state.Height} />
        <Bottom />
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
          首页
      </Button>
        <span className="list-header-title">山海关工人医院</span>
      </div>
    )
  }
}
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.changeData = this.changeData.bind(this);
    this.selAll = this.selAll.bind(this);
    this.queueFunc = this.queueFunc.bind(this);
    this.changePageChild = this.changePageChild.bind(this);
    this.state = {
      isAll: false,
      renderList: this.props.List
    }
  }
  // 单选
  changeData(obj) {
    let arr = this.state.renderList;
    arr.forEach((e, i) => {
      let { id } = e;
      // id相同更改选中状态为true
      if (id === obj['id']) {
        e['isCheck'] = !e['isCheck'];
      }
    })
    this.setState({
      renderList: arr
    })
    console.log(this.state)
  }
  // 全选
  selAll() {
    let isAllBool = this.state.isAll;
    this.setState({
      isAll: !isAllBool
    })
    let arr = this.state.renderList;
    arr.forEach(e => {
      if (!isAllBool) {
        e['isCheck'] = true;
      } else {
        e['isCheck'] = false;
      }
    })
    this.setState({
      renderList: arr
    })
  }
  // 分页
  changePageChild(event, value) {
    let arr = this.props.changePage(value);
    // 判断状态 - 如果有一个没选中说明没有全选，删除全选状态
    arr.forEach(e => {
      let { isCheck } = e;
      if (isCheck === undefined || isCheck === null) {
        e['isCheck'] = false;
      }
      this.setState({
        isAll: true
      })
      if (!isCheck) {
        this.setState({
          isAll: false
        })
      }
    })
    this.setState({
      renderList: arr
    })
  }
  // 提交
  queueFunc() {
    alert(JSON.stringify(this.state.renderList));
    // this.props.Rlink();
  }
  render() {
    let renderList = [];
    this.state.renderList.forEach(e => {
      let { id, patientType, electronicBillDate, totalMoney, deptName, isCheck } = e;
      renderList.push(
        <div key={id} className="list-content-list-container-child">
          <div className="list-content-list-container-child-type">
            <span>{patientType}</span>
          </div>
          <div className="list-content-list-container-child-dep">
            <div>科室：{deptName}</div>
            <div>结算时间：{electronicBillDate}</div>
          </div>
          <div className="list-content-list-container-child-money">
            <div>金额：<span>¥{totalMoney}</span></div>
          </div>
          <div className="list-content-list-container-child-detail">
            <Button onClick={this.props.linkDetail.bind(this, e)} style={{ fontSize: "1em", marginTop: ".1em", color: "#2d8cf0" }}>查看详情 &gt;&gt;</Button>
          </div>
          <div className="list-content-list-container-child-checked">
            <Checkbox style={{ marginTop: ".1em", transform: "scale(1.3)", color: "#2d8cf0" }} checked={isCheck === true} onChange={this.changeData.bind(this, e)} />
          </div>
        </div>
      )
    })
    return (
      <div className="list-content" style={{ height: this.props.Height - 87.31 - 56.19 + "px" }}>
        <div className="list-content-list" style={{ height: this.props.Height - 87.31 - 56.19 - 32 - 75.594 - 48 + "px" }}>
          <div className="list-content-list-title">
            <div>（总共3张 选中1张）</div>
            <div>选择全部票据</div>
            <div style={{ position: "relative", width: "30%" }}>
              <Checkbox style={{ position: "absolute", right: "1.1em", top: "0", marginTop: "-.2em", transform: "scale(1.3)", color: "#fff" }} checked={this.state.isAll === true} onChange={this.selAll.bind(this)} />
            </div>
          </div>
          <div className="list-content-list-container" style={{ position: "relative", height: this.props.Height - 87.31 - 56.19 - 32 - 75.594 - 48 - 49.2 - 10 + "px" }}>
            {renderList}
            <div className="list-content-list-container-changePage">
              <Pagination style={{ width: "50%", transform: "scale(1.5)", margin: "0 auto" }} size="large" count={this.props.count} page={this.props.nowPage} onChange={this.changePageChild} />
            </div>
          </div>
        </div>
        <div className="list-content-button">
          <Button onClick={this.queueFunc} style={{background: "#ffa200",  padding: ".7em", width: "15em", fontSize: "1.5em" }} variant="contained" color="primary">
            确认打印
        </Button>
        </div>
      </div>
    )
  }
}
class Bottom extends React.Component { 
  render() {
    return (
      <div className="list-bottom">温馨提示：仅显示7内电子票据信息，更多业务请到人工窗口办理。</div>
    )
  }
}