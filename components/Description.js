import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'

function Description({ edit, desc, setDesc })
{
    return (
        <View style={{ marginVertical: 3, flex: 1, alignItems: 'center' }}>
            <TextInput style={{ width: "90%" }} mode="flat" placeholder='Enter remarks' label="Remark" value={desc} onChangeText={text => setDesc(text)} disabled={edit}>
            </TextInput>
        </View>
    )
}

export default Description