import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { getDateAsStr, getDateColor } from '../../../utils/dateUtils'
import { Body, Icon, ListItem, Right, Text } from 'native-base'
import { human, iOSColors } from 'react-native-typography'
import ProgressCircle from 'react-native-progress-circle'
import { palette } from '../ColorIndicator/ColorIndicator'

const CheckboxListItem = (props) => {
    const { isCompleted = false, onComplete, onBodyClick, text, noteText, date, checkboxColor = iOSColors.white, progress = 0 } = props
    const isChecked = isCompleted || progress === 100

    const formattedDueDate = getDateAsStr(date)
    const dateColor = getDateColor(date, isChecked)

    const checkboxBgColor = checkboxColor && palette[checkboxColor] ? palette[checkboxColor] : iOSColors.white
    const checkboxMarkColor = checkboxBgColor ? iOSColors.white : iOSColors.gray

    return (
        <ListItem noIndent noBorder style={{ backgroundColor: iOSColors.white }} onPress={onBodyClick}>
            <TouchableOpacity onPress={onComplete}>
                <ProgressCircle
                    percent={progress}
                    radius={13}
                    borderWidth={3}
                    shadowColor={iOSColors.midGray}
                    bgColor={checkboxBgColor}
                    color={iOSColors.gray}
                >
                    {isChecked && <Icon name='md-checkmark' style={{ fontWeight: 'bold', lineHeight: 18, fontSize: 18, color: checkboxMarkColor }}/>}
                </ProgressCircle>
            </TouchableOpacity>
            <Body style={{ marginLeft: 10 }}>
                <Text style={isChecked ? styles.strikeText : {}}>{text}</Text>
                {formattedDueDate && <Text style={[styles.date, { color: dateColor }]}>{formattedDueDate}</Text>}
                {noteText && <Text style={styles.note}>{noteText}</Text>}
            </Body>
            <Right style={{ marginRight: 10 }}>
                <Icon name="ios-arrow-forward"/>
            </Right>
        </ListItem>
    )
}

export default CheckboxListItem

const styles = StyleSheet.create({
    note: {
        ...human.caption2Object,
        color: iOSColors.gray
    },
    date: {
        ...human.caption2Object,
        color: iOSColors.red
    },
    strikeText: {
        color: iOSColors.gray,
        textDecorationLine: 'line-through'
    }
})