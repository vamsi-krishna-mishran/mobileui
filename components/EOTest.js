import React, { useState, useEffect } from "react";
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

  const [loading, setloading] = useState(true);
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(true);
  const [shid, setSHid] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [err, setErr] = useState({});
  const [snackbar, setSnack] = useState(false);
  const [descRemark, setDescRemark] = useState(["", ""]);
  const [showImage, setShowImage] = useState({ show: false, uri: "" });

  const AddHeading = async (data) => {
    setErr((prev) => ({ ...prev, data: "uploading details...", state: true }));
    setSnack(true);
    let res = await fetch(`${API_URL}/api/BareBoard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ ImageName: data[0], "Description": desc, BoardType: "Environmental", "ImageData": data[1] + ";" + data[2], IId: 1 })
    });
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
        data: "uploading Failed...",
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
  if (loading) {
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
        <HStack>
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
        </HStack>
      </HStack>
      <HStack mt={-4} w="100%" justifyContent="center">
        <MultiSelectComponent
          edit={edit}
          selected={shid}
          setSelected={() => {}}
          setid={setSHid}
        />
      </HStack>

      <Card
        style={{
          marginTop: 10,
          padding: 10,
          width: "96%",
          alignSelf: "center",
        }}
      >
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
        />
      </Card>
      <HStack
        style={{ width: "96%", alignSelf: "center", justifyContent: "center" }}
        mt={2}
      >
        <Card style={{ height: 150 }} width="80%">
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
          <Divider />

          <View style={{ height: 100 }}>
            <ScrollView nestedScrollEnabled>
              <FlatList
                data={presentImages}
                renderItem={({ item }) => (
                  <ListEl
                    isEo={true}
                    Display={(item) =>
                      setShowImage((prev) => ({ ...prev, show: true }))
                    }
                    edit={edit}
                    title={item}
                  />
                )}
                keyExtractor={(item) => item}
              />
            </ScrollView>
          </View>
        </Card>
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
