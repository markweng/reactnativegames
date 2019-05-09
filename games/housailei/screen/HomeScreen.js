/**
 * Created by wengcheng on 2018/11/26 .
 */
import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import Utils from "../common/Utils";
import DataSource from "../common/DataSource";
import GameView from "../views/GameView";

const icon = require('../res/drawable/alert_icon.png')

export default class HomeScreen extends Component {
    static navigationOptions = {
        header: null
        /* No more header config here! */
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        StatusBar.setBarStyle("dark-content")
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>猴赛雷</Text>

                <GameView numbers={[{ num: 0, state: 0 }, { num: 1, state: 1 }, { num: 0, state: 0 }, { num: 2, state: 1 }, { num: -1, state: 0 }, { num: 5, state: 1 }, { num: 0, state: 0 }, { num: 3, state: 1 }, { num: 4, state: 1 }]} />

                <TouchableOpacity onPress={() => {
                    this.props.navigation && this.props.navigation.navigate('SelectLevelScreen')
                }}>
                    <View style={styles.btn1}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>数字模式</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation && this.props.navigation.navigate('SelectShapeLevelScreen')
                }}>
                    <View style={styles.btn2}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>图形模式</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation && this.props.navigation.navigate('GameGuide')
                }}>
                    <View style={{
                        marginTop: 30,
                        alignItems: "center",
                        justifyContent: 'center',
                        flexDirection: 'row'
                    }}>
                        <Image style={{ width: 20, height: 20 }} source={icon} />
                        <Text style={{ color: '#4A4A4A', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>玩法介绍</Text>
                    </View>
                </TouchableOpacity>
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
    title: {
        color: '#4A4A4A',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: Utils.getScreenScaleWidth(18) + Utils.getStatusBarHeight()
    },
    btn1: {
        height: 50,
        marginTop: 34,
        marginLeft: 18,
        marginRight: 18,
        borderRadius: 4,
        backgroundColor: '#EE8155',
        alignItems: "center",
        justifyContent: 'center',
        width: DataSource.width - 36
    },
    btn2: {
        height: 50,
        marginTop: 10,
        marginLeft: 18,
        marginRight: 18,
        borderRadius: 4,
        backgroundColor: '#F3B73D',
        alignItems: "center",
        justifyContent: 'center',
        width: DataSource.width - 36
    }
});
