import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker';


function AddImage()
{
    const [hasPermission, setPermission] = useState(false);

    useEffect(() =>
    {
        (async () =>
        {
            const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setPermission(status === "granted");
        })()
    }, [])
    const pickImageAsync = async () =>
    {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled)
        {
            console.log(result);
        } else
        {
            alert('You did not select any image.');
        }
    };
    return (
        <View>
            <Button onPress={pickImageAsync}>Select Image</Button>
        </View>
    )
}

export default AddImage