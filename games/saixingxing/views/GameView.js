/**
 * Created by wengcheng on 2018/11/26 .
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

const length = Utils.isIpad()?DataSource.width - Utils.getScreenScaleWidth(80) : DataSource.width - 36
const itemwidth = (length - 40) / 3
const icon = require('../res/drawable/center_logo.png')

export default class GameView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numbers: this.props.numbers || this.createData(this.props.level)
        }
        this.temp = 0
        this.isLose = false
        this.isStart = false
    }


    shuffle(arr) {
        let m = arr.length, i;
        while (m) {
            i = (Math.random() * m--) >>> 0;
            [arr[m], arr[i]] = [arr[i], arr[m]]
        }
        return arr;
    }

    gameStart() {
        this.temp = 0
        this.state.numbers = this.createData(this.props.level)
        this.isLose = false
        let tempNumbers = this.state.numbers
        for (let i = 0; i < tempNumbers.length; i++) {
            if (tempNumbers[i].num > 0) tempNumbers[i].state = 1
        }
        this.setState({
            numbers: tempNumbers
        })
    }

    hideNumber() {
        this.isStart = true
        let tempNumbers = this.state.numbers
        for (let i = 0; i < tempNumbers.length; i++) {
            tempNumbers[i].state = 0
        }
        this.setState({
            numbers: tempNumbers
        })
    }

    showRightResult() {
        let tempNumbers = this.state.numbers
        for (let i = 0; i < tempNumbers.length; i++) {
            if (tempNumbers[i].num > 0 && tempNumbers[i].state !== -1) tempNumbers[i].state = 1
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
                numarr = [1, 2, 3, 4, 5, 0, 0, 0, 0]
                numarr = this.shuffle(numarr)
                for (let i = 0; i < numarr.length; i++) {
                    let num = numarr[i]
                    result.push({num: num, state: 0})
                }
            }
                break
            case 2 : {
                numarr = [1, 2, 3, 4, 5, 6, 0, 0, 0]
                numarr = this.shuffle(numarr)
                for (let i = 0; i < numarr.length; i++) {
                    let num = numarr[i]
                    result.push({num: num, state: 0})
                }
            }
                break
            case 3 : {
                numarr = [1, 2, 3, 4, 5, 6, 7, 0, 0]
                numarr = this.shuffle(numarr)
                for (let i = 0; i < numarr.length; i++) {
                    let num = numarr[i]
                    result.push({num: num, state: 0})
                }
            }
                break
            case 4 : {
                numarr = [1, 2, 3, 4, 5, 6, 7, 8, 0]
                numarr = this.shuffle(numarr)
                for (let i = 0; i < numarr.length; i++) {
                    let num = numarr[i]
                    result.push({num: num, state: 0})
                }
            }
                break
            case 5 : {
                numarr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                numarr = this.shuffle(numarr)
                for (let i = 0; i < numarr.length; i++) {
                    let num = numarr[i]
                    result.push({num: num, state: 0})
                }
            }
                break
        }
        return result
    }

    didFocusItem(data, index) {

        if (this.isLose || !this.isStart) return

        if (data.num === this.temp + 1) {
            let tempNumbers = this.state.numbers
            tempNumbers[index].state = tempNumbers[index].num === 0 ? 0 : 1
            this.setState({
                numbers: tempNumbers
            })
            this.temp++
            if (this.temp === this.props.level + 4) {
                this.props.handle && this.props.handle(true)
                this.isStart = false
                return
            }
        } else {

            let tempNumbers = this.state.numbers
            if (tempNumbers[index].num === 0 || tempNumbers[index].state === 1) return
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

    render() {

        let arr = this.state.numbers
        return (
            <View style={styles.container}>
                {arr.map((data, index) => {

                    return <TouchableWithoutFeedback key={index + ''}
                                                     onPress={this.didFocusItem.bind(this, data, index)}>
                        <View
                            style={[styles.item, {backgroundColor: data.state > 0 ? '#F3B73D' : (data.state < 0 ? '#EE8155' : '#FAF3E5')}
                            ]}>
                            {data.num === -1 ? <Image style={{width:100,height:100}} source={icon}/> : <Text style={styles.text}> {data.state === 0 ? '' : data.num}</Text>}
                        </View>
                    </TouchableWithoutFeedback>
                })}
            </View>
        );
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
