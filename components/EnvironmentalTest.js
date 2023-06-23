import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { HStack, ScrollView, Box } from 'native-base'
import { TextInput, Card, Button } from 'react-native-paper'
import Description from './Description'
import SnackbarT from './Snackbar';
import { DescSkeleton, Imageskeleton, SaveEditSkeleton } from './BareBoardSkeleton'

function EnvironmentalTest()
{
    const [data, setData] = useState(["", "", ""]);
    const [edit, setEdit] = useState(true);
    const [desc, setDesc] = useState("");
    const [err, setErr] = useState("");
    const [snackbar, setSnack] = useState(false);
    const [loading, setloading] = useState(true);

    useEffect(() =>
    {
        (
            async () =>
            {
                setloading(true);
                // await new Promise((resolve, reject) =>
                // {
                //     setTimeout(() => resolve(), 10000)
                // })
                let res = await fetch('https://webapifluent20230616160256.azurewebsites.net/api/BareBoard?IBoardType=Environmental&Id=1');
                if (res.status === 200)
                {
                    let res2 = await res.json();
                    setData([res2.imageName].concat(res2.imageData.split(";")));
                    setDesc(res2.description);
                    setloading(false);
                }
                else
                {
                    setDesc("");

                    setloading(false);

                }
            }
        )();
    }, [])

    const upload = async () =>
    {
        if (data.some(el => el == "" || el == false))
        {
            setErr(prev => ({ ...prev, data: "Ambient, Sys, FPA should not be empty", state: false }))
            setSnack(true);
        }
        else if (desc == "" || desc == false)
        {
            setErr(prev => ({ ...prev, data: "Remark should not be empty", state: false }))
            setSnack(true);
        }
        else
        {
            await uploadasync();
            setEdit(true);

        }
    }
    const uploadasync = async () =>
    {
        try
        {
            setErr(prev => ({ ...prev, data: "uploading details...", state: true }))
            setSnack(true);
            let res = await fetch('https://webapifluent20230616160256.azurewebsites.net/api/BareBoard', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ImageName: data[0], "Description": desc, BoardType: "Environmental", "ImageData": data[1] + ";" + data[2], IId: 1 })

            });
            if (res.status === 200)
            {
                setErr(prev => ({ ...prev, data: "uploaded successfully.", state: true }))
                setSnack(true);
            }
            else
            {
                setErr(prev => ({ ...prev, data: "uploading Failed...", state: false }))

                setSnack(true);
            }
        }
        catch (err)
        {
            setErr(prev => ({ ...prev, data: err, state: false }))
            setSnack(true);
        }
    }
    if (loading)
    {
        return (
            <Box marginTop={8}>
                <Imageskeleton height={130} showButton={false} />
                <DescSkeleton />
                <SaveEditSkeleton />
            </Box>
        )
    }
    return (
        <ScrollView>
            <Card style={{ marginTop: 40 }} mode='elevated' width="92%" alignSelf="center" >
                <HStack justifyContent="space-between" p="5">
                    <Text style={{ paddingLeft: 10, alignSelf: 'center', flex: 7, fontWeight: "bold" }} disabled={edit}>Ambient</Text>
                    <Text style={{ flex: 5, fontWeight: "bold" }} disabled={edit}>SYS</Text>
                    <Text style={{ flex: 5, fontWeight: "bold" }} disabled={edit}>FPA</Text>
                </HStack>
                <HStack space={2} p="5" alignItems="center">
                    <TextInput style={{ flex: 5, height: 40 }} disabled={edit} value={data[0]} onChangeText={text => setData(prev => { const p = [...prev]; p[0] = text; return p })}></TextInput>
                    <TextInput style={{ flex: 5, height: 40 }} disabled={edit} value={data[1]} onChangeText={text => setData(prev => { const p = [...prev]; p[1] = text; return p })}></TextInput>
                    <TextInput style={{ flex: 5, height: 40 }} disabled={edit} value={data[2]} onChangeText={text => setData(prev => { const p = [...prev]; p[2] = text; return p })}></TextInput>
                </HStack>
            </Card>
            <Box style={{ marginVertical: 10 }}>
                <Description view={false} edit={edit} desc={desc} setDesc={setDesc} />
            </Box>
            <HStack justifyContent="center" m={2} space={3}>
                <TouchableOpacity>
                    <Button mode="contained" name='save' disabled={edit} onPress={upload}  > Save</Button>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button style={{ borderColor: "#592E73" }} mode="outlined" onPress={() => setEdit(false)} > Edit</Button>
                </TouchableOpacity>
            </HStack>
            <SnackbarT data={err} visible={snackbar} setVisibile={setSnack} />
        </ScrollView>
    )
}

export default EnvironmentalTest