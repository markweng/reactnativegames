/**
 * Created by wengcheng on 2018/11/27 .
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal, TouchableOpacity,ImageBackground
} from 'react-native';
import DataSource from "../common/DataSource";
import Utils from "../common/Utils";

const logo_lose = require('../res/drawable/lose_icon.png')
const logo_scs = require('../res/drawable/success_icon.png')
const replay = require('../res/drawable/replay_icon.png')
const restart124 = require('../res/drawable/resatrt_icon124.png')
const restart = require('../res/drawable/resatrt_icon.png')
const best = require('../res/drawable/best_icon.png')

export default class ResultModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isSuccess: false,
            visible: false,
            scores: "",
            bestScores: ""
        }
    }

    show(isSuccess, scores, bestScores) {


        this.setState({
            isSuccess: isSuccess,
            visible: true,
            scores: scores,
            bestScores: bestScores
        })
    }

    hide() {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <Modal style={{flex: 1}}
                   visible={this.state.visible}
                   transparent={true}
                   animationType={'fade'}>
                <View style={styles.container}>
                    <View style={{
                        backgroundColor: '#FAF3E5',
                        width: DataSource.width - 128,
                        borderRadius: 7,
                        alignItems: 'center',
                        paddingTop: 35,
                        paddingBottom: 23
                    }}>
                        <Image style={{width: 83, height: 68}} source={this.state.isSuccess ? logo_scs : logo_lose}/>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            color: '#4A4A4A',
                            marginTop: 13
                        }}>{this.state.isSuccess ? "挑战成功" : "挑战失败"}</Text>
                        {this.state.isSuccess ? <Text style={{
                            fontWeight: 'bold',
                            fontSize: 24,
                            color: '#EE8155'
                        }}>{'用时：' + (this.state.scores / 100.00).toFixed(2) + 's'}</Text> : null
                        }
                    </View>
                    {this.state.isSuccess ?
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingRight: 30,
                            paddingLeft: 30,
                            marginBottom: Utils.getScreenScaleWidth(63),
                            marginTop: Utils.getScreenScaleWidth(76)
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: '#EE8155',
                                position: 'absolute',
                                left: 24,
                                top: 0

                            }}>历史最佳</Text>
                            <ImageBackground style={{width: 62, height: 62,alignItems:'center',justifyContent:'center'}} source={best}>
                                <Text style={{color:'#8B572A',fontWeight:'bold',fontSize:18}}>{this.state.bestScores+"s"}</Text>
                            </ImageBackground>
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                paddingTop: 20,
                                justifyContent: 'center'
                            }}><TouchableOpacity
                                onPress={() => {
                                    this.hide()
                                    this.props.onReStart && this.props.onReStart()
                                }}><Image
                                style={{width: 106, height: 106}} source={replay}/></TouchableOpacity></View>
                            <TouchableOpacity onPress={() => {
                                this.hide()
                                this.props.onRePlay && this.props.onRePlay()

                            }}>
                                <Image style={{width: 62, height: 62}} source={restart124}/>
                            </TouchableOpacity>
                        </View> : <TouchableOpacity onPress={() => {
                            this.hide()
                            this.props.onRePlay && this.props.onRePlay()

                        }}>
                            <Image style={{
                                width: 102,
                                height: 102,
                                marginBottom: Utils.getScreenScaleWidth(63),
                                marginTop: Utils.getScreenScaleWidth(76)
                            }} source={restart}/></TouchableOpacity>}
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});
