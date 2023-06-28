import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Card, Button, TextInput } from "react-native-paper";
import { HStack, VStack, Divider, Box } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Description from "./Description";
import SnackbarT from "./Snackbar";
import { SaveEditSkeleton, TableSkeleton } from "./BareBoardSkeleton";
import {API_URL} from "@env";

function PowerupTest() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(true);
  const [err, setErr] = useState({});
  const [snackbar, setSnack] = useState(false);
  const [desc, setDesc] = useState("");
  const [loading, setloading] = useState(true);
  const AddValues = () => {
    setData((prev) => [...prev, ["", "", "", ""]]);
  };
  const upload = async () => {
    if (data.length == 0) {
      setErr((prev) => ({
        ...prev,
        data: "Table should not be empty",
        state: false,
      }));
      setSnack(true);
    } else if (data.some((el) => el.some((el2) => el2 == "" || el2 == false))) {
      setErr((prev) => ({
        ...prev,
        data: "Table Fields should not be empty.",
        state: false,
      }));
      setSnack(true);
    } else if (desc == "" || desc == false) {
      setErr((prev) => ({
        ...prev,
        data: "Description  should not be empty",
        state: false,
      }));
      setSnack(true);
    } else {
      await uploadData();
      setEdit(true);
    }
  };
  const uploadData = async () => {
    setErr((prev) => ({ ...prev, data: "uploading details...", state: true }));
    let sendData = data.map((el) => ({
      Ref: el[0],
      PUT: el[1],
      Exp: el[2],
      Mes: el[3],
      IId:1
    }));
    //console.log(sendData);
    setSnack(true);
    let res = await fetch(`${API_URL}/api/PowerUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    if (res.status === 200) {
      setloading(false);
      setErr((prev) => ({
        ...prev,
        data: "datails uploaded successfully.",
        state: true,
      }));
      setSnack(true);
    } else {
        console.log(res.status);
      setErr((prev) => ({
        ...prev,
        data: "uploading operation failed",
        state: false,
      }));
      setSnack(true);
      setloading(false);
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
      let res = await fetch(`${API_URL}/api/PowerUp?Id=1`);
      if (res.status === 200) {
        let res2 = await res.json();
        console.log(res2);
        let resAr = res2.map((el) => [el.ref, el.put, el.exp, el.mes]);
        setData(resAr);
        setDesc("temp desc");
        setloading(false);
      } else {
        setDesc("");
        setData([]);
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
  if (loading) {
    return (
      <View style={{ marginTop: 20 }}>
        <TableSkeleton />
        <Box my={5}>
          <SaveEditSkeleton />
        </Box>
      </View>
    );
  }
  return (
    <ScrollView>
      <DattaTable data={data} setData={setData} edit={edit} />
      <View style={{ marginRight: 20, marginTop: 5 }} alignItems="flex-end">
        <TouchableOpacity disabled={edit} onPress={AddValues}>
          <Ionicons
            style={{ color: "blue", fontSize: 40 }}
            name="add-circle-outline"
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <Description edit={edit} desc={desc} setDesc={setDesc} />
      <HStack justifyContent="center" m={2} space={3}>
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
      <SnackbarT data={err} visible={snackbar} setVisibile={setSnack} />
    </ScrollView>
  );
}

export default PowerupTest;

const DattaTable = ({ data, setData, edit }) => (
  <View style={{ marginTop: 20 }}>
    <Card
      style={{ paddingBottom: 10 }}
      mode="elevated"
      width="96%"
      alignSelf="center"
    >
      <HStack justifyContent="space-between" py="5">
        <Text style={{ flex: 5, paddingLeft: 10, fontWeight: "bold" }}>
          Ref Des
        </Text>
        <Text style={{ flex: 5, fontWeight: "bold" }}>Location/IC</Text>
        <Text style={{ flex: 5, fontWeight: "bold" }}>Exp Vol(v)</Text>
        <Text style={{ flex: 5, fontWeight: "bold" }}>Mes Vol(v)</Text>
      </HStack>
      <Divider />
      {data.map((element, index) => (
        <MyComponent
          dataAr={data[index]}
          setDataAr={(modArr) =>
            setData((prev) => {
              let up = [...prev];
              up[index] = modArr;
              return up;
            })
          }
          edit={edit}
          key={index}
        />
      ))}
    </Card>
  </View>
);

const MyComponent = ({ dataAr, setDataAr, edit }) => {
  const handleChangeText = (text, index) => {
    // Create a copy of the dataAr array
    const newDataAr = [...dataAr];
    // Update the specific element at the given index
    newDataAr[index] = text;
    // Call setDataAr with the modified array
    setDataAr(newDataAr);
  };

  return (
    <HStack space={2} px={1} py="2" alignItems="center">
      <TextInput
        value={dataAr[0]}
        onChangeText={(text) => handleChangeText(text, 0)}
        disabled={edit}
        style={{ flex: 5, height: 40 }}
      />
      <TextInput
        value={dataAr[1]}
        onChangeText={(text) => handleChangeText(text, 1)}
        disabled={edit}
        style={{ flex: 5, height: 40 }}
      />
      <TextInput
        value={dataAr[2]}
        onChangeText={(text) => handleChangeText(text, 2)}
        disabled={edit}
        style={{ flex: 5, height: 40 }}
      />
      <TextInput
        value={dataAr[3]}
        onChangeText={(text) => handleChangeText(text, 3)}
        disabled={edit}
        style={{ flex: 5, height: 40 }}
      />
    </HStack>
  );
};
