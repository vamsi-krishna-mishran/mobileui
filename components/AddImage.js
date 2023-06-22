import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper'
import { PermissionStatus } from 'expo-image-picker';


function AddImage({ setImage, edit })
{
    const [hasPermission, setPermission] = useState(false);
    useEffect(() =>
    {
        (async () =>
        {
            const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setPermission(status === PermissionStatus.GRANTED);
        })()
    }, [])
    const pickImageAsync = async () =>
    {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            base64: true
        });


        if (!result.canceled)
        {
            setImage(result.assets[0].base64);

        } else
        {
            alert('You did not select any image.');
        }
    };
    return (
        <View style={{ alignItems: 'center' }}>
            <Button mode="contained" icon="folder" style={{ width: 150, margin: 5 }} onPress={pickImageAsync} disabled={edit}>Select Image</Button>
        </View>
    )
}

export default AddImage