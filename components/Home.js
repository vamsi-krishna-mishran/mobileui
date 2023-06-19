import React from 'react'
import { View, Text } from 'react-native'

function Home({ navigation, route })
{
    const { name } = route.params;
    return (
        <View>
            <Text>Home {name} </Text>
        </View>
    )
}

export default Home