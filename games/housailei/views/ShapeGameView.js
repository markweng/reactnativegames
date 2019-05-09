/**
 * Created by wengcheng on 2018/12/28 .
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import DataSource from "../common/DataSource";
import Utils from "../common/Utils";

const banana = require("../res/drawable/icon_banana.png")
const man = require("../res/drawable/icon_man_xingxing.png")
const woman = require("../res/drawable/icon_woman_xingxing.png")

const length = Utils.isIpad()?DataSource.width - Utils.getScreenScaleWidth(80) : DataSource.width - 36
const itemwidth = (length - 50) / 4

export default class ShapeGameView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numbers: this.props.numbers || this.createData(this.props.level)
        }
        this.isLose = false
        this.isStart = false
        this.temp = 0

    }

    shuffle(arr) {
        let m = arr.length, i;
        while (m) {
            i = (Math.random() * m--) >>> 0;
            [arr[m], arr[i]] = [arr[i], arr[m]]
        }
        return arr;
    }

    gameStart(memoryContent) {
        this.temp = 0
        this.memoryContent = memoryContent
        this.state.numbers = this.createData(this.props.level)
        this.isLose = false
        let tempNumbers = this.state.numbers
        for (let i = 0; i < tempNumbers.length; i++) {
            if (tempNumbers[i].num > 0) tempNumbers[i].state = 0
        }
        this.setState({
            numbers: tempNumbers
        })
    }

    createData(level) {

        let numarr = []
        let result = []
        switch (level) {
            case 1 : {
                numarr = [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
                numarr = this.shuffle(numarr)
                for (let i = 0; i < numarr.length; i++) {
                    let num = numarr[i]
                    result.push({num: num, state: 1})
                }
            }
                break
            case 2 : {
                numarr = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
                numarr = this.shuffle(numarr)
                for (let i = 0; i < numarr.length; i++) {
                    let num = numarr[i]
                    result.push({num: num, state: 1})
                }
            }
                break
            case 3 : {
                numarr = [1, 1, 1, 1, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,]
                numarr = this.shuffle(numarr)
                for (let i = 0; i < numarr.length; i++) {
                    let num = numarr[i]
                    result.push({num: num, state: 1})
                }
            }
                break
            case 4 : {
                numarr = [1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0,]
                numarr = this.shuffle(numarr)
                for (let i = 0; i < numarr.length; i++) {
                    let num = numarr[i]
                    result.push({num: num, state: 1})
                }
            }
                break
            case 5 : {
                numarr = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 0, 0, 0, 0,]
                numarr = this.shuffle(numarr)
                for (let i = 0; i < numarr.length; i++) {
                    let num = numarr[i]
                    result.push({num: num, state: 1})
                }
            }
                break
            case 6 : {
                numarr = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 0,]
                numarr = this.shuffle(numarr)
                for (let i = 0; i < numarr.length; i++) {
                    let num = numarr[i]
                    result.push({num: num, state: 1})
                }
            }
                break
        }
        return result
    }

    showRightResult() {
        let tempNumbers = this.state.numbers
        for (let i = 0; i < tempNumbers.length; i++) {
            if (tempNumbers[i].num > 0 && tempNumbers[i].state !== -1) tempNumbers[i].state = 0
        }
        this.setState({
            numbers: tempNumbers
        })
    }

    hideNumber() {
        this.isStart = true
        let tempNumbers = this.state.numbers
        for (let i = 0; i < tempNumbers.length; i++) {
            tempNumbers[i].state = 1
        }
        this.setState({
            numbers: tempNumbers
        })
    }

    render() {
        let arr = this.state.numbers
        return (
            <View style={styles.container}>
                {arr.map((data, index) => {
                    let image = null
                    switch (data.num) {
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

                    return <TouchableWithoutFeedback key={index + ''}
                                                     onPress={this.didFocusItem.bind(this, data, index)}>
                        <View
                            style={[styles.item, {backgroundColor: data.state < 0 ? '#EE8155' : '#FAF3E5'}
                            ]}>
                            {data.state === 1 ? null : <Image style={{width:itemwidth,height:itemwidth}} source={image}/>}
                        </View>
                    </TouchableWithoutFeedback>
                })}
            </View>
        );
    }

    didFocusItem(data, index) {
        if (this.isLose || !this.isStart) return

        if (data.num > 0 && (this.memoryContent && this.props.memoryContent.length === 1 && data.num == this.memoryContent[0]) || (this.props.memoryContent && this.props.memoryContent.length === 2 && ( data.num == this.props.memoryContent[0] || data.num == this.props.memoryContent[1]))) {
            let tempNumbers = this.state.numbers
            if (tempNumbers[index].state === 0) return
            tempNumbers[index].state = 0
            this.setState({
                numbers: tempNumbers
            })
            this.temp++
            if (this.temp === this.getRecoverNum()) {
                this.props.handle && this.props.handle(true)
                this.isStart = false
                return
            }
        } else {

            let tempNumbers = this.state.numbers
            if (tempNumbers[index].state === 0) return
            this.isLose = true
            tempNumbers[index].state = -1
            this.setState({
                numbers: tempNumbers
            })
            this.showRightResult()
            this.props.handle && this.props.handle(false)
            this.isStart = false
        }
    }
    getRecoverNum() {
        switch (this.props.level) {
            case 1:
                return 4
            case 2:
                return 5
            case 3:
                return 4
            case 4:
                return 5
            case 5:
                return 8
            case 6:
                return 10
        }

    }

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        marginTop: Utils.getScreenScaleWidth(19),
        width: length,
        height: length,
        backgroundColor: '#D6CEB3',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        width: itemwidth,
        height: itemwidth,
        marginLeft: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 48
    }
});
