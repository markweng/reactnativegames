/**
 * Created by Administrator on 2018/4/8 0008.
 */
import React, { Component } from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DataSource from "../common/DataSource";
import Utils from '../common/Utils';
import GameView from '../view/GameView'
import gameData from '../res/values/GameData'
import FLZSModal from '../modal/FLZSModal'
import HBZSModal from '../modal/HBZSModal'
import ResultModal from '../modal/ResultModal'
const TITLE_IMG = require("../res/drawable/home_title.png")
const HBZS = require("../res/drawable/hbzs.png")
const FLZS = require("../res/drawable/flzs.png")
const PROGRESS = require("../res/drawable/progress_img.png")


export default class HomeScreen extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            isRuning: false
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        StatusBar.setBarStyle("light-content")

    }
    componentWillUnmount() {

    }

    render() {
        if (this.state.showLoading) {
            return this.renderLoadingView();
        }
        return (
            <View style={styles.app_container}>
                <Image source={TITLE_IMG} style={{ width: Utils.getScreenScaleWidth(249), height: Utils.getScreenScaleWidth(39), marginTop: Utils.getStatusBarHeight() + Utils.getScreenScaleWidth(18) }} />
                <View style={{ width: DataSource.width, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {this.state.isRuning ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, color: '#fff', marginLeft: 15 }}>答题进度</Text>
                        <View style={{ width: 86, height: 12, backgroundColor: 'white', borderRadius: 6, marginLeft: 6, flexDirection: 'row' }}>
                            <Image style={{ width: this.state.progress * 86, height: 12, borderRadius: 6 }} source={PROGRESS} />
                        </View>
                    </View> : null}
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => {
                            this.hbzsModal && this.hbzsModal.show()
                        }}>
                            <View style={{ marginTop: 6, alignItems: 'center', height: 36, flexDirection: 'row', backgroundColor: 'white', borderTopLeftRadius: 18, borderBottomLeftRadius: 18 }}>
                                <Image style={{ marginLeft: 8 }} source={HBZS} />
                                <Text style={{ color: '#666666', fontSize: 12, marginLeft: 5, marginRight: 9 }}>环保证书</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.flzsModal && this.flzsModal.show()
                        }}>
                            <View style={{ marginTop: 16, alignItems: 'center', height: 36, flexDirection: 'row', backgroundColor: 'white', borderTopLeftRadius: 18, borderBottomLeftRadius: 18 }}>
                                <Image style={{ marginLeft: 8 }} source={FLZS} />
                                <Text style={{ color: '#666666', fontSize: 12, marginLeft: 5, marginRight: 9 }}>分类知识</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <GameView ref={g => this.gameView = g}
                    start={this.startGame.bind(this)}
                    end={() => { }}
                    selected={isRightType => {

                        if (isRightType) {
                            this.rightNum++
                        }
                        this.setState({
                            progress: this.currentIndex / 5
                        })
                        if (this.currentIndex < 5) {
                            this.gameView.setLJData(this.currentData[this.currentIndex])
                            this.currentIndex++

                        } else {
                            this.resultModal && this.resultModal.show(this.rightNum)
                            this.setState({
                                isRuning: false,
                                progress: 0
                            })
                            this.gameView.reset()

                            AsyncStorage.getItem("score", (err, value) => {
                                let newJson
                                if (value) {
                                    let json = JSON.parse(value)
                                    newJson = { rightNum: json.rightNum + this.rightNum, totalNum: json.totalNum + 5 }

                                } else {
                                    newJson = { rightNum: this.rightNum, totalNum: 5 }

                                }
                                AsyncStorage.setItem("score", JSON.stringify(newJson))
                            })

                        }

                    }}
                />
                <FLZSModal ref={m => this.flzsModal = m} />
                <HBZSModal ref={m => this.hbzsModal = m} />
                <ResultModal ref={m => this.resultModal = m} />
            </View>
        );
    }

    startGame() {

        let data = this.shuffle(gameData.data)
        this.rightNum = 0
        this.currentData = data.slice(0, 5)
        this.currentIndex = 0
        this.gameView.setLJData(this.currentData[this.currentIndex])
        this.currentIndex++;
        this.setState({
            isRuning: true,
        })
    }
    shuffle(arr) {
        let m = arr.length, i;
        while (m) {
            i = (Math.random() * m--) >>> 0;
            [arr[m], arr[i]] = [arr[i], arr[m]]
        }
        return arr;
    }

}

const styles = StyleSheet.create({
    app_container: {
        width: DataSource.width,
        flex: 1,
        backgroundColor: '#3BD7B4',
        alignItems: 'center'
    },
});