import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { HStack, IconButton, KeyboardAvoidingView } from "native-base";
import AddImage from "./AddImage";
import Description from "./Description";
import { Button } from "react-native-paper";
import BareBoardSkeleton from "./BareBoardSkeleton";
import {API_URL} from '@env';

import SnackbarT from "./Snackbar";

function CameraPicture() {
  const [isloading, setloading] = useState(true);
  const [image, setImage] = useState(false);
  const [desc, setDesc] = useState("");
  const [edit, setEdit] = useState(true);
  const [snackbar, setSnack] = useState(false);
  const [err, setErr] = useState({});
  const uploadBareboard = async () => {
    if (!image) {
      setErr((prev) => ({
        ...prev,
        data: "Image  should not be empty",
        state: false,
      }));
      setSnack(true);
    } else if (!desc || desc == "") {
      setErr((prev) => ({
        ...prev,
        data: "Description  should not be empty",
        state: false,
      }));
      setSnack(true);
      // alert("description is empty")
    } else {
      await uploadBoardData();
      setEdit(true);
    }
  };
  const uploadBoardData = async () => {
    try{
        setErr((prev) => ({ ...prev, data: "uploading details...", state: true }));
    setSnack(true);
    let res = await fetch(`${API_URL}/api/BareBoard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ImageName: "image temp from native",
        BoardType: "CameraPicture",
        Description: desc,
        ImageData: image,
        IId: 1,
      }),
    });
    if (res.status === 200) {
      setErr((prev) => ({
        ...prev,
        data: "datails uploaded successfully.",
        state: true,
      }));
      setSnack(true);
    } else {
      setErr((prev) => ({
        ...prev,
        data: "uploading operation failed",
        state: false,
      }));
      setSnack(true);
      console.log(res.status);
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

  useEffect(() => {
    (async () => {
      try{
        setloading(true);
      // await new Promise((resolve, reject) =>
      // {
      //     setTimeout(() => resolve(), 10000)
      // })
        let res = await fetch(
            `${API_URL}/api/BareBoard?IBoardType=CameraPicture&Id=1`
        );
        if (res.status === 200) {
            let res2 = await res.json();
            console.log(res);
            setDesc(res2.description);
            setImage(res2.imageData);
            setloading(false);
        } else {
            setDesc("");
            setImage(false);
            setloading(false);
        }
      }
      catch(err){
        setErr((prev) => ({
            ...prev,
            data: err.message,
            state: false,
          }));
          setSnack(true);
        setloading(false);
    }
    })();
  }, []);
  if (isloading) {
    return <BareBoardSkeleton />;
  }
  //console.log(image);
  return (
    <ScrollView>
      {/* <SnackbarT snackbar={snackbar} setSnack={setSnack} /> */}
      <KeyboardAvoidingView>
        <Text
          style={{
            alignSelf: "center",
            color: "rgba(0,0,255,0.4)",
            fontWeight: "bold",
          }}
        >
          Uploaded Images
        </Text>
        <Image
          style={{
            marginTop: 10,
            borderRadius: 20,
            alignSelf: "center",
            width: 330,
            height: 350,
          }}
          source={
            image
              ? { uri: `data:image/png;base64,${image} ` }
              : require("../assets/notfound.jpg")
          }
        />
        <HStack justifyContent="center" space={5}>
          <AddImage setImage={setImage} edit={edit} />
          <Button
            style={{ height: 40, marginTop: 5 }}
            mode="contained"
            icon="delete"
            disabled={edit}
            onPress={() => setImage(false)}
          >
            Delete
          </Button>
        </HStack>
        <Description edit={edit} desc={desc} setDesc={setDesc} />
        <HStack justifyContent="center" m={2} space={3}>
          <TouchableOpacity>
            <Button
              mode="contained"
              name="save"
              disabled={edit}
              onPress={uploadBareboard}
            >
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
        <SnackbarT data={err} visible={snackbar} setVisibile={setSnack} />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default CameraPicture;

const styles = StyleSheet.create({
  buttonS: {
    backgroundColor: "#e4e4e4",
    borderRadius: 50,
  },
  buttonE: {},
});
