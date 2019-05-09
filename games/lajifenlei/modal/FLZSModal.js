/**
 * Created by wengcheng on 2018/11/27 .
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Modal, 
    TouchableOpacity
} from 'react-native';
const close = require("../res/drawable/close_modal_img.png")
import DataSource from '../common/DataSource';
import Utils from '../common/Utils';


export default class FLZSModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }

    show() {
        this.setState({
            visible: true,
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
                    <View style={{ backgroundColor: 'white', width: DataSource.width - Utils.getScreenScaleWidth(66), alignItems: 'center', padding: 20, alignItems: 'stretch', borderRadius: 4 }}>
                        <Text style={{ color: '#333333', fontSize: 21, fontWeight: "500", textAlign: 'center' }}>分类知识</Text>
                        <Text style={{ color: '#333333', fontSize: 16, fontWeight: "500", marginTop: 24 }}>可回收垃圾</Text>
                        <Text style={{ color: '#333333', fontSize: 15, marginTop: 14, lineHeight: 18 }}>主要包括废纸、塑料、玻璃、金属和布料五大类。</Text>
                        <Text style={{ color: '#333333', fontSize: 16, fontWeight: "500", marginTop: 15 }}>厨余垃圾</Text>
                        <Text style={{ color: '#333333', fontSize: 15, marginTop: 14, lineHeight: 18 }}>包括剩菜剩饭、骨头、菜根菜叶、果皮等食品类废物。</Text>
                        <Text style={{ color: '#333333', fontSize: 16, fontWeight: "500", marginTop: 15 }}>有毒有害垃圾</Text>
                        <Text style={{ color: '#333333', fontSize: 15, marginTop: 14, lineHeight: 18 }}>含有对人体健康有害的重金属、有毒的物质或者对环境造成现实危害或者潜在危害的废弃物。</Text>
                        <Text style={{ color: '#333333', fontSize: 16, fontWeight: "500", marginTop: 15 }}>其他垃圾</Text>
                        <Text style={{ color: '#333333', fontSize: 15, marginTop: 14, lineHeight: 18 }}>括除上述几类垃圾之外的砖瓦陶瓷、渣土、卫生间废纸、纸巾等难以回收的废弃物及果壳、尘土、食品袋（盒）。</Text>

                    </View>
                    <TouchableOpacity onPress={() => {
                        this.hide()
                    }}>
                        <Image style={{
                            width: Utils.getScreenScaleWidth(40),
                            height: Utils.getScreenScaleWidth(40),
                            marginTop: Utils.getScreenScaleWidth(40)
                        }} source={close} /></TouchableOpacity>
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
