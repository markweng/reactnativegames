/**
 * Created by wengcheng on 2018/11/27 .
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import NavigationView from "../views/NavigationView";
import Utils from "../common/Utils";
import GameView from "../views/GameView";
import ResultModal from "./ResultModal";
import DataSource from "../common/DataSource";

const icon = require('../res/drawable/game_start.png')

export default class GameScreen extends Component {

    static navigationOptions = {
        header: null
        /* No more header config here! */
    };

    constructor(props) {
        super(props)
        this.level = this.props.navigation.getParam("level")//关
        this.grade = this.props.navigation.getParam("grade")//等级
        this.state = {
            memoryTime: this.getMemoryTime() * 100,
            recoverTime: 0,
            isPlaying: false,
            isMemorying: false,
            bestScores: null,
            currentRecord: null

        }
    }

    componentDidMount() {

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

    gameSatrt() {
        this.setState({isPlaying: true})
        this.gameView && this.gameView.gameStart()
        this.setState({isMemorying: true})


        this.timer = setInterval(() => {
            let second = this.state.memoryTime - 1
            this.setState({memoryTime: second})
            if (second === 0) {
                this.gameView && this.gameView.hideNumber()
                this.setState({isMemorying: false})
                this.startRecover()
                clearInterval(this.timer)
            }
        }, 10)
    }

    startRecover() {
        this.recoverTimer = setInterval(() => {
            let second = this.state.recoverTime + 1
            this.setState({recoverTime: second})
            if (second === this.getRecoverTime() * 100.00) {
                this.resultModal && this.resultModal.show(false)
                clearInterval(this.recoverTimer)
            }
        }, 10)
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
        this.recoverTimer && clearInterval(this.recoverTimer)
    }

    getMemoryTime() {

        switch (this.grade) {
            case 1:
                return 2;
            case 2:
                return 1;
            case 3:
                return 0.5;
        }
    }

    getRecoverTime() {
        switch (this.grade) {
            case 1:
                return 5;
            case 2:
                return 4;
            case 3:
                return 3;
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <NavigationView title={'第' + Utils.getLeverName(this.level) + "关"} navigation={this.props.navigation}
                                goBack={() => {
                                    this.props.navigation.getParam("callback") && this.props.navigation.getParam("callback")()
                                }}/>
                <GameView ref={g => this.gameView = g} level={this.level} handle={(isSuccess) => {
                    this.recoverTimer && clearInterval(this.recoverTimer)
                    if (isSuccess) {
                        this.setState({currentRecord: (this.state.recoverTime / 100.0).toFixed(2) + "s"})
                        DataSource.getBestScores(this.grade, (err, value) => {
                            if (err) {
                                let arr = []
                                for (let i = 0; i < 5; i++) {

                                    if (i === this.level - 1) {
                                        arr.push((this.state.recoverTime / 100.0).toFixed(2))
                                        continue
                                    }
                                    arr.push(0)
                                }
                                DataSource.setBestScores(this.grade, JSON.stringify({data: arr}))
                                this.resultModal && this.resultModal.show(isSuccess, this.state.recoverTime, (this.state.recoverTime / 100.0).toFixed(2))

                            } else {
                                if (value && value.length > 0) {
                                    let arr = JSON.parse(value).data
                                    let bestScores = arr[this.level - 1]
                                    let currentScores = (this.state.recoverTime / 100.0).toFixed(2)
                                    if (bestScores == 0 || currentScores < bestScores) {
                                        arr[this.level - 1] = currentScores
                                        DataSource.setBestScores(this.grade, JSON.stringify({data: arr}))
                                        this.resultModal && this.resultModal.show(isSuccess, this.state.recoverTime, currentScores)
                                    } else {
                                        this.resultModal && this.resultModal.show(isSuccess, this.state.recoverTime, bestScores)

                                    }
                                } else {
                                    let arr = []
                                    for (let i = 0; i < 5; i++) {

                                        if (i === this.level - 1) {
                                            arr.push((this.state.recoverTime / 100.0).toFixed(2))
                                            continue
                                        }
                                        arr.push(0)
                                    }
                                    DataSource.setBestScores(this.grade, JSON.stringify({data: arr}))
                                    this.resultModal && this.resultModal.show(isSuccess, this.state.recoverTime, (this.state.recoverTime / 100.0).toFixed(2))

                                }

                            }
                        })

                    } else {
                        this.resultModal && this.resultModal.show(false, this.state.recoverTime, null)

                    }

                }}/>
                <View style={{flexDirection: 'row', marginTop: 82, alignItems: 'center'}}>
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
                        }}>{"记忆内容：1-" + (this.level + 4)}</Text>
                        <Text style={{
                            fontSize: 18,
                            color: '#4A4A4A',
                            fontWeight: 'bold',
                            marginTop: 5
                        }}>{"当前记录：" + (this.state.currentRecord ? this.state.currentRecord : "无")}</Text>
                    </View>
                    {this.state.isPlaying ? (this.state.isMemorying ? <View style={styles.timeView}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#4A4A4A', marginTop: 17}}>剩余时间</Text>
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
                        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#4A4A4A', marginTop: 22}}>复原时间</Text>
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
            </View>
        );
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
