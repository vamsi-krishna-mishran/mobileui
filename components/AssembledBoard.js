import * as React from 'react';
import { DataTable, Button, Card, TextInput } from 'react-native-paper';
import { StyleSheet, Image, View, Text, FlatList } from 'react-native';
import { Divider, HStack, ScrollView, Box, Radio } from 'native-base';
import AddImage from './AddImage';
import Description from './Description';
import MultiSelectComponent from './Dropdown';
import { RadioButton } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
const data = ['Mounting Alignment',
    'Component Mounting',
    'Component Damaged',
    'Solder Smear',
    'Solder Spill',
    'PCB Damage',
    'Assembly Cleanliness']
const status = ['pass', 'fail', 'rework']
const AssembledBoard = () =>
{
    const [status, Setstatus] = React.useState([1, 1, 1, 1, 1, 1, 1]);
    React.useEffect(() =>
    {
        console.log(status);
    }, [status])
    return (
        // <Box style={{ marginBottom: 200 }} safeAreaBottom>
        <ScrollView style={{ marginBottom: 80 }}>
            <Image style={{ marginTop: 10, borderRadius: 20, alignSelf: 'center', width: 330, height: 350 }} source={false ? { uri: `data:image/png;base64 ` } : require('../assets/notfound.jpg')} />
            <HStack justifyContent="center" space={5}>
                <AddImage />
                <Button style={{ height: 40, marginTop: 5 }} mode="contained" icon="delete" >Delete</Button>
            </HStack>
            <DattaTable status={status} setStatus={Setstatus} />
            <Button icon="file" >Save</Button>
        </ScrollView>

    );
}

export default AssembledBoard;
const styles = StyleSheet.create({

});
const DattaTable = ({ status, setStatus }) => (

    <View style={{ marginBottom: 10 }}>
        <Card mode='elevated' width="96%" alignSelf="center">
            <HStack justifyContent="space-between" p="5">
                <Text style={{ flex: 5 }}>Type</Text>
                <Text style={{ flex: 5 }}>Status</Text>
                <Text style={{ flex: 5 }}>Remark</Text>
            </HStack>
            {data.map((element, index) => (<MyComponent status={status[index]} setStatus={(id) => setStatus(prev =>
            {
                const updatedStatus = [...prev]; // Create a copy of the array
                updatedStatus[index] = id; // Modify the element at the specified index
                return updatedStatus;
            })} el={element} key={index} />))}
        </Card>
    </View>
)

const MyComponent = ({ el, status, setStatus }) =>
{
    return (
        <HStack p="5" alignItems="center">
            <Text style={{ flex: 5 }}>{el}</Text>
            <View style={{ flex: 6, flexDirection: 'row' }}>
                <RadioButton
                    value={1}
                    color="green"
                    status={status == 1 ? 'checked' : 'unchecked'}
                    onPress={() => { setStatus(1) }}
                />
                <RadioButton
                    value={2}
                    color="orange"
                    status={status == 2 ? 'checked' : 'unchecked'}
                    onPress={() => { setStatus(2) }}
                />
                <RadioButton
                    value={3}
                    color="red"
                    status={status == 3 ? 'checked' : 'unchecked'}
                    onPress={() => { setStatus(3) }}
                />
            </View>
            <TextInput style={{ flex: 5, height: 40 }}></TextInput>
        </HStack>
    );
};


