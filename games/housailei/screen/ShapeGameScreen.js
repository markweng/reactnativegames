/**
 * Created by wengcheng on 2018/12/28 .
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Utils from "../common/Utils";
import NavigationView from "../views/NavigationView";
import GameView from "../views/ShapeGameView";
import DataSource from "../common/DataSource";
import ResultModal from "./ResultModal";
import StartAlertModal from "./SatrtAlertModel"

const icon = require('../res/drawable/game_start.png')
const banana = require("../res/drawable/memory_banana.png")
const man = require("../res/drawable/memory_man.png")
const woman = require("../res/drawable/memory_woman.png")


export default class ShapeGameScreen extends Component {
    static navigationOptions = {
        header: null
        /* No more header config here! */
    };

    constructor(props) {
        super(props)
        this.level = this.props.navigation.getParam("level")//关
        this.getRecoverTime = 5

        this.state = {
            memoryTime: this.getMemoryTime() * 100,
            recoverTime: 0,
            isPlaying: false,
            isMemorying: false,
            currentRecord: null
        }
        this.recoverContent = this.getRecoverContent()
        this.memoryContent = this.getMemoryContent()
        
    }

    getRecoverContent() {
        let memoryContent = []
        switch (this.level) {
            case 1:
                memoryContent = [1]
                break
            case 2:
                memoryContent = [1]
                break
            case 3:
                memoryContent = this.shuffle([1, 3]).slice(0, 1)
                break
            case 4:
                memoryContent = this.shuffle([1, 3]).slice(0, 1)
                break
            case 5:
                memoryContent = this.shuffle([1, 2, 3]).slice(0, 2)
                break
            case 6:
                memoryContent = this.shuffle([1, 2, 3]).slice(0, 2)
                break
        }
        return memoryContent
    }

    shuffle(arr) {
        let m = arr.length, i;
        while (m) {
            i = (Math.random() * m--) >>> 0;
            [arr[m], arr[i]] = [arr[i], arr[m]]
        }
        return arr;
    }

    getMemoryContent() {
        let memoryContent = []
        switch (this.level) {
            case 1:
                memoryContent = [1]
                break
            case 2:
                memoryContent = [1]
                break
            case 3:
                memoryContent = this.shuffle([1, 3])
                break
            case 4:
                memoryContent = this.shuffle([1, 3])
                break
            case 5:
                memoryContent = this.shuffle([1, 2, 3])
                break
            case 6:
                memoryContent = this.shuffle([1, 2, 3])
                break
        }
        return memoryContent
    }

    gameSatrt() {
        this.setState({isPlaying: true})

        this.gameView && this.gameView.gameStart(this.recoverContent)
        this.setState({isMemorying: true})


        this.timer = setInterval(() => {
            let second = this.state.memoryTime - 1
            this.setState({memoryTime: second})
            if (second === 0) {
                this.gameView && this.gameView.hideNumber()
                this.setState({isMemorying: false})
                this.recoverContent = this.getRecoverContent()
                this.startAlertModal && this.startAlertModal.show(this.recoverContent)
                clearInterval(this.timer)
            }
        }, 10)
    }

    startRecover() {
        this.recoverTimer = setInterval(() => {
            let second = this.state.recoverTime + 1
            this.setState({recoverTime: second})
            if (second === this.getRecoverTime * 100.00) {
                this.resultModal && this.resultModal.show(false)
                clearInterval(this.recoverTimer)
            }
        }, 10)
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
        this.recoverTimer && clearInterval(this.recoverTimer)
    }
    getRecoverTitle() {
        switch (this.level) {
            case 1:
                return "固定图案1种"
            case 2:
                return "固定图案1种"
            case 3:
                return "随机图案1种"
            case 4:
                return "随机图案1种"
            case 5:
                return "随机图案2种"
            case 6:
                return "随机图案2种"
        }
    }
    render() {


        return (
            <View style={styles.container}>
                <NavigationView title={'第' + Utils.getLeverName(this.level) + "关"} navigation={this.props.navigation}
                                goBack={() => {
                                    this.props.navigation.getParam("callback") && this.props.navigation.getParam("callback")()
                                }}/>
                <GameView ref={g => this.gameView = g} level={this.level} memoryContent={this.recoverContent}
                          handle={(isSuccess) => {
                              this.recoverTimer && clearInterval(this.recoverTimer)
                              if (isSuccess) {


                                  this.setState({currentRecord: (this.state.recoverTime / 100.0).toFixed(2) + "s"})


                                  DataSource.getBestScores(this.level + "shape", (err, value) => {
                                          if (err) {

                                              DataSource.setBestScores(this.level + "shape", (this.state.recoverTime / 100.0).toFixed(2))
                                              this.resultModal && this.resultModal.show(isSuccess, this.state.recoverTime, (this.state.recoverTime / 100.0).toFixed(2))

                                          } else {
                                              if (value && value.length > 0) {

                                                  let bestRecord = 0

                                                  if (parseFloat(value) < (this.state.recoverTime / 100.0).toFixed(2)) {
                                                      bestRecord = parseFloat(value).toFixed(2)
                                                  } else {
                                                      bestRecord = (this.state.recoverTime / 100.0).toFixed(2)
                                                      DataSource.setBestScores(this.level + "shape", bestRecord)

                                                  }

                                                  this.resultModal && this.resultModal.show(isSuccess, this.state.recoverTime, bestRecord)

                                              } else {
                                                  DataSource.setBestScores(this.level + "shape", (this.state.recoverTime / 100.0).toFixed(2))
                                                  this.resultModal && this.resultModal.show(isSuccess, this.state.recoverTime, (this.state.recoverTime / 100.0).toFixed(2))

                                              }

                                          }
                                      }
                                  )


                              } else {
                                  this.resultModal && this.resultModal.show(false, this.state.recoverTime, null)

                              }

                          }}/>
                <View style={{
                    flexDirection: 'row',
                    marginTop: Utils.isIphone5() || Utils.isIpad() ? 25 : 82,
                    alignItems: 'center'
                }}>
                    <View style={{marginLeft: 25, flex: 1}}>
                        <Text style={{
                            fontSize: 18,
                            color: '#4A4A4A',
                            fontWeight: 'bold'
                        }}>{"记忆时间：" + this.getMemoryTime() + "s"}</Text>
                        <Text style={{
                            fontSize: 18,
                            color: '#4A4A4A',
                            fontWeight: 'bold',
                            marginTop: 5
                        }}>记忆内容：</Text>
                        <View style={{flexDirection: 'row', marginTop: 8, marginBottom: 5}}>

                            {
                                this.memoryContent.map((data, index) => {
                                    let image = null
                                    switch (data) {
                                        case 1:
                                            image = man
                                            break
                                        case 2:
                                            image = woman
                                            break
                                        case 3:
                                            image = banana
                                            break
                                    }
                                    return <Image style={{
                                        width: Utils.getScreenScaleWidth(50),
                                        height: Utils.getScreenScaleWidth(50),
                                        backgroundColor: 'white',
                                        marginRight: 10
                                    }} source={image} key={index + ""}/>

                                })
                            }
                        </View>
                        <Text
                            style={{
                                fontSize: 18,
                                color: '#4A4A4A',
                                fontWeight: 'bold',
                                marginTop: 5
                            }}>{"复原内容：" + this.getRecoverTitle()}</Text>
                        <Text style={{
                            fontSize: 18,
                            color: '#4A4A4A',
                            fontWeight: 'bold',
                            marginTop: 5
                        }}>{"当前记录：" + (this.state.currentRecord ? this.state.currentRecord : "无")}</Text>

                    </View>
                    {this.state.isPlaying ? (this.state.isMemorying ? <View style={styles.timeView}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: '#4A4A4A',
                            marginTop: 17
                        }}>剩余时间</Text>
                        <View
                            style={{flexDirection: 'row', width: 71, alignItems: 'flex-end'}}>
                            <Text style={{
                                fontSize: 48,
                                fontWeight: 'bold',
                                color: '#4A4A4A'
                            }}>{parseInt(this.state.memoryTime / 100)}</Text>
                            <Text style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: '#4A4A4A',
                                marginBottom: 5
                            }}>{"." + parseInt(this.state.memoryTime / 10 % 10) + parseInt(this.state.memoryTime % 10)}</Text>
                        </View>
                    </View> : <View style={[styles.timeView, {backgroundColor: '#F3B73E'}]}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#4A4A4A',
                            marginTop: 22
                        }}>复原时间</Text>
                        <View
                            style={{flexDirection: 'row', width: 71, alignItems: 'flex-end'}}>
                            <Text style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: '#4A4A4A'
                            }}>{parseInt(this.state.recoverTime / 100)}</Text>
                            <Text style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                color: '#4A4A4A'
                            }}>{"." + parseInt(this.state.recoverTime / 10 % 10) + parseInt(this.state.recoverTime % 10) + "s"}</Text>
                        </View>
                    </View>) : <TouchableOpacity onPress={this.gameSatrt.bind(this)}>
                        <Image style={{width: 100, height: 100, marginRight: 25}}
                               source={icon}/></TouchableOpacity>}
                </View>
                <ResultModal ref={r => this.resultModal = r} onReStart={() => {
                    this.props.navigation && this.props.navigation.goBack()
                    this.props.navigation.getParam("callback") && this.props.navigation.getParam("callback")()

                }} onRePlay={() => {
                    this.rePlay()
                }}/>
                <StartAlertModal ref={r => this.startAlertModal = r} onStart={this.startRecover.bind(this)}/>
            </View>
        )
            ;
    }

    rePlay() {
        this.setState(
            {
                memoryTime: this.getMemoryTime() * 100,
                recoverTime: 0,
                isPlaying: false,
                isMemorying: false
            }
        )
    }

    getMemoryTime() {

        switch (this.level) {
            case 1:
                return 3;
            case 2:
                return 3;
            case 3:
                return 2;
            case 4:
                return 2;
            case 5:
                return 1.5;
            case 6:
                return 1.5;
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EECC',
        alignItems: 'center'
    },
    timeView: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#EE8155',
        shadowRadius: 50,
        shadowColor: '#8B572A',
        borderWidth: 3,
        borderColor: '#8B572A',
        marginRight: 25,
        alignItems: 'center'
    }
});
