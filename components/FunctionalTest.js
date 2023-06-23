import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView,FlatList,Item,SafeAreaView } from 'react-native'
import MultiSelectComponent from './Dropdown'
import { HStack, Tooltip,Box } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Model,{ImageModel} from './Model';
import SnackbarT from './Snackbar'
import {Button,Divider} from 'react-native-paper'
import Description from './Description'
import { Card } from 'react-native-paper';

function FunctionalTest()
{
    const[presentImages,setPresentImages]=useState(["onesklfjfklsjflfkjsf;kjk;fjdfg","two","three","onea","twob","threec","oned","twoe","threef","oneh","twoi","threej","onek","twol","threem"]);
    
    const [data, setData] = useState("");
    const [edit,setEdit]=useState(true);
    const [hid, setHid] = useState("")
    const [shid, setSHid] = useState("")
    const [showModal, setShowModal] = useState(false);
    const [err,setErr]=useState({});
    const [type,setType]=useState(1);//default heading.
    const[snackbar,setSnack]=useState(false);
    const [desc,setDesc]=useState(["",""])
    const [remark,setRemark]=useState(["",""])
    const[showImage,setShowImage]=useState({show:false,uri:""});
    const AddHeading =async (data) =>
    {
        setErr(prev => ({ ...prev, data: "uploading details...", state: true }))
        setSnack(true);
        let res = await fetch('https://webapifluent20230616160256.azurewebsites.net/api/BareBoard', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
           // body: JSON.stringify({ ImageName: data[0], "Description": desc, BoardType: "Environmental", "ImageData": data[1] + ";" + data[2], IId: 1 })

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
    const upload=async ()=>{
        if(hid===""|| shid===""){
            setErr(prev => ({ ...prev, data: "Heading and Subheading should not be empty.", state: false }))
            setSnack(true);
        }
        else if(desc.some(el=>el==="")){
            setErr(prev => ({ ...prev, data: "Descriptions should not be empty", state: false }))
            setSnack(true);
        }
        else if(remark.some(el=>el==="")){
            setErr(prev => ({ ...prev, data: "Remarks should not be empty", state: false }))
            setSnack(true);
        }
        else{
           // await uploadAsync();
            setEdit(true);
        }
        
    }
    const uploadAsync=async()=>{
        //code goes here of apis.
    }
    const showModel = (type) =>
    {
        if (type == 1){
            setType(1);
            setShowModal(true);
        }
        else if (type == 2){
            setType(2);
            setShowModal(true);
        }
    }
    return (
        <ScrollView >
            <HStack w="100%" mt={4} ml={5} space={8} alignContent="space-between" >
                <HStack>
                    <Text style={{ fontWeight: 'bold' }} >Choose Heading</Text>
                    <TouchableOpacity onPress={() => showModel(1)} disabled={edit}>
                        {/* <Tooltip label="New Heading" openDelay={200}> */}
                        <Ionicons paddingTop={2} size={18} paddingLeft={4} name="add-circle-sharp"></Ionicons>

                        {/* </Tooltip> */}
                    </TouchableOpacity>
                </HStack>
                <HStack>
                    <Text style={{ fontWeight: "bold", paddingLeft: 8 }}>Choose Sub Heading</Text>
                    <TouchableOpacity onPress={() => showModel(2)} disabled={edit}>
                        <Ionicons paddingTop={2} size={18} paddingLeft={4} name="add-circle-sharp"></Ionicons>
                    </TouchableOpacity>
                </HStack>
            </HStack>
            <HStack mt={-4}>
                <MultiSelectComponent edit={edit} selected={hid} setSelected={() => { }} setid={setHid} />
                <MultiSelectComponent edit={edit} selected={shid} setSelected={() => { }} setid={setSHid} />
            </HStack>
            <Card style={{padding:10,width:"96%",alignSelf:'center'}}>
            <Text style={{ fontWeight: "bold", paddingLeft: 20 }}>Desc. of Heading</Text>
            <Description edit={edit} desc={desc[0]} setDesc={(value)=>setDesc(prev=>{let p=[...prev];p[0]=value;return p})}  label="Description"/>
            <Text style={{ fontWeight: "bold", paddingLeft: 20 }}>Remark of Heading</Text>
            <Description edit={edit} desc={remark[0]} setDesc={(value)=>setRemark(prev=>{let p=[...prev];p[0]=value;return p})} />
            </Card>

            <Card style={{marginTop:10,padding:10,width:"96%",alignSelf:'center'}}>
            <Text style={{ fontWeight: "bold", paddingLeft: 20 }}>Desc. of SubHeading</Text>
            <Description edit={edit} label="Description" setDesc={(value)=>setDesc(prev=>{let p=[...prev];p[1]=value;return p})} />
            <Text style={{ fontWeight: "bold", paddingLeft: 20 }}>Remark of SubHeading</Text>
            <Description edit={edit} setDesc={(value)=>setRemark(prev=>{let p=[...prev];p[1]=value;return p})} />
            </Card>
            <HStack space={2} style={{width:"96%",alignSelf:'center'}} mt={2}>
                <Card style={{height:150}} width="48%">
                    <Text style={{ fontWeight: "bold", paddingLeft: 20,paddingTop:10,paddingBottom:10 }}>Uploaded Sheets</Text>
                    <Divider/>
                   
                    <View style={{ height: 100 }}>
                        <ScrollView nestedScrollEnabled>
                        <FlatList
                            data={presentImages}
                            renderItem={({ item }) => <ListEl Display={(item)=>setShowImage(prev=>({...prev,show:true}))} edit={edit} title={item} />}
                            keyExtractor={item => item}
                        />
                            </ScrollView>
                        
                    </View>
                  
                </Card>
                <Card style={{height:150}} width="48%">
                    <Text style={{ fontWeight: "bold", paddingLeft: 20,paddingTop:10,paddingBottom:10 }}>Uploaded Images</Text>
                    <Divider/>
                </Card>
            </HStack>
            <HStack style={{paddingBottom:100}} justifyContent="center" m={4} space={3}>
                <TouchableOpacity>
                    <Button mode="contained" name='save' disabled={edit} onPress={upload}  > Save</Button>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button style={{ borderColor: "#592E73" }} mode="outlined" onPress={() => setEdit(false)} > Edit</Button>
                </TouchableOpacity>
            </HStack>
            
            <Model AddHeading={AddHeading} data={data} setData={setData} showModal={showModal} setShowModal={setShowModal} />
            <ImageModel showImage={showImage} setShowImage={setShowImage} />
            <SnackbarT data={err} visible={snackbar} setVisibile={setSnack} />
        </ScrollView>
    )
}

export default FunctionalTest

const ListEl=({title,edit,Display})=>{
    return (
        <>
        <Box>
             <HStack space={3}>
             <TouchableOpacity onPress={Display}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ padding: 5, paddingLeft: 25, fontWeight: 'bold', width: 125 }}>
                    {title}
                </Text>
             </TouchableOpacity>
             <TouchableOpacity disabled={edit}>
                <Ionicons style={{paddingTop:5}} color="red" size={20} name="close-outline"/>
                </TouchableOpacity>
                </HStack>
        </Box>
        </>
    )
}