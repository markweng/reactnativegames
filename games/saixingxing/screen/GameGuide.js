/**
 * Created by wengcheng on 2018/11/27 .
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import NavigationView from "../views/NavigationView";
import GameView from "../views/GameView";
import DataSource from "../common/DataSource";
import ShapeGameView from "../views/ShapeGameView";
import Utils from "../common/Utils";

const banana = require("../res/drawable/icon_banana.png")
const man = require("../res/drawable/icon_man_xingxing.png")
export default class GameGuide extends Component {
    static navigationOptions = {
        header: null
        /* No more header config here! */
    };

    render() {
        let length = DataSource.width - 36

        return (
            <View style={styles.container}>
                <NavigationView title={'玩法介绍'} navigation={this.props.navigation}/>
                <ScrollView style={{marginTop: 21}}>
                    <View style={{alignItems: 'center', marginBottom: 53}}>
                        <Text style={{
                            color: '#EE8155',
                            fontSize: 24,
                            fontWeight: 'bold',
                            paddingLeft: 17,
                            marginBottom: 5,
                            width:DataSource.width
                        }}>数字模式</Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingLeft: 17,
                            color: '#4A4A4A',
                            width: DataSource.width
                        }}>1.记忆亮起的方格和数字</Text>
                        <GameView numbers={[{num: 0, state: 0}, {num: 1, state: 1}, {num: 0, state: 0}, {
                            num: 2,
                            state: 1
                        }, {num: 0, state: 0}, {num: 5, state: 1}, {num: 0, state: 0}, {num: 3, state: 1}, {
                            num: 4,
                            state: 1
                        }]}/>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingLeft: 17,
                            paddingRight:17,
                            marginTop: 21,
                            color: '#4A4A4A',
                            width: DataSource.width

                        }}>2.在规定时间内按顺序点击方块进行复原</Text>
                        <GameView numbers={[{num: 0, state: 0}, {num: 1, state: 1}, {num: 0, state: 0}, {
                            num: 2,
                            state: 1
                        }, {num: 0, state: 0}, {num: 0, state: 0}, {num: 3, state: -1}, {num: 0, state: 0}, {
                            num: 0,
                            state: 0
                        }]}/>
                        <Text style={{
                            color: '#EE8155',
                            fontSize: 24,
                            fontWeight: 'bold',
                            width: DataSource.width,
                            paddingLeft: 17,
                            paddingRight:17,
                            marginBottom: 5,
                            marginTop: 37
                        }}>图形模式</Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingLeft: 17,
                            paddingRight:17,
                            color: '#4A4A4A',
                            width: DataSource.width
                        }}>1.记忆方格上的不同图案</Text>
                        <ShapeGameView
                            numbers={[{num: 2, state: 0}, {num: 1, state: 0}, {num: 1, state: 0}, {num: 3, state: 0},
                                {num: 2, state: 0}, {num: 2, state: 0}, {num: 1, state: 0}, {num: 3, state: 0},
                                {num: 0, state: 0}, {num: 3, state: 0}, {num: 3, state: 0}, {num: 2, state: 0},
                                {num: 1, state: 0}, {num: 2, state: 0}, {num: 1, state: 0}, {num: 3, state: 0},]}/>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingLeft: 17,
                            paddingRight:17,
                            color: '#4A4A4A',
                            width: DataSource.width,
                            marginTop:24
                        }}>2.记忆时间结束后会出现待复原的图案</Text>
                        <View style={{
                            marginTop: 16,
                            backgroundColor: "#FAF3E5",
                            paddingTop: 33,
                            paddingLeft: 31,
                            paddingRight: 31,
                            paddingBottom: 24,
                            borderRadius:7,
                            borderWidth:1,
                            borderColor:'#D6CEB3',
                            marginBottom:22,
                            alignItems:'center'
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <Image style={{
                                    width: Utils.getScreenScaleWidth(72),
                                    height: Utils.getScreenScaleWidth(72)
                                }} source={man}/>
                                <Image style={{
                                    marginLeft: 24,
                                    width: Utils.getScreenScaleWidth(72),
                                    height: Utils.getScreenScaleWidth(72)
                                }} source={banana}/>
                            </View>
                            <Text style={{
                                color: '#4A4A4A',
                                fontSize: 24,
                                fontWeight: 'bold',
                                marginTop: 10
                            }}>请复原以上图案</Text>
                        </View>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingLeft: 17,
                            paddingRight:17,
                            color: '#4A4A4A',
                            width: DataSource.width
                        }}>3.在规定时间内完成指定图案的复原</Text>
                        <ShapeGameView
                            numbers={[{num: 0, state: 0}, {num: 1, state: 0}, {num: 1, state: 0}, {num: 3, state: 0},
                                {num: 0, state: 0}, {num: 2, state: -1}, {num: 0, state: 0}, {num: 3, state: 0},
                                {num: 0, state: 0}, {num: 3, state: 0}, {num: 3, state: 0}, {num: 0, state: 0},
                                {num: 1, state: 0}, {num: 0, state: 0}, {num: 1, state: 0}, {num: 3, state: 0},]}/>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#4A4A4A',
                            marginLeft: 44,
                            marginRight: 44,
                            marginTop: 38
                        }}>游戏难度会随关卡的推进不断提高， 小伙伴们快来挑战吧</Text>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation && this.props.navigation.navigate('SelectLevelScreen')
                        }}>
                            <View style={{
                                height: 50,
                                marginTop: 34,
                                marginLeft: 18,
                                marginRight: 18,
                                borderRadius: 4,
                                backgroundColor: '#EE8155',
                                alignItems: "center",
                                justifyContent: 'center',
                                width: length
                            }}>
                                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>开始游戏</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8EECC',
    },
});
