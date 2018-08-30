import React from 'react'
import { View } from 'react-native'
import styles from './ColorIndicator.styles'

const palette = {
    red: '#C25B56',
    orange: '#FFAE5D',
    blue: '#96C0CE',
    deepBlue: '#336699',
    purple: '#6F3662'
}

export const ColorIndicator = (props) => {
    const { color, styler } = props
    return <View style={[styles.colorTagCircle, color ? { backgroundColor: palette[color] } : {}, styler]}/>
}

export default ColorIndicator