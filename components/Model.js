import React from "react";
import { Button, Modal, FormControl, Input, Center, NativeBaseProvider } from "native-base";
import { useState } from "react";

const Example = ({ data, setData, showModal, setShowModal }) =>
{

    return <Center>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Contact Us</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <FormControl.Label>Heading Name</FormControl.Label>
                        <Input value={data} onChangeText={text => setData(text)} />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() =>
                        {
                            setData("");
                            setShowModal(false);

                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() =>
                        {
                            setShowModal(false);
                        }}>
                            Save
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};
export default Example;

