import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import MultiSelectComponent from './Dropdown'
import { HStack, Tooltip } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Model from './Model';

function FunctionalTest()
{
    const [data, setData] = useState("");
    const [hid, setHid] = useState("")
    const [shid, setSHid] = useState("")
    const [showModal, setShowModal] = useState(false);
    const AddHeading = (name, id) =>
    {
        console.log(id);
    }
    const AddSubHeading = (name, id) =>
    {

        console.log(id);
    }
    const showModel = (type) =>
    {
        if (type == 1)
            setShowModal(true);
        else if (type == 2)
            setShowModal(true);
    }
    return (
        <ScrollView>
            <HStack w="100%" mt={4} ml={5} space={8} alignContent="space-between" >
                <HStack>
                    <Text style={{ fontWeight: 'bold' }} >Choose Heading</Text>
                    <TouchableOpacity onPress={() => showModel(1)}>
                        {/* <Tooltip label="New Heading" openDelay={200}> */}
                        <Ionicons paddingTop={2} size={18} paddingLeft={4} name="add-circle-sharp"></Ionicons>

                        {/* </Tooltip> */}
                    </TouchableOpacity>
                </HStack>
                <HStack>
                    <Text style={{ fontWeight: "bold", paddingLeft: 8 }}>Choose Sub Heading</Text>
                    <TouchableOpacity onPress={() => showModel(2)}>
                        <Ionicons paddingTop={2} size={18} paddingLeft={4} name="add-circle-sharp"></Ionicons>
                    </TouchableOpacity>
                </HStack>
            </HStack>
            <HStack mt={-4}>
                <MultiSelectComponent selected={hid} setSelected={() => { }} setid={setHid} />
                <MultiSelectComponent selected={shid} setSelected={() => { }} setid={setSHid} />
            </HStack>
            <Model data={data} setData={setData} showModal={showModal} setShowModal={setShowModal} />

        </ScrollView>
    )
}

export default FunctionalTest