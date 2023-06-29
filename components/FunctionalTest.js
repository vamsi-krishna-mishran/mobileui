import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';

import { PermissionStatus } from 'expo-image-picker';
import {UploadType} from './UploadType';
import AddImage from './AddImage'
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
import {
  HSubSkeleton,
  DescCardSkeleton,
  SaveEditSkeleton,
  UploadSheet,
} from "./BareBoardSkeleton";

import {API_URL} from "@env";

function FunctionalTest() {
  const [presentImages, setPresentImages] = useState([]);
  const [presentedSheets, setPresentedSheets] = useState([]);

  const [headings,setHeadings]=useState([]);
  const [subheadings,setsubHeadings]=useState([]);
  const [data, setData] = useState("");
  const [loading, setloading] = useState({head:true,subhead:true,upsheets:true,upimgs:true});
  const [edit, setEdit] = useState(true);
  const [hid, setHid] = useState(0);
  const [shid, setSHid] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [err, setErr] = useState({});
  const [type, setType] = useState(1); //default heading.
  const [snackbar, setSnack] = useState(false);
  const [desc, setDesc] = useState(["", ""]);
  const [remark, setRemark] = useState(["", ""]);
  const [showImage, setShowImage] = useState({ show: false, uri: "" });
  const [image,setImage]=useState(false);
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

  const AddHeading = async (data) => {
    try{
      setErr((prev) => ({ ...prev, data: "uploading details...", state: true }));
     // alert(hid)
    setSnack(true);
    const url=type==1?"/api/Heading":"/api/SubHeading";
    const key=type==1?"IId":"HId"
    const value=type==1?1:hid;
    //alert(hid);
    let res = await UploadType( `${API_URL}${url}`,"POST",{Name:data,[key]:value,Remark:"temp",Description:"temp"})
    if (res) {
      if(type==1)
      {
        setHeadings(prev=>{let s=[...prev];s.push({name:data,id:res});return s;})
      }
      else if(type==2)
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
    if (hid === "" || shid === "") {
      setErr((prev) => ({
        ...prev,
        data: "Heading and Subheading should not be empty.",
        state: false,
      }));
      setSnack(true);
    } else if (desc.some((el) => el === "")) {
      setErr((prev) => ({
        ...prev,
        data: "Descriptions should not be empty",
        state: false,
      }));
      setSnack(true);
    } else if (remark.some((el) => el === "")) {
      setErr((prev) => ({
        ...prev,
        data: "Remarks should not be empty",
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
  const showModel = (type) => {
    if (type == 1) {
      setType(1);
      setShowModal(true);
    } else if (type == 2) {
      setType(2);
      setShowModal(true);
    }
  };
  const loadHeadings=async(id)=>{
    try{
      setloading(prev=>({...prev,head:true}));
      // await new Promise((resolve, reject) =>
      // {
      //     setTimeout(() => resolve(), 10000)
      // })
      let res = await fetch(`${API_URL}/api/Heading?Id=1`);
      let res2=null;
      if (res.status === 200) {
       // console.log(res);
        res2 = await res.json();
        //alert(res2.length);
        // headings.length=0;
        //res2.forEach(el=>headings.push(el));
        setHeadings(prev => [...res2]);
        // alert(headings.length);
        setHid(prev=>res2[0].id);
        setDesc(prev=>{let s=[...prev];s[0]=res2[0].description;return s;})
        setRemark(prev=>{let s=[...prev];s[0]=res2[0].remark;return s;})
        setloading(prev=>({...prev,head:false}));
        return res2[0].id;
        //alert(headings[0].id)
      } else {
        //setloading(prev=>({...prev,head:false}));
        setloading(prev=>({head:false,subhead:false,upsheets:false,upimgs:false}));
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
  const loadSHeadings=async(id)=>{
    try{
      setloading(prev=>({...prev,subhead:true,upimgs:true,upsheets:true}));
      const res = await fetch(`${API_URL}/api/SubHeading?Id=${id}`);
      if (res.status === 200) {
        let res3 = await res.json();
       // setsubHeadings(prev=>[...res3]);
        //subheadings.length=0;
      // res3.forEach(el=>subheadings.push(el));
         setsubHeadings(prev => [...res3]);
       // console.log(res3);
         setSHid(prev=>res3[0].id);
         setDesc(prev=>{let s=[...prev];s[1]=res3[0].description;return s;})
         setRemark(prev=>{let s=[...prev];s[1]=res3[0].remark;return s;})
         setloading(prev=>({...prev,subhead:false}));
         fetchImageSheets("SubHeadingImages");
         fetchImageSheets("XLSheets/GetTemplates");
         return res3[0].id;
      } else {
        //setloading(prev=>({...prev,subhead:false}));
        setloading(prev=>({head:false,subhead:false,upsheets:false,upimgs:false}));
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
  
  
  const fetchImageSheets=async(endpoint)=>{
    try{
      if(endpoint=="SubHeadingImages"){
        setloading(prev=>({...prev,upimgs:true}))

      }
      else
      {
        setloading(prev=>({...prev,upsheets:true}))
      }
      //alert(shid);
    let res = await fetch(`${API_URL}/api/${endpoint}?Id=${shid}`);
    if (res.status === 200) {
      let res2 = await res.json();
      if(endpoint=="SubHeadingImages"){
        console.log(res2);
        setPresentImages(prev=>(res2));
        setloading(prev=>({...prev,upimgs:false}))
      }
      else
      {
      setPresentedSheets(prev=>(res2));
      setloading(prev=>({...prev,upsheets:false}))
      }
    }
    else{
      if(endpoint=="SubHeadingImages")
      {
        setloading(prev=>({...prev,upimgs:false}))

      }
      else{
      setloading(prev=>({...prev,upsheets:false}))

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
        //   setloading(prev=>({...prev,head:true}));
        // // await new Promise((resolve, reject) =>
        // // {
        // //     setTimeout(() => resolve(), 10000)
        // // })
        // let res = await fetch(`${API_URL}/api/Heading?Id=1`);
        // let res2=null;
        // if (res.status === 200) {
        //  // console.log(res);
        //   res2 = await res.json();
        //   //alert(res2.length);
        //   // headings.length=0;
        //   //res2.forEach(el=>headings.push(el));
        //   setHeadings(prev => [...res2]);
        //   // alert(headings.length);
        //   setHid(prev=>res2[0].id);
        //   setDesc(prev=>{let s=[...prev];s[0]=res2[0].description;return s;})
        //   setRemark(prev=>{let s=[...prev];s[0]=res2[0].remark;return s;})
        //   setloading(prev=>({...prev,head:false}));
        //   //alert(headings[0].id)
        // } else {
        //   //setloading(prev=>({...prev,head:false}));
        //   setloading(prev=>({head:false,subhead:false,upsheets:false,upimgs:false}));
        //   return;
        // }
        let res=await loadHeadings();
        if(res)
        {
          res=await loadSHeadings(res);
          if(res)
          {
            fetchImageSheets("SubHeadingImages");
            fetchImageSheets("XLSheets/GetTemplates");
          }
        }
        //res = await fetch(`${API_URL}/api/SubHeading?Id=${res2[0].id}`);
        // if (res.status === 200) {
        //   let res3 = await res.json();
        //  // setsubHeadings(prev=>[...res3]);
        //   //subheadings.length=0;
        // // res3.forEach(el=>subheadings.push(el));
        //    setsubHeadings(prev => [...res3]);
        //  // console.log(res3);
        //    setSHid(prev=>res3[0].id);
        //    setDesc(prev=>{let s=[...prev];s[1]=res3[0].description;return s;})
        //    setRemark(prev=>{let s=[...prev];s[1]=res3[0].remark;return s;})
        //    setloading(prev=>({...prev,subhead:false}));
        // } else {
        //   //setloading(prev=>({...prev,subhead:false}));
        //   setloading(prev=>({head:false,subhead:false,upsheets:false,upimgs:false}));
        // }
        
        // (async()=>{
        //   await fetchImageSheets("SubHeadingImages");
        //   console.log("fetched images");
        //   console.log(presentImages)
        //   setloading(prev=>({...prev,upimgs:false}))
        // })();
        // (async()=>{
        //   await fetchImageSheets("XLSheet/GetTemplates");
        //   console.log("fetched sheets");
        //   console.log(presentedSheets);
        //   setloading(prev=>({...prev,upsheets:false}))
        // })();
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
        setPresentImages(prev=>{let s=[...prev];s.push({id:res,Name:name});return s;})
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
  // if (loading) {
  //   return (
  //     <ScrollView>
  //       <HStack alignSelf="center" w="92%" space={4}>
  //         <HSubSkeleton />
  //         <HSubSkeleton />
  //       </HStack>
  //       <DescCardSkeleton />
  //       <DescCardSkeleton />

  //       <HStack>
  //         <UploadSheet />
  //         <UploadSheet />
  //       </HStack>
  //       <Box mt={2}>
  //         <SaveEditSkeleton />
  //       </Box>
  //     </ScrollView>
  //   );
  // }
  return (
    <ScrollView>
      <HStack w="100%" mt={4} ml={5} space={8} alignContent="space-between">
        {loading.head?<></>:(<HStack>
          <Text style={{ fontWeight: "bold" }}>Choose Heading</Text>
          <TouchableOpacity onPress={() => showModel(1)} disabled={edit}>
            {/* <Tooltip label="New Heading" openDelay={200}> */}
            <Ionicons
              paddingTop={2}
              size={18}
              paddingLeft={4}
              name="add-circle-sharp"
            ></Ionicons>

            {/* </Tooltip> */}
          </TouchableOpacity>
        </HStack>)}
        {
          loading.subhead?<></>:<HStack>
          <Text style={{ fontWeight: "bold", paddingLeft: 8 }}>
            Choose Sub Heading
          </Text>
          <TouchableOpacity onPress={() => showModel(2)} disabled={edit}>
            <Ionicons
              paddingTop={2}
              size={18}
              paddingLeft={4}
              name="add-circle-sharp"
            ></Ionicons>
          </TouchableOpacity>
        </HStack>
        }
      </HStack>
      <HStack mt={-4}>
        {loading.head?<HSubSkeleton/>:
        <MultiSelectComponent loadNext={loadSHeadings}
          data={headings.map(el=>({label:el.name,value:el.id}))}
          edit={edit}
          selected={hid}
          setSelected={setHid}
          setid={setHid}
        />}
        {loading.subhead?<HSubSkeleton/>:<MultiSelectComponent
          loadNext={()=>{fetchImageSheets("SubHeadingImages")}}
          data={subheadings.map(el=>({label:el.name,value:el.id}))}
          edit={edit}
          selected={shid}
          setSelected={setSHid}
          setid={setSHid}
        />}
      </HStack>
      <Card style={{ padding: 10, width: "96%", alignSelf: "center" }}>
        {loading.head?<DescCardSkeleton/>:<><Text style={{ fontWeight: "bold", paddingLeft: 20 }}>
          Desc. of Heading
        </Text>
        <Description
          edit={edit}
          desc={desc[0]}
          setDesc={(value) =>
            setDesc((prev) => {
              let p = [...prev];
              p[0] = value;
              return p;
            })
          }
          label="Description"
        />
        <Text style={{ fontWeight: "bold", paddingLeft: 20 }}>
          Remark of Heading
        </Text>
        <Description
          edit={edit}
          desc={remark[0]}
          setDesc={(value) =>
            setRemark((prev) => {
              let p = [...prev];
              p[0] = value;
              return p;
            })
          }
        /></>}
      </Card>

      <Card
        style={{
          marginTop: 10,
          padding: 10,
          width: "96%",
          alignSelf: "center",
        }}
      >
        {loading.subhead?<DescCardSkeleton/>:<><Text style={{ fontWeight: "bold", paddingLeft: 20 }}>
          Desc. of SubHeading
        </Text>
        <Description
          edit={edit}
          label="Description"
          desc={desc[1]}
          setDesc={(value) =>
            setDesc((prev) => {
              let p = [...prev];
              p[1] = value;
              return p;
            })
          }
        />
        <Text style={{ fontWeight: "bold", paddingLeft: 20 }}>
          Remark of SubHeading
        </Text>
        <Description
          edit={edit}
          desc={remark[1]}
          setDesc={(value) =>
            setRemark((prev) => {
              let p = [...prev];
              p[1] = value;
              return p;
            })
          }
        /></>}
      </Card>
      <HStack space={2} style={{ width: "96%", alignSelf: "center" }} mt={2}>
        
        {loading.upsheets?<UploadSheet/>:<Card style={{ height: 150 }} width="48%">
          <HStack>
          <Text
            style={{
              fontWeight: "bold",
              paddingLeft: 20,
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            Uploaded Sheets
          </Text>
          <TouchableOpacity onPress={() => uploadType("sheet")} disabled={edit}>
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
              {presentedSheets.length>0 &&([<FlatList
                data={presentedSheets}
                renderItem={({ item }) => (
                  <ListEl
                    Display={(item) =>
                      setShowImage((prev) => ({ ...prev, show: true }))
                    }
                    edit={edit}
                    title={item.name}
                    type="sheet"
                    setstate={setPresentedSheets}
                  />
                )}
                keyExtractor={(item) =>( item.id)}
              />])}
            </ScrollView>
          </View>
        </Card>}
        {loading.upimgs?<UploadSheet/>:<Card style={{ height: 150 }} width="48%">
          <HStack>
          <Text
            style={{
              fontWeight: "bold",
              paddingLeft: 20,
              paddingTop: 10,
              paddingBottom: 10,
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
              {presentImages.length>0 &&([<FlatList
                data={presentImages}
                renderItem={({ item }) => (
                  <ListEl
                    Display={(item) =>
                      setShowImage((prev) => ({ ...prev, show: true }))
                    }
                    edit={edit}
                    title={item}
                    type="img"
                    setstate={setPresentImages}
                    setErr={setErr}
                    setSnack={setSnack}
                  />
                )}
                keyExtractor={(item) => item.id}
              />])}
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

export default FunctionalTest;

export const ListEl = ({ isEo = true,type, title, edit, Display,setstate,setErr,setSnack }) => {
  const Delete=async (id)=>{
    try{
      setErr((prev) => ({
        ...prev,
        data: "Deleting details...",
        state: true,
      }));
      setSnack(true);
      const res=await UploadType(`${API_URL}/api/${type=="img"?"SubHeadingImages":""}?Id=${id}`,"DELETE");
      if(res){
        setErr((prev) => ({
          ...prev,
          data: "Deleted successfully...",
          state: true,
        }));
        setSnack(true);
        setstate(prev=>{let s=[...prev];s=s.filter(el=>el.id != id);return s;})
      }
      else{
        setErr((prev) => ({
          ...prev,
          data: "Deletion failed...",
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
  }
  return (
    <>
      <Box>
        <HStack >
          <TouchableOpacity onPress={Display}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                padding: 5,
                paddingLeft: 25,
                fontWeight: "bold",
                width: isEo ? 125 : 125,
              }}
            >
              {title.name}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={edit} onPress={()=>Delete(title.id)} disabled={edit}>
            <Ionicons
              style={{ paddingTop: 5 }}
              color="red"
              size={20}
              name="close-outline"
            />
          </TouchableOpacity>
          
        </HStack>
      </Box>
    </>
  );
};
