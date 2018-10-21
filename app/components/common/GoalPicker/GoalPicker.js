import React, { Component } from 'react'
import { Icon, Picker } from 'native-base'
import { iOSColors } from 'react-native-typography'
import { Dimensions, PixelRatio, Platform, View } from 'react-native'

const mainTextColor = '#000'
const platform = Platform.OS
const deviceWidth = Dimensions.get('window').width
const variables = {
    // Icon
    textColor: mainTextColor,
    iconFamily: 'Ionicons',
    iconFontSize: platform === 'ios' ? 30 : 28,
    iconHeaderSize: platform === 'ios' ? 33 : 24,
    inputFontSize: 17,
    inputBorderColor: iOSColors.customGray,
    inputSuccessBorderColor: '#2b8339',
    inputErrorBorderColor: '#ed2f2f',
    inputHeightBase: 30,
    get inputColor() {
        return this.textColor
    },
    get inputColorPlaceholder() {
        return '#575757'
    },
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1)
}
class GoalPicker extends Component {

    render() {
        const { selectedValue, onValueChange } = this.props

        return (
            <View style={{
                backgroundColor: iOSColors.customGray,
                borderWidth: variables.borderWidth * 2,
                borderTopWidth: variables.borderWidth * 4,
                borderRadius: 10,
                borderColor: variables.inputBorderColor }}>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" style={{
                        height: 30,
                        width: 30,
                        paddingLeft: 30 / 4,
                        fontSize: 20,
                        marginRight: 0
                    }}/>}
                    placeholder="Task is part of goal?"
                    placeholderStyle={{
                        color: variables.inputColorPlaceholder
                    }}
                    placeholderIconColor="#007aff"
                    style={{
                        width: deviceWidth - 16 * 2,
                        paddingHorizontal: 5,
                        height: variables.inputHeightBase,
                        alignItems: 'center',
                        alignSelf: 'center',
                        paddingTop: 2
                    }}
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    headerStyle={{ backgroundColor: iOSColors.white }}
                    headerBackButtonTextStyle={{ color: iOSColors.pink }}
                    textStyle={{
                        paddingLeft: 5,
                        color: variables.inputColor,
                        fontSize: variables.inputFontSize
                    }}
                >
                    <Picker.Item label="Goal 3" value="key3" />
                    <Picker.Item label="Task is part of goal" value="key4" />
                </Picker>
            </View>
        )
    }
}


export default GoalPicker
