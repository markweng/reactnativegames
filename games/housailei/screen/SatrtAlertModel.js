/**
 * Created by wengcheng on 2018/12/28 .
 */
/**
 * Created by wengcheng on 2018/11/27 .
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal, TouchableOpacity, ImageBackground
} from 'react-native';
import Utils from "../common/Utils";

const replay = require('../res/drawable/replay_icon.png')
const banana = require("../res/drawable/icon_banana.png")
const man = require("../res/drawable/icon_man_xingxing.png")
const woman = require("../res/drawable/icon_woman_xingxing.png")

export default class StartAlertModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    show(memonryContent) {

        this.setState({
            visible: true,
            memonryContent: memonryContent
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
                        marginTop: 16,
                        backgroundColor: "#FAF3E5",
                        paddingTop: 33,
                        paddingLeft: 31,
                        paddingRight: 31,
                        paddingBottom: 24,
                        borderRadius: 7,
                        borderWidth: 1,
                        borderColor: '#D6CEB3',
                        marginBottom: 22
                    }}>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            {this.state.memonryContent && this.state.memonryContent.map((data, index) => {

                                let image = null
                                if (data === 1) {
                                    image = man
                                } else if (data === 2) {
                                    image = woman
                                } else if (data === 3) {
                                    image = banana
                                }

                                return <Image key={index + ""} style={{
                                    width: Utils.getScreenScaleWidth(72),
                                    height: Utils.getScreenScaleWidth(72),
                                    marginLeft: index===0?0:24
                                }} source={image}/>
                            })}
                        </View>
                        <Text style={{
                            color: '#4A4A4A',
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginTop: 10
                        }}>请复原以上图案</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.hide()
                        this.props.onStart && this.props.onStart()

                    }}>
                        <Image style={{
                            width: 106,
                            height: 106,
                            marginBottom: Utils.getScreenScaleWidth(63),
                            marginTop: Utils.getScreenScaleWidth(73)
                        }} source={replay}/></TouchableOpacity>
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

