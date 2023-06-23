
import { useRoute } from '@react-navigation/native';

import * as React from "react";
import { useState } from 'react';
import
{
    createDrawerNavigator,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import
{
    NativeBaseProvider,

    Menu,
    Box,
    HamburgerIcon,
    Pressable,
    Heading,
    VStack,
    Text,
    Center,
    HStack,
    Divider,
    Icon,
    ScrollView,
    TextArea,
    Header
} from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchBar from './Searchbar';
import AddBoard from './AddBoard';
global.__reanimatedWorkletInit = () => { };
const Drawer = createDrawerNavigator();
import { View } from 'react-native'
import { HelperText, TextInput, Dropdown } from 'react-native-paper';
import Dropdowncom from './Dropdown'
import { Button } from 'react-native-paper';


function Form()
{
    const [did, setdid] = React.useState("");
    const [pid, setpid] = useState("");
    const [vid, setvid] = useState("");
    const [err, setErr] = useState([]);
    const [rname, setrname] = React.useState("");
    const [cid, setcid] = React.useState("");
    const [sid, setsid] = React.useState("");
    const [selected, setSelected] = useState([]);
    const [remark, setremark] = useState("");
    const generateReport = () =>
    {


    }

    return (
        <VStack>
            <HStack justifyContent="center">

                <Text style={{ fontWeight: "bold", fontSize: 25, padding: 10, marginTop: 10 }}>ATR</Text>

            </HStack>
            <HStack mx={2} width={400} >
                <Dropdowncom singleselect={true} setid={setpid} />
                <Dropdowncom singleselect={true} setid={setvid} />
            </HStack>
            <HStack width={400} space={8} mx={5} my={2}>
                <TextInput style={{ width: 140, backgroundColor: "transparent", fontSize: 12, borderBottomColor: "#0000ff" }}
                    placeholder="Document Id*"
                    placeholderTextColor="rgba(0,0,255,0.5)"
                    outlineColor='rgba(0,0,255,0.3)'
                    activeOutlineColor='rgba(0,0,255,0.4)'
                    // mode="outlined"
                    value={did}
                    onChangeText={text => setdid(text)}
                />
                <TextInput style={{ width: 140, backgroundColor: "transparent", fontSize: 12, borderBottomColor: "#0000ff" }}
                    placeholder="Report Name*"
                    placeholderTextColor="rgba(0,0,255,0.5)"
                    outlineColor='rgba(0,0,255,0.8)'
                    activeOutlineColor='rgba(0,0,255,0.4)'
                    //mode="outlined"
                    value={rname}
                    onChangeText={text => setrname(text)}
                />
            </HStack>
            <HStack width={400} space={8} mx={5} my={2}>
                <TextInput style={{ textAlign: "left", width: 140, backgroundColor: "transparent", fontSize: 12, borderBottomColor: "#0000ff" }}
                    placeholder="Camera Id*"
                    placeholderTextColor="rgba(0,0,255,0.5)"
                    outlineColor='rgba(0,0,255,0.3)'
                    activeOutlineColor='rgba(0,0,255,0.4)'
                    // mode="outlined"
                    value={cid}
                    onChangeText={text => setcid(text)}
                />
                <TextInput style={{ width: 140, backgroundColor: "transparent", fontSize: 12, borderBottomColor: "#0000ff" }}
                    placeholder="Sensor Id*"
                    placeholderTextColor="rgba(0,0,255,0.5)"
                    outlineColor='rgba(0,0,255,0.3)'
                    activeOutlineColor='rgba(0,0,255,0.4)'
                    //mode="outlined"
                    value={sid}
                    onChangeText={text => setsid(text)}
                />
            </HStack>
            <HStack mx={2} width={400} >
                <Dropdowncom singleselect={false} selected={selected} setSelected={setSelected} />
            </HStack>
            <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                {/* <HStack justifyContent="center" width={400}> */}
                <TextArea onChangeText={(e) => setremark(e)} borderColor="rgba(0,0,0,0.5)" backgroundColor="transparent" focusOutlineColor="black" h={20} placeholder="Enter Remarks *" value={remark} width={300} />
                {/* </HStack> */}
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Button icon="pen" mode="outlined" onPress={generateReport} style={{ marginVertical: 20, width: 120, borderColor: "rgba(0,0,255,0.4)" }} > Generate</Button>

            </View>
        </VStack >
    );
}


function ATRComponent(props)
{
    return (
        <>
            <SearchBar />
            <ScrollView bgColor={"rgba(0,0,255,0.1)"} flex={1}>
                <Form />
            </ScrollView>
        </>

    );
}

const getIcon = (screenName) =>
{
    switch (screenName)
    {
        case "AddBoard":
            return "typewriter";
        case "Create Report":
            return "create-outline";
        default:
            return undefined;
    }
};

function CustomDrawerContent(props)
{
    return (
        <DrawerContentScrollView {...props} safeArea>
            <VStack space="6" my="2" mx="1">
                <Box p="4">
                    <Text color="gray.700" style={{ fontSize: 20 }}>
                        Welcome
                    </Text>

                    <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
                        {props.username}
                    </Text>
                </Box>
                <VStack divider={<Divider />} space="4">
                    <VStack space="3">
                        {props.state.routeNames.map((name, index) => (
                            <Pressable
                                px="5"
                                py="3"
                                rounded="md"
                                bg={
                                    index === props.state.index
                                        ? "rgba(0, 0, 255, 0.1)"
                                        : "transparent"
                                }
                                onPress={(event) =>
                                {
                                    props.navigation.navigate(name);
                                }}
                            >
                                <HStack space="7" alignItems="center">
                                    <Icon
                                        color={
                                            index === props.state.index ? "white" : "blue.500"
                                        }
                                        size="5"
                                        as={index == 1 ? <Ionicons name={getIcon(name)} /> : <MaterialCommunityIcons name={getIcon(name)} />}
                                    />
                                    <Text
                                        fontWeight="500"
                                        color={
                                            index === props.state.index ? "white" : "blue.500"
                                        }
                                    >
                                        {name}
                                    </Text>
                                </HStack>
                            </Pressable>
                        ))}
                    </VStack>
                </VStack>
            </VStack>
        </DrawerContentScrollView>
    );
}
function MyDrawer({ username, logout })
{

    const CustomHeaderRight = () => (
        <TouchableOpacity onPress={() => console.log("pressed account")}>
            <Menu w="130" mr="4" trigger={triggerProps =>
            {
                return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <MaterialCommunityIcons name="account-circle" style={{ marginRight: 20, marginTop: 5 }} size={28} color="rgba(0,0,255,0.5)" />
                </Pressable>;
            }}>
                <Menu.Item>View Profile</Menu.Item>
                <Menu.Item onPress={logout}>Log out</Menu.Item>
            </Menu>
        </TouchableOpacity>
    );
    const CustomHeaderLeft = () => (
        <TouchableOpacity onPress={() => console.log("pressed account")}>
            <MaterialCommunityIcons name="account-circle" style={{ marginRight: 20, marginTop: 5 }} size={28} color="rgba(0,0,255,0.5)" />
        </TouchableOpacity>
    )
    return (
        <Box flex={1}>
            <Drawer.Navigator screenOptions={{ headerTintColor: 'rgba(0,0,255,0.6)', color: "rgba(0,0,255,0.2)", headerRight: CustomHeaderRight }}
                drawerContent={(props) => <CustomDrawerContent {...props} username={username}
                />}
            >
                <Drawer.Screen name="AddBoard" component={AddBoard} />
                <Drawer.Screen name="Create Report" component={ATRComponent} />
            </Drawer.Navigator>
        </Box>
    );
}
export default function Example({ navigation })
{
    const route = useRoute();
    //const { name } = route.params;
    const name = "vamsi"
    const logout = () =>
    {
        navigation.reset({
            index: 0, // Set the index of the new screen in the stack
            routes: [
                { name: 'Login' }, // Specify the new screen and its parameters
            ],
        });
    }
    return (

        <MyDrawer name={navigation.routeNames} username={name} logout={logout} />
    );
}
