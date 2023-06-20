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
import Toast from './Toast'


export default function Example({ navigation })
{
    const [showPassword, setshowPassword] = useState(false);
    const [forgetpwd, setforget] = useState(false);
    const [checking, isChecked] = useState(false);
    const [mail, setMail] = useState('');
    const [pwd, setpwd] = useState('');
    const toast = useToast();
    const [createhover, ischover] = useState(false);
    const handlePressIn = () =>
    {
        console.log("clicked forgotpassword");
        setforget(true);
    }
    const resetpwd = () => { return "" }
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
        if (res2 == 'true')
        {
            navigation.navigate('ATRGen', { name: mail });
            // navigation.reset({
            //     index: 0, // Set the index of the new screen in the stack
            //     routes: [
            //         { name: 'Home', params: { name: 'mail' } }, // Specify the new screen and its parameters
            //     ],
            // });
        }
        else
        {
            toast.closeAll();
            toast.show({
                // placement: 'top-right',
                render: () =>
                {
                    return <Box bg="red.500" px="4" py="2" mr="2" rounded="sm" mb={5}>
                        <HStack space={2} alignItems="center">
                            <Ionicons color="#ffffff" name="information-circle-outline" size={22}></Ionicons>
                            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Invalid Credentials</Text>
                        </HStack>
                    </Box>;
                }
            })
        }

    }
    const [register, setregister] = useState(false);

    return <Box flex="1" safeAreaTop>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Flex direction='column' w="100%">
                <View style={styles.top}>

                    <Icon as={Entypo} name="location" size="5xl" color="white" />
                    <Text style={styles.header}>Analinear</Text>
                </View>
                <View style={styles.bottom}>
                    {register ? "" : <Text style={{ fontSize: 34, color: "#4632A1" }}>Welcome </Text>}
                    {register ? "" : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Text style={{ color: "#A1A0A0" }}>Don't have an account?</Text>
                        <Text style={{ color: "red", fontStyle: 'italic' }}>
                            <Link _text={{
                                fontStyle: 'italic',
                                fontSize: "md",
                                fontWeight: "500",
                                color: "red.800",
                            }}
                            >
                                create new
                            </Link>
                        </Text>
                    </View>}
                    <FormControl pt="5" isRequired>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input onFocus={() => toast.closeAll()} value={mail} onChangeText={(e) => setMail(e)} style={styles.input} />
                    </FormControl>
                    {forgetpwd ? "" : <FormControl isRequired>
                        <FormControl.Label>Password</FormControl.Label>
                        <HStack>
                            <Input onFocus={() => toast.closeAll()} w='100%' value={pwd} onChangeText={e => setpwd(e)} style={styles.input} type={showPassword ? "text" : "password"} />
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

                        <Link
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
                    </FormControl>}
                    <Button onPress={forgetpwd ? resetpwd : checkUser} mt="2" colorScheme="indigo" isDisabled={checking ? true : false}
                        isLoading={checking ? true : false} spinnerPlacement="end" isLoadingText={forgetpwd ? "resetting " : "logging in"}
                        _loading={{ _text: { color: 'white', fontWeight: 'bold', fontSize: 18 } }}
                    >
                        <HStack >
                            <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }} >{forgetpwd ? "reset password" : 'sign in'}</Text>
                        </HStack>
                    </Button>
                    {forgetpwd ? <Navigate setforget={setforget} /> : ""}

                </View>
            </Flex>
        </ScrollView>
    </Box >;
}

function Navigate({ setforget })
{
    return <Box pt={4}>
        <TouchableOpacity onPress={() => setforget(false)}>
            <HStack alignItems={"center"}>
                <Ionicons size={25} name="chevron-back-outline"></Ionicons>
                <Text >Back to Login</Text>
            </HStack>
        </TouchableOpacity>
    </Box>
}


const styles = StyleSheet.create({
    input: {
        fontSize: 15,

    },
    top: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: "rgba(0,0,225,0.6)",
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


