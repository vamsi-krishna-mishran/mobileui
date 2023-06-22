import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect, Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';



const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const MultiSelectComponent = ({ singleselect = true, selected, setSelected, setid }) =>
{

    if (singleselect)
    {
        return <View style={styles.container}>
            <Dropdown
                containerStyle={{ backgroundColor: "#E8E4E4", color: "#f0f0f0" }}
                maxHeight={250}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select product *"
                searchPlaceholder="Search..."
                value={selected}
                onChange={item =>
                {
                    setid(item);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
                selectedStyle={styles.selectedStyle}
            />
        </View>
    }
    return (
        <View style={styles.container}>
            <MultiSelect
                containerStyle={{ backgroundColor: "#E8E4E4" }}
                maxHeight={250}
                style={{
                    width: 300,
                    paddingLeft: 10,
                    height: 40,
                    backgroundColor: 'transparent',
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.5,
                }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                search
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select Boards *"
                searchPlaceholder="Search..."
                value={selected}
                onChange={item =>
                {
                    setSelected(item);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
                selectedStyle={styles.selectedStyle}
            />
        </View>
    );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
        width: 140,
        height: 40,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 12,
        color: "rgba(9,9,9,0.8)",

    },
    selectedTextStyle: {
        fontSize: 12,
        color: "rgba(9,9,9,0.4)"
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 30,
        fontSize: 12,
    },
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 12,
    },
});