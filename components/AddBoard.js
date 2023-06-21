import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList, HStack, Avatar, VStack, Spacer, Box, Divider } from 'native-base'
import ProductBoard from './ProductBoard'
import BareBoard from './BareBoard'
import AssembledBoard from './AssembledBoard'
import PowerupTest from './PowerupTest'
import EnvironmentalTest from './EnvironmentalTest'
import FunctionalTest from './FunctionalTest'
import EOTest from './EOTest'
import CameraPicture from './CameraPicture'

function AddBoard()
{
    const data = [{ id: 1, name: "Product" },
    { id: 2, name: "Board" },
    { id: 3, name: "Bare Board Inspection" },
    { id: 4, name: "Assembled Board Inspection" },
    { id: 5, name: "PowerUp Test" },
    { id: 6, name: "Environmental Test" },
    { id: 7, name: "Functional Test" },
    { id: 8, name: "EO Test" },
    { id: 9, name: "Camera Picture" }
    ]
    const [current, setCurrent] = useState(1);
    const handleClick = (id) =>
    {
        setCurrent(id);

    }
    return (
        <View style={{ backgroundColor: 'rgba(0,0,255,0.1)', flex: 1 }}>
            <View>
                <FlatList backgroundColor="#f0f0f0" py={2} horizontal data={data} renderItem={({
                    item
                }) => <TouchableOpacity keyExtractor={item => item.id} onPress={() => handleClick(item.id)}><Text style={item.id == current ? styles.itemcurrent : styles.item}>{item.name}</Text></TouchableOpacity>} />
                {getcomponent(current)}
            </View>
        </View>
    )
}

export default AddBoard
const styles = StyleSheet.create({
    item: {
        marginHorizontal: 5,
        backgroundColor: "rgba(0,0,255,0.2)",
        padding: 10,
        borderRadius: 10,
    },
    itemcurrent: {
        backgroundColor: "rgba(0,0,255,0.6)",
        fontWeight: "bold",
        color: "white",
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 10,
    }
})

function getcomponent(id)
{
    switch (id)
    {
        case 1:
            return <ProductBoard />

        case 2:
            return <ProductBoard />

        case 3:
            return <BareBoard />
            break;
        case 4:
            return <AssembledBoard />
        case 5:
            return <PowerupTest />
        case 6:
            return <EnvironmentalTest />
        case 7:
            return <FunctionalTest />
        case 8:
            return <EOTest />
        case 9:
            return <CameraPicture />

    }
}