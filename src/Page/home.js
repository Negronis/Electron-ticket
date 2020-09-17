
// 组件
import React, { Fragment } from 'react';
import { RouterLink } from "../Util/RouterUtil";
import { Throttle } from '../Util/FuncThrottle';
import AlertTab from './alert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
// 图片
import jzk from '../assets/jzk.png';
import sbk from '../assets/sbk.png';
// 模态框 
import DialogModules from './module';
// css
import './index.css';
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.Rlink = this.Rlink.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
    this.state = {
      Height: 0,
      CardArr: [
        {
          img: jzk,
          title: "就诊卡",
          id: 1
        },
        {
          img: sbk,
          title: "社保卡",
          id: 2
        },
        {
          img: jzk,
          title: "健康卡",
          id: 3
        }
      ],
      FuncList: [
        {
          id: 1,
          title: "扫描电子票据二维码",
          icon: "saomiaoerweima"
        },
        {
          id: 2,
          title: "输入证件号码查询",
          icon: "chaxun"
        }
      ]
    }
  }
  Rlink() {
    RouterLink.call(this, "/list");
  }
  changeHeight() {
    this.setState({
      Height: window.innerHeight
    })
  }
  componentDidMount() {
    this.changeHeight();
    // 响应式高度
    let resize = Throttle(this.changeHeight);
    window.addEventListener('resize', () => {
      resize();
    })
  }
  render() {
    return (
      <div className="home-contianer" style={{ height: `${this.state.Height}px` }}>
        <div className="home-container-title">山海关工人医院电子票据打印系统</div>
        <div className="home-container-content-all" >
          <div className="home-container-content-BigTitle">请选择打印方式</div>
          <div className="home-container-content-cardList" >
            <Card cardList={this.state.CardArr} ></Card>
          </div>
          <div className="home-container-content-funcList">
            <FuncBlock RLink={this.Rlink} FuncList={this.state.FuncList} />
          </div>
        </div>
      </div>
    )
  }
}
// 三个卡片
class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moduleDetail: {},
      open: false
    }
    this.closeOpen = this.closeOpen.bind(this);
    this.showModule = this.showModule.bind(this);
  }
  closeOpen() {
    this.setState({
      open: false
    })
  }

  // 模态框渲染
  showModule() {
    this.setState({
      moduleDetail: {
        title: "使用帮助",
        type: "help"
      },
      open: true
    })
  }
  render() {
    let RenderList = [];
    this.props.cardList.forEach(e => {
      let { id, img, title } = e;
      RenderList.push(
        <div onClick={this.showModule} key={id} className="home-container-content-card">
          <div>
            <img alt="loading..." src={img} width="80%" />
          </div>
          <div className="home-container-content-card-title">{title}</div>
        </div>
      )
    })
    return (
      <Fragment>
        {RenderList}
        <DialogModules moduleDetail={this.state.moduleDetail} open={this.state.open} close={this.closeOpen} />
      </Fragment>
    )
  }
}
// 底下两个功能
class FuncBlock extends React.Component {
  constructor(props) {
    super(props);
    this.closeOpen = this.closeOpen.bind(this);
    this.showModule = this.showModule.bind(this);
    this.submitCard = this.submitCard.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.changeCardNumber = this.changeCardNumber.bind(this);
    this.changeCardType = this.changeCardType.bind(this);
    this.state = {
      open: false,
      type: "",
      isAlert: false,
      alertMessage: "",
      cardNumber: "",
      cardType: ""
    }
  }
  // 关闭警告框
  closeAlert() {
    this.setState({
      isAlert: false
    })
  }
  changeCardNumber(event) {
    this.setState({
      cardNumber: event.target.value
    })
  }
  changeCardType(event) {
    this.setState({
      cardType: event.target.value
    })
  }
  //模态框提交方法
  submitCard() {
    let { cardNumber, cardType } = this.state;
    if (cardNumber === "") {
      this.setState({
        isAlert: true,
        alertMessage: "输入卡号为空"
      })
      return;
    }
    if (cardType === "") {
      this.setState({
        isAlert: true,
        alertMessage: "输入卡类型"
      })
      return;
    }
    this.props.RLink();
  }
  // 模态框渲染
  showModule(title) {
    if (title.indexOf('二维码') === -1) {
      this.setState({
        type: "selectCard"
      })
    } else {
      this.setState({
        type: "lookEr"
      })
    }
    this.setState({
      open: true
    })
  }
  // 关闭模态框
  closeOpen() {
    this.setState({
      open: false
    })
  }
  render() {
    // 列表渲染
    let RenderList = [];
    this.props.FuncList.forEach(e => {
      let { icon, title, id } = e;
      RenderList.push(
        <div onClick={this.showModule.bind(this, title)} key={id} className="home-container-content-funcList-child">
          <i style={{ fontSize: "1em", marginRight: ".5em" }} className={"iconfont icon-" + icon}></i>{title}
        </div>
      )
    })
    let DialogRender;
    if (this.state['type'] === 'selectCard') {
      DialogRender = (
        <Dialog
          disableBackdropClick={true}
          open={this.state.open}
          onClose={this.close}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          <div style={{ width: "550px" }}>
            <DialogTitle style={{ background: "rgba(0,0,0,.2)" }} id="responsive-dialog-title">请选择卡类型</DialogTitle>
            <DialogContent>
              <FormControl component="fieldset">
                <RadioGroup row name="cardType" value={this.state.cardType} onChange={this.changeCardType}>
                  <FormControlLabel value="jiuzhenka" control={<Radio />} label="就诊卡" />
                  <FormControlLabel value="jiangkangka" control={<Radio />} label="健康卡" />
                  <FormControlLabel value="tieluka" control={<Radio />} label="铁路卡" />
                </RadioGroup>
                <div style={{ margin: "20px auto" }}>请输入卡号</div>
                <TextField fullWidth={true} size="small" value={this.state.cardNumber} onChange={this.changeCardNumber} id="outlined-basic" label="卡号" variant="outlined" />
              </FormControl>
            </DialogContent>
            <div className="dialog-buttons">
              <Button style={{background: "#ffa200", color:"#FFF",fontSize:"1.2em", marginRight: "10px" }}   onClick={this.submitCard} variant="contained"  >  确认查询 </Button>
              <Button  style={{background:"#ed4014",color:"#fff",fontSize:"1.2em"}} onClick={this.closeOpen} variant="contained"  >  关闭 </Button>
            </div>
          </div>
        </Dialog>
      )
    } else {
      DialogRender = (
        <div></div>
      )
    }
    return (
      <Fragment>
        {RenderList}
        {DialogRender}
        <AlertTab close={this.closeAlert} alertMessage={this.state.alertMessage} open={this.state.isAlert} />
      </Fragment>
    )
  }
}
