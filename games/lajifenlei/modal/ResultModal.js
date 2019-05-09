/**
 * Created by wengcheng on 2018/11/27 .
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal, TouchableOpacity
} from 'react-native';
const hbzsimg = require("../res/drawable/success_modal_img.png")

import DataSource from '../common/DataSource';
import Utils from '../common/Utils';

export default class ResultModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            rightNum:0
        }
    }

    show(rightNum) {
        this.setState({
            visible: true,
            rightNum:rightNum
        })
    }

    hide() {
        this.setState({
            visible: false
        })
    }

    render() {
        return (
            <Modal style={{ flex: 1 }}
                visible={this.state.visible}
                transparent={true}
                animationType={'fade'}>
                <View style={styles.container}>
                    <View style={{ backgroundColor: '#fff', width: DataSource.width - Utils.getScreenScaleWidth(108), alignItems: 'center', borderRadius: 4, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                        <Image style={{ width: Utils.getScreenScaleWidth(349), height: Utils.getScreenScaleWidth(95) }} source={hbzsimg} />
                        <Text style={{ color: '#FFA700', fontSize: 60, fontWeight: "500" }}>{this.state.rightNum  / 0.05 + "%"}</Text>
                        <Text style={{ color: '#666666', fontSize: 18, marginTop: 14, lineHeight: 20 ,}}>{"本次共答对"+ this.state.rightNum + "题，正确率"}</Text>
                        <TouchableOpacity onPress={() => {
                        this.hide()
                    }}>
                        <View style={{marginTop: 45, width: DataSource.width - Utils.getScreenScaleWidth(160), height: Utils.getScreenScaleWidth(49), borderRadius: Utils.getScreenScaleWidth(49) / 2, backgroundColor: "#3BD7B4",justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 16}}>确定</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
