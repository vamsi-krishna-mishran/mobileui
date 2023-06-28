import * as React from "react";
import { useState, useEffect } from "react";
import { DataTable, Button, Card, TextInput } from "react-native-paper";
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Divider, HStack, ScrollView, Box, Radio } from "native-base";
import AddImage from "./AddImage";
import Description from "./Description";
import MultiSelectComponent from "./Dropdown";
import { RadioButton } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import SnackbarT from "./Snackbar";
import {
  TableSkeleton,
  Imageskeleton,
  DescSkeleton,
  SaveEditSkeleton,
} from "./BareBoardSkeleton";
import { API_URL } from "@env";
const data = [
  "Mounting Alignment",
  "Component Mounting",
  "Component Damaged",
  "Solder Smear",
  "Solder Spill",
  "PCB Damage",
  "Assembly Cleanliness",
];
const status = ["pass", "fail", "rework"];
const AssembledBoard = () => {
  const [status, Setstatus] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [remarks, setRemarks] = useState(["", "", "", "", "", "", ""]);
  const [desc, setDesc] = useState("");
  const [edit, setEdit] = useState(true);
  const [abimage, setImage] = useState(false);
  const [err, setErr] = useState("");
  const [snackbar, setSnack] = useState(false);
  const [loading, setloading] = useState({ image: true, table: true });
  useEffect(() => {
    (async () => {
     try{
        setloading((prev) => ({ ...prev, image: true }));
        let res = await fetch(
          `${API_URL}/api/BareBoard?IBoardType=AssembledBoard&Id=1`
        );
        if (res.status === 200) {
          let res2 = await res.json();
  
          setDesc(res2.description);
          setImage(res2.imageData);
          setloading((prev) => ({ ...prev, image: false }));
        }
  
        setloading((prev) => ({ ...prev, image: false, table: true }));
  
        let op = await fetch(
          `${API_URL}/api/AssembledBoard?Id=1&All=true`,
          {
            method: "GET",
          }
        );
        if (op.status === 200) {
          let res = await op.json();
          setRemarks(res.map((el) => el.remark));
          Setstatus(res.map((el) => el.status));
          setloading((prev) => ({ ...prev, image: false, table: false }));
        } else {
          setloading((prev) => ({ ...prev, image: false, table: false }));
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

  const upload = async () => {
    if (abimage == false || abimage === "") {
      setErr((prev) => ({
        ...prev,
        data: "Image should not be empty",
        state: false,
      }));
      setSnack(true);
    } else if (status.some((el) => el > 3 || el < 1)) {
      setErr((prev) => ({
        ...prev,
        data: "Status fields should not be empty.",
        state: false,
      }));
      setSnack(true);
    } else if (remarks.some((el) => el == "" || el == false)) {
      setErr((prev) => ({
        ...prev,
        data: "Table remark fields should not be emtpy .",
        state: false,
      }));
      setSnack(true);
    } else if (desc === "") {
      setErr((prev) => ({
        ...prev,
        data: "Remark Field should not be empty.",
        state: false,
      }));
      setSnack(true);
    } else {
      await uploadData();
      setEdit(true);
    }
  };
  const uploadData = async () => {
    try {
      const DataArray = data.map((el, index) => ({
        Type: el,
        Status: status[index],
        Remark: remarks[index],
        IId: 1,
      }));

      setErr((prev) => ({
        ...prev,
        data: "uploading details...",
        state: true,
      }));
      setSnack(true);
      let resim = await fetch(`${API_URL}/api/BareBoard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ImageName: "AssembledBoard",
          BoardType: "AssembledBoard",
          Description: desc,
          ImageData: abimage,
          IId: 1,
        }),
      });
      if (!resim.status === 200) {
        setErr((prev) => ({
          ...prev,
          data: "uploading operation failed",
          state: false,
        }));
        setSnack(true);
        return;
      }
      let op = await fetch(
        `${API_URL}/api/AssembledBoard?Id=1`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(DataArray),
        }
      );
      if (!op.status === 200) {
        setErr((prev) => ({
          ...prev,
          data: "uploading operation failed",
          state: false,
        }));
        setSnack(true);
        return;
      }
      let res = await fetch(
        `${API_URL}/api/AssembledBoard/PostAll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(DataArray),
        }
      );
      if (res.status === 200) {
        setErr((prev) => ({
          ...prev,
          data: "uploaded successfully.",
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
      }
    } catch (err) {
        setErr((prev) => ({
            ...prev,
            data: err.message,
            state: false,
          }));
          setSnack(true);
          setloading(false);
    }
  };
  return (
    // <Box style={{ marginBottom: 200 }} safeAreaBottom>
    <ScrollView style={{ marginBottom: 80 }}>
      {loading.image ? (
        <Imageskeleton />
      ) : (
        <>
          <Image
            style={{
              marginTop: 10,
              borderRadius: 20,
              alignSelf: "center",
              width: 330,
              height: 350,
            }}
            source={
              abimage
                ? { uri: `data:image/png;base64,${abimage}` }
                : require("../assets/notfound.jpg")
            }
          />
          <HStack justifyContent="center" space={5}>
            <AddImage edit={edit} setImage={setImage} />
            <Button
              disabled={edit}
              style={{ height: 40, marginTop: 5 }}
              mode="contained"
              icon="delete"
              onPress={() => setImage(false)}
            >
              Delete
            </Button>
          </HStack>
        </>
      )}
      {loading.table ? (
        <TableSkeleton />
      ) : (
        <DattaTable
          remarks={remarks}
          setRemarks={setRemarks}
          edit={edit}
          status={status}
          setStatus={Setstatus}
        />
      )}
      {loading.image ? (
        <DescSkeleton />
      ) : (
        <Description edit={edit} desc={desc} setDesc={setDesc} />
      )}
      {loading.image ? (
        <SaveEditSkeleton />
      ) : (
        <HStack justifyContent="center" m={2} space={3}>
          <TouchableOpacity>
            <Button
              mode="contained"
              name="save"
              disabled={edit}
              onPress={() => upload()}
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
      )}
      <SnackbarT data={err} visible={snackbar} setVisibile={setSnack} />
    </ScrollView>
  );
};

export default AssembledBoard;
const styles = StyleSheet.create({});
const DattaTable = ({ remarks, setRemarks, edit, status, setStatus }) => (
  <View style={{ marginBottom: 10 }}>
    <Card mode="elevated" width="96%" alignSelf="center">
      <HStack justifyContent="space-between" p="5">
        <Text style={{ flex: 5, paddingLeft: 10, fontWeight: "bold" }}>
          Type
        </Text>
        <Text style={{ flex: 5, fontWeight: "bold" }}>Status</Text>
        <Text style={{ flex: 5, fontWeight: "bold" }}>Remark</Text>
      </HStack>
      {data.map((element, index) => (
        <MyComponent
          remark={remarks[index]}
          setRemark={(id) =>
            setRemarks((prev) => {
              const up = [...prev];
              up[index] = id;
              return up;
            })
          }
          edit={edit}
          status={status[index]}
          setStatus={(id) =>
            setStatus((prev) => {
              const updatedStatus = [...prev]; // Create a copy of the array
              updatedStatus[index] = id; // Modify the element at the specified index
              return updatedStatus;
            })
          }
          el={element}
          key={index}
        />
      ))}
    </Card>
  </View>
);

const MyComponent = ({ remark, setRemark, edit, el, status, setStatus }) => {
  return (
    <HStack p="5" alignItems="center">
      <Text style={{ flex: 5 }}>{el}</Text>
      <View style={{ flex: 6, flexDirection: "row" }}>
        <RadioButton
          value={1}
          disabled={edit}
          color="green"
          status={status == 1 ? "checked" : "unchecked"}
          onPress={() => {
            setStatus(1);
          }}
        />
        <RadioButton
          value={2}
          disabled={edit}
          color="orange"
          status={status == 2 ? "checked" : "unchecked"}
          onPress={() => {
            setStatus(2);
          }}
        />
        <RadioButton
          value={3}
          disabled={edit}
          color="red"
          status={status == 3 ? "checked" : "unchecked"}
          onPress={() => {
            setStatus(3);
          }}
        />
      </View>
      <TextInput
        value={remark}
        onChangeText={(text) => setRemark(text)}
        disabled={edit}
        style={{ flex: 5, height: 40 }}
      ></TextInput>
    </HStack>
  );
};
