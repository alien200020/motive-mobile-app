import React, { PureComponent } from 'react'
import { View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Button, Icon } from 'native-base'
import { translate } from 'react-i18next'
import styles from './DueDatePicker.styles'
import { formatDateInCurrentLocale, getFormatFromCurrentLocale, parseDateInCurrentLocale } from '../../../utils/dateFormat'
import { locale } from '../../../utils/locale'
import type { T } from '../../../types/Types'
import { Moment } from 'moment'

type DueDatePickerProps = {|
    value: Moment,
    onChangeDate: string => void,
    t: T
|}

type DueDatePickerState = {|
    dateAsStringInLocalFormat: string
|}

class DueDatePicker extends PureComponent<DueDatePickerProps, DueDatePickerState> {

    constructor(props: DueDatePickerProps) {
        super(props)
        const { value } = props
        this.state = { dateAsStringInLocalFormat: formatDateInCurrentLocale(value) }
    }

    render() {
        const { t } = this.props
        const { dateAsStringInLocalFormat } = this.state

        const { dateInput, dateTouchBody, dateText, placeholderText, btnTextConfirm, container, datePickerContainer } = styles

        return (
            <View style={container}>
                <DatePicker
                    showIcon={false}
                    customStyles={{ dateInput, dateTouchBody, dateText, placeholderText, btnTextConfirm }}
                    style={datePickerContainer}
                    date={dateAsStringInLocalFormat}
                    mode='date'
                    placeholder={t('placeholders.whenIsItDue')}
                    locale={locale()}
                    format={getFormatFromCurrentLocale()}
                    confirmBtnText={t('labels.set')}
                    cancelBtnText={t('labels.cancel')}
                    iconComponent={<Icon type='MaterialCommunityIcons' name='calendar-blank'/>}
                    onDateChange={dateAsStringInLocalFormat => this.handleDateChange(dateAsStringInLocalFormat)}
                />
                {Boolean(dateAsStringInLocalFormat) && <Button transparent rounded danger onPress={this.clearDate} style={{ alignSelf: 'center' }}>
                    <Icon type='MaterialCommunityIcons' name='close-circle-outline'/>
                </Button>}
            </View>
        )
    }

    handleDateChange = dateAsStringInLocalFormat => {
        const { onChangeDate } = this.props
        const endOfToday = parseDateInCurrentLocale(dateAsStringInLocalFormat).endOf('day')
        this.setState({ dateAsStringInLocalFormat: formatDateInCurrentLocale(endOfToday) })
        onChangeDate(endOfToday)
    }

    clearDate = () => {
        const { onChangeDate } = this.props
        this.setState({ dateAsStringInLocalFormat: '' })
        onChangeDate(null)
    }
}

export default translate('translations')(DueDatePicker)
