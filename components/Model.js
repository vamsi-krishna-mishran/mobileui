import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
} from "native-base";
import { useState } from "react";
import { Image } from "react-native";

const Example = ({ data, setData, showModal, setShowModal, AddHeading }) => {
  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add New</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input value={data} onChangeText={(text) => setData(text)} />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                style={{ color: "blue" }}
                onPress={() => {
                  setData("");
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                style={{ backgroundColor: "rgba(0,0,255,0.5)" }}
                onPress={() => {
                  AddHeading(data);
                  setData("");
                  setShowModal(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};
export default Example;
export const ImageModel = ({ showImage, setShowImage }) => {
  return (
    <Center>
      <Modal
        style={{ marginTop: 250 }}
        height={310}
        width={350}
        isOpen={showImage.show}
        onClose={() => setShowImage((prev) => ({ ...prev, show: false }))}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <Image
              style={{ width: 250, height: 200, resizeMode: "contain" }}
              source={require("../assets/notfound.jpg")}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
};
