/**
 * Created by Administrator on 2018/4/8 0008.
 */
import React, {
    Component,
} from 'react'; import {
    Image,
    Text,
    TouchableOpacity,
    View,
    PanResponder,
    Animated
} from 'react-native';
import DataSource from "../common/DataSource";
import Utils from '../common/Utils';
const YHLJ = require("../res/drawable/yhlj.png")
const KHSLJ = require("../res/drawable/khslj.png")
const SYLJ = require("../res/drawable/sylj.png")
const QTLJ = require("../res/drawable/qtlj.png")
const START = require("../res/drawable/start_game_img.png")
const FAILE = require("../res/drawable/faile_img.png")
const SUCS = require("../res/drawable/right_answer_img.png")
const SCALE = 1.3
const ljt_width = Utils.getScreenScaleWidth(90)
const ljt_height = Utils.getScreenScaleWidth(131)
const lj_width = Utils.getScreenScaleWidth(132)
const lj_height = Utils.getScreenScaleWidth(141)
export default class GameView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marginTop: ljt_height + 31,
            marginLeft: (DataSource.width - lj_width) / 2,
            ljName: null,
            image: "",
            status: 0, //0:暂停，1:运行中，2，正确 3.错误
            bounceValue1: new Animated.Value(1),
            bounceValue2: new Animated.Value(1),
            bounceValue3: new Animated.Value(1),
            bounceValue4: new Animated.Value(1),
            bounceValueLJ: new Animated.Value(0.5)
        };
        this.lastX = this.state.marginLeft;
        this.lastY = this.state.marginTop;
        this.isAnimating = false
        this.currentOnLJT = -1
        this.isScaled = false
        this.lastSel  = -1
    }

    componentDidMount() {
        let WD = DataSource.width
        this.yhljframe = { x: (WD - ljt_width) / 2, y: 0 }
        this.qtljframe = { x: 6, y: 31 + ljt_height }
        this.khsljframe = { x: WD - ljt_width - 6, y: 31 + ljt_height }
        this.cyljframe = { x: (WD - ljt_width) / 2, y: 33 + ljt_height * 2 + 31 }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                if (this.state.status == 2 || this.state.status == 3) {
                    return false;
                }

                return true;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                if (this.state.status == 2 || this.state.status == 3) {
                    return false;
                }
                return true;
            },
            onPanResponderGrant: (evt, gestureState) => {
            },
            onPanResponderMove: (evt, gestureState) => {
                this.setState({
                    marginLeft: this.lastX + gestureState.dx,
                    marginTop: this.lastY + gestureState.dy,
                });
                 
                let hcenter = this.lastX + gestureState.dx + lj_width / 2;
                let vcenter = this.lastY + gestureState.dy + lj_height / 2;
                
                if (hcenter > this.yhljframe.x && hcenter < (this.yhljframe.x + ljt_width) && vcenter > this.yhljframe.y && vcenter < (this.yhljframe.y + ljt_height)) {
                    // ToastShow.show("有害垃圾", ToastShow.SHORT)
                    this.currentOnLJT = 1
                    this.startAnimation(1)
                   

                } else if (hcenter > this.khsljframe.x && hcenter < (this.khsljframe.x + ljt_width) && vcenter > this.khsljframe.y && vcenter < (this.khsljframe.y + ljt_height)) {
                    // ToastShow.show("可回收垃圾", ToastShow.SHORT)
                    this.currentOnLJT = 2
                    this.startAnimation(2)

                } else if (hcenter > this.qtljframe.x && hcenter < (this.qtljframe.x + ljt_width) && vcenter > this.qtljframe.y && vcenter < (this.qtljframe.y + ljt_height)) {
                    // ToastShow.show("其他垃圾", ToastShow.SHORT)
                    this.currentOnLJT = 2
                    this.startAnimation(3)

                } else if (hcenter > this.cyljframe.x && hcenter < (this.cyljframe.x + ljt_width) && vcenter > this.cyljframe.y && vcenter < (this.cyljframe.y + ljt_height)) {
                    // ToastShow.show("厨余垃圾", ToastShow.SHORT)
                    this.currentOnLJT = 4
                    this.startAnimation(4)

                } else {
                    // ToastShow.show("空白", ToastShow.SHORT)
                    this.currentOnLJT = -1
                    this.startAnimation(-1)
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                this.lastX = this.state.marginLeft;
                this.lastY = this.state.marginTop;
                let hcenter = this.lastX + lj_width / 2;
                let vcenter = this.lastY + lj_height / 2;
                if (hcenter > this.yhljframe.x && hcenter < (this.yhljframe.x + ljt_width) && vcenter > this.yhljframe.y && vcenter < (this.yhljframe.y + ljt_height)) {
                    // ToastShow.show("有害垃圾", ToastShow.SHORT)
                    // this.startAnimation()
                    if (this.state.ljType == 3) {
                        this.success(1)
                    } else {
                        this.failed(1)
                    }

                } else if (hcenter > this.khsljframe.x && hcenter < (this.khsljframe.x + ljt_width) && vcenter > this.khsljframe.y && vcenter < (this.khsljframe.y + ljt_height)) {
                    // ToastShow.show("可回收垃圾", ToastShow.SHORT)
                    if (this.state.ljType == 1) {
                        this.success(2)
                    } else {
                        this.failed(2)
                    }

                } else if (hcenter > this.qtljframe.x && hcenter < (this.qtljframe.x + ljt_width) && vcenter > this.qtljframe.y && vcenter < (this.qtljframe.y + ljt_height)) {
                    // ToastShow.show("其他垃圾", ToastShow.SHORT)
                    if (this.state.ljType == 2) {
                        this.success(3)
                    } else {
                        this.failed(3)
                    }

                } else if (hcenter > this.cyljframe.x && hcenter < (this.cyljframe.x + ljt_width) && vcenter > this.cyljframe.y && vcenter < (this.cyljframe.y + ljt_height)) {
                    // ToastShow.show("厨余垃圾", ToastShow.SHORT)
                    if (this.state.ljType == 0) {
                        this.success(4)
                    } else {
                        this.failed(4)
                    }

                } else {
                    this.setState({
                        marginTop: ljt_height + 31,
                        marginLeft: (DataSource.width - lj_width) / 2
                    }, () => {
                        this.lastX = this.state.marginLeft;
                        this.lastY = this.state.marginTop;
                    });
                }

            },
            onPanResponderTerminate: (evt, gestureState) => {

            },
        });
    }
    failed(index) {
        this.setState({
            status: 3,
            marginTop: ljt_height + 31,
            marginLeft: (DataSource.width - lj_width) / 2,
            name:""
        },()=>{
            this.endAnimation()
            this.next(false)
        })
    }
    success(index) {
        this.setState({
            status: 2,
            marginTop: ljt_height + 31,
            marginLeft: (DataSource.width - lj_width) / 2,
            name:""
        },()=>{
            this.endAnimation()
            this.next(true)
        })
    }
    next(isRight) {
        this.lastX = this.state.marginLeft;
        this.lastY = this.state.marginTop;
      this.interval =  setInterval(()=>{
            this.props.selected && this.props.selected(isRight)
            clearInterval(this.interval)
        },500)
    }
    setLJData(data) {
        if (!data) return
        this.image = data.name
        this.setState({
            ljName: data.name,
            image: data.image,
            ljType: data.type,
            status: 1
        })
        this.state.bounceValueLJ.setValue(0.5)
        Animated.parallel([
            Animated.timing(this.state.bounceValueLJ,{toValue: 1,friction:30}).start()
        ])
    }
    reset() {
        this.setState({
            ljName: "",
            image: null,
            ljType: null,
            status: 0
        })
    }
    startAnimation(index) {
             
            if(this.isAnimating && this.currentOnLJT > -1) {
                return
            }
            if(this.currentOnLJT == index && this.currentOnLJT > -1) {
                this.isAnimating = true
            }

            if(index < 0) {
                this.endAnimation()
                return
            }
           
        switch(index) {
            case 1 : {
                this.isScaled = true
                this.lastSel = index
                Animated.parallel([
                    Animated.timing(this.state.bounceValue1,{toValue: SCALE,friction:5}).start() 
                ])
                break;
            };
            case 2 : {
                this.isScaled = true
                this.lastSel = index
                Animated.parallel([
                    Animated.timing(this.state.bounceValue2,{toValue: SCALE,friction:5}).start() 
                ])
                break;
            };
            case 3 : {
                this.isScaled = true
                this.lastSel = index
                Animated.parallel([
                    Animated.timing(this.state.bounceValue3,{toValue: SCALE,friction:5}).start() 
                ])
                break;
            };
            case 4 : {
                this.isScaled = true
                this.lastSel = index
                Animated.parallel([
                    Animated.timing(this.state.bounceValue4,{toValue: SCALE,friction:5}).start() 
                ])
                break;
            };
        }
       
    }
    endAnimation() {
        if (!this.isScaled) {
            return
        }
        // this.state.bounceValue.setValue(1.4)
        switch(this.lastSel) {
            case 1 : {
                this.isAnimating = false
                this.isScaled = false
                Animated.parallel([
                    Animated.timing(this.state.bounceValue1,{toValue: 1,friction:5}).start()
                ])
                break;
            };
            case 2 : {
                this.isAnimating = false
                this.isScaled = false
                Animated.parallel([
                    Animated.timing(this.state.bounceValue2,{toValue: 1,friction:5}).start(()=>{
                       
                    })
                ])
                break;
            };
            case 3 : {
                this.isAnimating = false
                this.isScaled = false
                Animated.parallel([
                    Animated.timing(this.state.bounceValue3,{toValue: 1,friction:5}).start()
                ])
                break;
            };
            case 4 : {
                this.isAnimating = false
                this.isScaled = false
                Animated.parallel([
                    Animated.timing(this.state.bounceValue4,{toValue: 1,friction:5}).start()
                ])
                break;
            }
        }

    }
    render() {
          let image = this.state.image
          if (this.state.status == 2) {
            image = SUCS
          } else if(this.state.status == 3) {
            image = FAILE
          }
        return (
            <View style={{ width: DataSource.width, alignItems: 'center' }}>
                <Animated.Image source={YHLJ} style={{ width: ljt_width, height: ljt_height, transform: [{scale:this.state.bounceValue1}]}} />
                <Animated.Image source={KHSLJ} style={{ position: 'absolute', right: 6, top: 31 + ljt_height, width: ljt_width, height: ljt_height, transform: [{scale:this.state.bounceValue2}] }} />
                <Animated.Image source={QTLJ} style={{ position: 'absolute', left: 6, top: 31 + ljt_height, width: ljt_width, height: ljt_height, transform: [{scale:this.state.bounceValue3}] }} />
                <Animated.Image source={SYLJ} style={{ width: ljt_width, height: ljt_height, marginTop: 33 + ljt_height + 31, transform: [{scale:this.state.bounceValue4}] }} />
                <View style={{ position: 'absolute', top: ljt_height + 31, width: lj_width, height: lj_height + 20, alignItems: 'center' }}>
                    <Text style={{ position: 'absolute', top: lj_height, color: 'white', fontSize: 15 }}>{this.state.ljName}</Text>
                </View>
                {(this.state.status == 1 || this.state.status == 2 || this.state.status == 3)? <Animated.Image source={image} style={{
                    position: 'absolute', height: lj_height, width: lj_width, top: this.state.marginTop,
                    left: this.state.marginLeft, transform: [{scale:this.state.bounceValueLJ}]
                }} {...this._panResponder.panHandlers}/> : <TouchableOpacity onPress={this.props.start} style={{
                    position: 'absolute', height: Utils.getScreenScaleWidth(70), width: Utils.getScreenScaleWidth(155), top: ljt_height + 31 + (ljt_height - Utils.getScreenScaleWidth(70)) / 2,
                    left: (DataSource.width - Utils.getScreenScaleWidth(155)) / 2
                }}><Image source={START} style={{
                    position: 'absolute', height: Utils.getScreenScaleWidth(70), width: Utils.getScreenScaleWidth(155), top: 0,
                    left: 0
                }} /></TouchableOpacity>}

            </View>
        )
    }

}