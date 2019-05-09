/**
 * Created by wengcheng on 2018/11/27 .
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import NavigationView from "../views/NavigationView";
import DataSource from "../common/DataSource";
import Utils from "../common/Utils";

const icon = require('../res/drawable/selected_orange.png')
const locked_icon = require('../res/drawable/locked_icon.png')
const lock_open = require('../res/drawable/open_lock.png')
const lock_open_gray = require('../res/drawable/open_lock_gray.png')
const winner = require('../res/drawable/winner.png')


export default class SelectLevelScreen extends Component {
    static navigationOptions = {
        header: null
        /* No more header config here! */
    };

    constructor(props) {
        super(props)
        this.state = {
            selectIndex: 1,
            levels: [0, 0, 0, 0, 0],
            levelNum: 0,
            averageTime: 0,
            gradeNum: 0,
            isPass: false

        }
        this.refreshData()
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationView title={'选择关卡'} navigation={this.props.navigation}/>
                <View style={styles.tab}>
                    <StateBtn title={"常人"} isSelected={this.state.selectIndex === 1} onPress={() => {
                        if (this.state.selectIndex === 1) return
                        this.setState({selectIndex: 1}, () => {
                            this.refreshData()
                        })

                    }}/>
                    <StateBtn title={"高手"} isSelected={this.state.selectIndex === 2 && this.state.gradeNum >= 1}
                              image={this.state.gradeNum === 0 ? locked_icon : this.state.selectIndex === 2 ? lock_open : lock_open_gray}
                              onPress={() => {
                                  if (this.state.selectIndex === 2) return
                                  if (this.state.gradeNum === 0) return
                                  this.setState({selectIndex: 2}, () => {
                                      this.refreshData()
                                  })

                              }}/>
                    <StateBtn title={"猩猩"} isSelected={this.state.selectIndex === 3 && this.state.gradeNum === 2}
                              image={this.state.gradeNum < 2 ? locked_icon : this.state.selectIndex === 3 ? lock_open : lock_open_gray}
                              onPress={() => {
                                  if (this.state.selectIndex === 3) return
                                  if (this.state.gradeNum < 2) return

                                  this.setState({selectIndex: 3}, () => {
                                      this.refreshData()
                                  })


                              }}/>
                </View>
                <ScrollView style={{marginTop: 25}}>
                    <View style={[styles.levelRow, {paddingBottom: 28}]}>

                        <View style={{marginLeft: 43}}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginRight: 17,
                                alignItems: 'center',
                                width: this.state.isPass ? 100 : DataSource.width - 93,
                                marginTop: 24
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#4A4A4A',
                                    fontWeight: 'bold'
                                }}>{this.state.selectIndex === 1 ? "[ 常人难度 ]" : (this.state.selectIndex === 2 ? "[ 高手难度 ]" : "[ 猩猩难度 ]")}</Text>
                                {this.state.isPass ? null : <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    color: '#EE8155'
                                }}>{"完成" + this.state.levelNum + "/5"}</Text>}
                            </View>
                            {this.state.levelNum > 0 ? <Text style={{
                                fontSize: 18,
                                color: '#4A4A4A',
                                fontWeight: 'bold',
                                marginTop: 18
                            }}>{"您的平均用时" + this.state.averageTime + "s"}</Text> : null}
                            <Text style={{
                                fontSize: 13,
                                color: '#EE8155',
                                fontWeight: 'bold',
                                marginTop: this.state.levelNum === 0 ? 10 : 2
                            }}>{this.state.selectIndex === 1 ? "通关且平均用时低于1.30s解锁高手难度" : (this.state.selectIndex === 2 ? "通关且平均用时低于1.10s解锁猩猩难度" : "")}</Text>
                        </View>
                        {this.state.isPass ? <View style={{alignItems: 'center', marginTop: 23, marginRight: 17}}>
                            <Image style={{width: 40, height: 39}} source={winner}/>
                            <Text style={{marginTop: 4, color: '#EE8155', fontSize: 18, fontWeight: 'bold'}}>已通关</Text>
                        </View> : null}
                    </View>
                    {this.state.levels.map((data, index) => {
                        return <TouchableOpacity key={index + ''} onPress={this.didSelectedRow.bind(this, index)}>
                            <View style={[styles.levelRow, {height: 74}]}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 43}}>
                                    <Text style={{
                                        color: '#4A4A4A',
                                        fontWeight: 'bold',
                                        fontSize: 18
                                    }}>{"第" + Utils.getLeverName(index + 1) + "关"}</Text>
                                    {data > 0 ?
                                        <Image style={{width: 33, height: 23, marginLeft: 9}} source={icon}/> : null}
                                </View>
                                <Text style={{
                                    color: '#EE8155',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    marginRight: 17
                                }}>{data > 0 ? data + 's' : ""}</Text>
                            </View>
                        </TouchableOpacity>
                    })}
                </ScrollView>
            </View>
        );
    }

    refreshData() {

        DataSource.getPassNumber((number) => {
            if (number) {
                let gradeNum = parseInt(number)
                this.setState({
                    gradeNum: gradeNum
                }, () => {
                    this.getData()
                })
            } else {
                this.getData()
            }
        })
    }

    getData() {

        DataSource.getBestScores(this.state.selectIndex, (err, value) => {
            if (err) {
                this.setState(
                    {
                        levels: [0, 0, 0, 0, 0],
                        levelNum: 0,
                        averageTime: 0,
                        gradeNum: this.state.gradeNum,
                        isPass: false
                    }
                )
            } else {
                if (value && value.length > 0) {
                    let arr = JSON.parse(value).data
                    let num = 0
                    let totalTime = 0
                    arr.map((data, index) => {
                        let time = parseFloat(data)
                        if (time > 0) {
                            num++
                            totalTime += time
                        }

                    })
                    let averageTime = 0
                    if (num > 0) {
                        averageTime = (totalTime / num).toFixed(2)
                    }
                    let passNum = 0
                    let isPass = false
                    if (num === 5) {
                        if (averageTime < 1.30 && averageTime > 0 && this.state.selectIndex === 1) {

                            if (this.state.selectIndex === 1) isPass = true
                            if (this.state.selectIndex === 1) passNum = 1
                            if (this.state.gradeNum < passNum) {
                                DataSource.setPassNumber(passNum)
                            }
                        } else if (averageTime < 1.10 && averageTime > 0 && this.state.selectIndex === 2) {
                            if (this.state.selectIndex === 2) passNum = 2
                            if (this.state.selectIndex === 2) isPass = true
                            if (this.state.gradeNum < passNum) {
                                DataSource.setPassNumber(passNum)
                            }
                        }
                    }
                    this.setState(
                        {
                            levels: arr,
                            levelNum: num,
                            averageTime: averageTime,
                            gradeNum: this.state.gradeNum < passNum ? passNum : this.state.gradeNum,
                            isPass: isPass
                        }
                    )

                } else {
                    this.setState(
                        {
                            levels: [0, 0, 0, 0, 0],
                            levelNum: 0,
                            averageTime: 0,
                            gradeNum: this.state.gradeNum,
                            isPass: false
                        }
                    )
                }

            }
        })
    }

    didSelectedRow(index) {
        this.props.navigation && this.props.navigation.navigate('GameScreen', {
            level: index + 1,
            grade: this.state.selectIndex,
            callback: (() => {
                this.refreshData()
            })
        })
    }
}

class StateBtn extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                this.props.onPress()
            }}>
                <View style={{
                    flexDirection: 'row',
                    width: (DataSource.width - 34 - 12) / 3,
                    height: 46,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 4,
                    backgroundColor: this.props.isSelected ? '#F3B73D' : '#D6CEB3'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: this.props.isSelected ? '#FFFFFF' : '#9B9B9B'
                    }}>{this.props.title}</Text>
                    {this.props.image ?
                        <Image style={{width: 22, height: 17, marginLeft: 4}}
                               source={this.props.image}/> : null}
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EECC'

    },
    tab: {
        width: DataSource.width - 34,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Utils.getScreenScaleWidth(20),
        marginLeft: 17
    },
    levelRow: {
        width: DataSource.width - 34,
        marginLeft: 17,
        marginBottom: 16,
        backgroundColor: '#FAF3E5',
        borderRadius: 4,
        borderColor: '#D6CEB3',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
});
