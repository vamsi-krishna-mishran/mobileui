import React from 'react'
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { HStack, IconButton, Button } from 'native-base'
import { Ionicons } from '@expo/vector-icons';
import AddImage from './AddImage';
import Description from './Description';


function BareBoard()
{
    return (
        <ScrollView>
            <Text style={{ alignSelf: 'center', color: "rgba(0,0,255,0.4)", fontWeight: 'bold' }}>Uploaded Images</Text>
            <Image style={{ marginTop: 10, borderRadius: 20, alignSelf: 'center', width: 330, height: 350 }} source={require('../assets/attendance.jpg')} />
            <AddImage />
            <Description />
            <HStack justifyContent="center" m={2} space={3}>

                <TouchableOpacity>
                    <Button block leftIcon={<Ionicons name="save" size={18} color="rgba(0,0,255,0.5)" />} style={styles.buttonS} _text={{ fontWeight: "bold", fontSize: 18, color: "rgba(0,0,255,0.5)" }}> Save</Button>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button block leftIcon={<Ionicons name="create" size={20} color="rgba(0,0,255,0.5)" />} style={styles.buttonS} _text={{ fontWeight: "bold", fontSize: 18, color: "rgba(0,0,255,0.5)" }}> Edit</Button>
                </TouchableOpacity>
            </HStack>
        </ScrollView>
    )
}

export default BareBoard

const styles = StyleSheet.create({
    buttonS: {
        backgroundColor: '#e4e4e4',
        borderRadius: 50,
    },
    buttonE: {

    }

})
