import React, { PureComponent } from 'react'
import { Button, Form, Icon, Input, Item } from 'native-base'
import { View } from 'react-native'

// animate clear button
class QuickInput extends PureComponent {

    state = { value: '' }

    render() {
        const { placeholder } = this.props
        const { value } = this.state

        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 8 }}>
                <Form style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Item rounded>
                        <Input
                            onChangeText={value => this.setState({ value })}
                            value={value}
                            onSubmitEditing={this.onSubmitEditing}
                            returnKeyType={'done'}
                            placeholder={placeholder}/>
                        {Boolean(value) && <Button transparent rounded danger onPress={this.clearValue} style={{ alignSelf: 'center' }}>
                            <Icon type='MaterialCommunityIcons' name='close-circle-outline'/>
                        </Button>}
                    </Item>
                </Form>
            </View>
        )
    }

    clearValue = () => {
        this.setState({ value: '' })
    }

    onSubmitEditing = () => {
        const { onSubmitEditing } = this.props
        const { value } = this.state
        const trimmed = value.trim()
        if (trimmed !== '') {
            onSubmitEditing(trimmed)
        }
        this.clearValue()
    }
}

export default QuickInput
