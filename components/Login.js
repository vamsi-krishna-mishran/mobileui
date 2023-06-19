import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import
{
    Flex, Center, Link, useToast, Spinner,
    Heading, Icon, ScrollView, Button,
    HStack, Divider, Box,
    NativeBaseProvider, FormControl, Input
} from "native-base";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Entypo } from "@expo/vector-icons";
export default function Example()
{
    const [showPassword, setshowPassword] = useState(false);
    const [checking, isChecked] = useState(false);
    const [mail, setMail] = useState('');
    const [pwd, setpwd] = useState('');
    const toast = useToast();
    const [createhover, ischover] = useState(false);
    const handlePressIn = () => { }
    const handlePressOut = () => { }
    const checkUser = async () =>
    {
        isChecked(true);
        let res = await fetch('https://webapifluent20230616160256.azurewebsites.net/api/user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "Name": "vamsi", "Password": pwd, "Email": mail })
        })
        let res2 = await res.text();
        console.log(res2);
        isChecked(false);
        Alert.alert('Alert Title', res2, [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ], { cancelable: true })
    }


    return <Box flex="1" safeAreaTop>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Flex direction='column' w="100%">
                <View style={styles.top}>

                    <Icon as={Entypo} name="location" size="5xl" color="white" />
                    <Text style={styles.header}>Analinear</Text>
                </View>
                <View style={styles.bottom}>
                    <Text style={{ fontSize: 34, color: "#4632A1" }}>Welcome</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{ color: "#A1A0A0" }}>Don't have an account?</Text>
                        <Text style={{ color: "red", fontStyle: 'italic' }}>
                            <Link _text={{
                                fontStyle: 'italic',
                                fontSize: "md",
                                fontWeight: "500",
                                color: "red.800",
                            }} onPress={() =>
                            {
                                toast.show({
                                    render: () =>
                                    {
                                        return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                                            Hello! Have a nice day
                                        </Box>;
                                    }
                                })
                            }}
                            >
                                create new
                            </Link>
                        </Text>
                    </View>

                    <FormControl pt="5">
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input value={mail} onChangeText={(e) => setMail(e)} style={styles.input} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <HStack>
                            <Input w='100%' value={pwd} onChangeText={e => setpwd(e)} style={styles.input} type={showPassword ? "text" : "password"} />
                            {/* <TextInput
                            style={styles.input}
                            secureTextEntry={!showPassword}
                            placeholder="Enter password"
                        /> */}
                            <TouchableOpacity
                                style={{ marginLeft: -35, marginTop: 10, zIndex: 2 }}
                                onPress={() => setshowPassword(pre => !pre)}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-off' : 'eye'}
                                    size={24}
                                    color="rgba(0,0,0,0.7)"
                                />
                            </TouchableOpacity>
                        </HStack>

                        <Link href="https://www.google.com"
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "indigo.500"
                            }} alignSelf="flex-end" mt="1"
                            _pressed={{
                                bg: 'red'
                            }}>
                            Forget Password?
                        </Link>
                    </FormControl>
                    <Button onPress={checkUser} mt="2" colorScheme="indigo">
                        <HStack >
                            <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>{checking ? "" : 'sign in'}</Text>{checking ? <Spinner color="white" size="sm" /> : ""}
                        </HStack>
                    </Button>

                </View>
            </Flex>
        </ScrollView>
    </Box >;
}

const styles = StyleSheet.create({
    input: {
        fontSize: 15,

    },
    top: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: "rgba(0,0,225,0.7)",
        height: 400,
        alignItems: 'center',

    },
    bottom: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        height: 500,
        marginTop: -150,
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        padding: 40
    },
    brandView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    brandViewText: {
        fontSize: 40,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: "#ffffff"
    },
    header: {
        fontWeight: 'bold',
        color: "white",
        fontSize: 40
    }

});


