import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import {UploadType} from './UploadType'
import { PermissionStatus } from 'expo-image-picker';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Item,
  SafeAreaView,
} from "react-native";
import MultiSelectComponent from "./Dropdown";
import { HStack, Tooltip, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Model, { ImageModel } from "./Model";
import SnackbarT from "./Snackbar";
import { Button, Divider } from "react-native-paper";
import Description from "./Description";
import { Card } from "react-native-paper";
import { ListEl } from "./FunctionalTest";
import {
  HSubSkeleton,
  DescCardSkeleton,
  SaveEditSkeleton,
  UploadSheet,
} from "./BareBoardSkeleton";
import {API_URL} from "@env";

function EOTest() {
  const [presentImages, setPresentImages] = useState([
    "onesklfjfklsjflfkjsf;kjk;fjdfg",
    "two",
    "three",
    "onea",
    "twob",
    "threec",
    "oned",
    "twoe",
    "threef",
    "oneh",
    "twoi",
    "threej",
    "onek",
    "twol",
    "threem",
  ]);
  const [subheadings,setsubHeadings]=useState([]);

  const [loading, setloading] = useState({subhead:true,upimgs:true});
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(true);
  const [shid, setSHid] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [err, setErr] = useState({});
  const [snackbar, setSnack] = useState(false);
  const [descRemark, setDescRemark] = useState(["", ""]);
  const [showImage, setShowImage] = useState({ show: false, uri: "" });
  const loadSHeadings=async(id)=>{
    try{
      setloading(prev=>({...prev,subhead:true,upimgs:true}));
      const res = await fetch(`${API_URL}/api/SubHeading?Id=${id}`);
      if (res.status === 200) {
        let res3 = await res.json();
       // setsubHeadings(prev=>[...res3]);
        //subheadings.length=0;
      // res3.forEach(el=>subheadings.push(el));
     // console.log(res3);
         setsubHeadings(prev => [...res3]);
       // console.log(res3);
         setSHid(prev=>res3[0].id);
         setDescRemark(prev=>{let s=[...prev];s[0]=res3[0].description;s[1]=res3[0].remark;return s;})
         setloading(prev=>({...prev,subhead:false}));
        // alert(res3[0].id)
         fetchImageSheets("SubHeadingImages",res3[0].id);
         return res3[0].id;
      } else {
        //setloading(prev=>({...prev,subhead:false}));
        setloading(prev=>({subhead:false,upimgs:false}));
        return false;
      }
    }
    catch(err){
      setErr((prev) => ({
          ...prev,
          data: err.message,
          state: false,
        }));
        setSnack(true);
        setloading(prev=>({head:false,subhead:false,upsheets:false,upimgs:false}));
        return false;
    }
  }
  const fetchImageSheets=async(endpoint,shiid)=>{
    try{
      if(endpoint=="SubHeadingImages"){
        setloading(prev=>({...prev,upimgs:true}))

      }
      
      //alert(shid);
    //  alert(`${API_URL}/api/${endpoint}?Id=${shid}`);
    let res = await fetch(`${API_URL}/api/${endpoint}?Id=${shiid}`);
    if (res.status === 200) {
      let res2 = await res.json();
      //alert(res2.length);
      if(endpoint=="SubHeadingImages"){
       // alert(res2);
        setPresentImages(prev=>(res2));
        setloading(prev=>({...prev,upimgs:false}))
      }
     
    }
    else{
      if(endpoint=="SubHeadingImages")
      {
        setloading(prev=>({...prev,upimgs:false}))

      }
      
    } 
  }
  catch(err){
    setErr((prev) => ({
        ...prev,
        data: err.message,
        state: false,
      }));
      setSnack(true);
      setloading(prev=>({head:false,subhead:false,upsheets:false,upimgs:false}));
  }
  }
  useEffect(() => {
    (async () => {
      try{
       // let res=await loadHeadings();
       // if(res)
        {
          //alert("executing")
         let res=await loadSHeadings(9);
          if(res)
          {
            fetchImageSheets("SubHeadingImages",res);
          }
        }
       
      }
      catch(err){
        setErr((prev) => ({
            ...prev,
            data: err.message,
            state: false,
          }));
          setSnack(true);
          setloading(prev=>({head:false,subhead:false,upsheets:false,upimgs:false}));
      }
    })();
  }, []);

  const AddHeading = async (data) => {
    try{
      setErr((prev) => ({ ...prev, data: "uploading details...", state: true }));
     // alert(hid)
    setSnack(true);
    const url="/api/SubHeading";
    const key="HId";
    const value=9;
    //alert(hid);
    let res = await UploadType( `${API_URL}${url}`,"POST",{Name:data,[key]:value,Remark:"temp",Description:"temp"})
    if (res) {
      //if(type==1)
      {
        setsubHeadings(prev=>{let s=[...prev];s.push({name:data,id:res});return s;})
      }
      
      setErr((prev) => ({
        ...prev,
        data: "uploaded successfully.",
        state: true,
      }));
      setSnack(true);
    } else {
    
      setErr((prev) => ({
        ...prev,
        data: "uploading Failed...",
        state: false,
      }));

      setSnack(true);
    }
    }
    catch(err){
      setErr((prev) => ({
        ...prev,
        data: err.message,
        state: false,
      }));

      setSnack(true);
    }
  };
  const upload = async () => {
    if (shid === "") {
      setErr((prev) => ({
        ...prev,
        data: "Subheading should not be empty.",
        state: false,
      }));
      setSnack(true);
    } else if (descRemark.some((el) => el === "")) {
      setErr((prev) => ({
        ...prev,
        data: "Description and Remark should not be empty",
        state: false,
      }));
      setSnack(true);
    } else {
      // await uploadAsync();
      setEdit(true);
    }
  };
  const uploadAsync = async () => {
    //code goes here of apis.
  };
  const uploadType=async (type,base64,name)=>{
    try{
      if(type==="img")
    {
      setEdit(prev=>true);
      setErr((prev) => ({
        ...prev,
        data: "Image is being uploaded...",
        state: true,
      }));
      setSnack(true);
      
      const res = await UploadType(`${API_URL}/api/SubHeadingImages`,"POST",{
        Name:name,
        ImageData:base64,
        SHId:shid
      });
      if(res)
      {
        setErr((prev) => ({
          ...prev,
          data: "Image Uploaded Successfully...",
          state: true,
        }));
        setSnack(true);
        alert(name);
        setPresentImages(prev=>{let s=[...prev];s.push({id:res,name:name});return s;})
      }
    }
    }
    catch(err){
      setErr((prev) => ({
        ...prev,
        data: err.message,
        state: false,
      }));
      setSnack(true);
    }
  }
  const pickImageAsync = async () =>
  {

      let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
          base64: true
      });


      if (!result.canceled)
      {
        const name=result.assets[0].uri.split('/').pop();
        const imageData=result.assets[0].base64;
        // const res=await uploadType(`${API_URL}/api/SubHeadingImages`,"POST",{
        //   Name:name,
        //   ImageData:imageData,
        //   SHId:3
        // })
        uploadType('img',imageData,name)
       // setImage({data:result.assets[0].base64,name:result.assets[0].uri.split('/').pop()});
      } else
      {
          alert('You did not select any image.');
      }
  };

  if (false) {
    return (
      <ScrollView>
        <HStack justifyContent="center" alignSelf="center" w="92%" space={4}>
          <HSubSkeleton />
        </HStack>
        <DescCardSkeleton />

        <HStack justifyContent="center" alignSelf="center" w="92%" space={4}>
          <UploadSheet Eo={true} />
        </HStack>
        <Box mt={2}>
          <SaveEditSkeleton />
        </Box>
      </ScrollView>
    );
  }
  return (
    <ScrollView>
      <HStack w="100%" mt={4} justifyContent="center">
        {loading.subhead?<></>:<HStack>
          <Text style={{ fontWeight: "bold", paddingLeft: 8 }}>
            Choose Sub Heading
          </Text>
          <TouchableOpacity onPress={() => setShowModal(true)} disabled={edit}>
            <Ionicons
              paddingTop={2}
              size={18}
              paddingLeft={4}
              name="add-circle-sharp"
            ></Ionicons>
          </TouchableOpacity>
        </HStack>}
      </HStack>
      <HStack mt={-4} w="100%" justifyContent="center">
        {loading.subhead?<HSubSkeleton/>:
        <MultiSelectComponent
          data={subheadings.map(el=>({label:el.name,value:el.id}))}
          loadNext={(id)=>{fetchImageSheets("SubHeadingImages",id)}}
          edit={edit}
          selected={shid}
          setSelected={setSHid}
          setid={setSHid}
        />}
      </HStack>

      <Card
        style={{
          marginTop: 0,
          padding: 10,
          width: "96%",
          alignSelf: "center",
        }}
      >
        {loading.subhead?<DescCardSkeleton/>:<>
        <Text style={{ fontWeight: "bold", paddingLeft: 20 }}>
          Desc. of SubHeading
        </Text>
        <Description
          desc={descRemark[0]}
          edit={edit}
          label="Description"
          setDesc={(value) =>
            setDescRemark((prev) => {
              let p = [...prev];
              p[0] = value;
              return p;
            })
          }
        />
        <Text style={{ fontWeight: "bold", paddingLeft: 20 }}>
          Remark of SubHeading
        </Text>
        <Description
          desc={descRemark[1]}
          edit={edit}
          setDesc={(value) =>
            setDescRemark((prev) => {
              let p = [...prev];
              p[1] = value;
              return p;
            })
          }
        /></>}
      </Card>
      <HStack
        style={{ width: "96%", alignSelf: "center", justifyContent: "center" }}
        mt={2}
      >
        {loading.upimgs?<UploadSheet Eo={true}/>:<Card style={{ height: 150 }} width="80%">
         <HStack> 
          <Text
            style={{
              fontWeight: "bold",
              paddingLeft: 20,
              paddingTop: 10,
              paddingBottom: 10,
              alignSelf:'center'
            }}
          >
            Uploaded Images
          </Text>
          <TouchableOpacity onPress={pickImageAsync} disabled={edit}>
            {/* <Tooltip label="New Heading" openDelay={200}> */}
            <Ionicons
              paddingTop={10}
              size={18}
              paddingLeft={4}
              name="add-circle-sharp"
            ></Ionicons>
            </TouchableOpacity>
            </HStack>
          <Divider />

          <View style={{ height: 100 }}>
            <ScrollView nestedScrollEnabled>
              <FlatList
                
                data={presentImages}
                renderItem={({ item }) => (
                  <ListEl
                    type="img"
                    isEo={true}
                    Display={(item) =>
                      setShowImage((prev) => ({ ...prev, show: true }))
                    }
                    edit={edit}
                    title={item}
                    setstate={setPresentImages}
                    setErr={setErr}
                    setSnack={setSnack}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </ScrollView>
          </View>
        </Card>}
      </HStack>
      <HStack
        style={{ paddingBottom: 100 }}
        justifyContent="center"
        m={4}
        space={3}
      >
        <TouchableOpacity>
          <Button mode="contained" name="save" disabled={edit} onPress={upload}>
            {" "}
            Save
          </Button>
        </TouchableOpacity>
        <TouchableOpacity>
          <Button
            style={{ borderColor: "#592E73" }}
            mode="outlined"
            onPress={() => setEdit(false)}
          >
            {" "}
            Edit
          </Button>
        </TouchableOpacity>
      </HStack>

      <Model
        AddHeading={AddHeading}
        data={data}
        setData={setData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <ImageModel showImage={showImage} setShowImage={setShowImage} />
      <SnackbarT data={err} visible={snackbar} setVisibile={setSnack} />
    </ScrollView>
  );
}

export default EOTest;
