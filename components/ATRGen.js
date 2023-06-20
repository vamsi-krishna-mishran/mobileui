
import { useRoute } from '@react-navigation/native';

import * as React from "react";
import
{
    createDrawerNavigator,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import
{
    NativeBaseProvider,
    Button, Menu,
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
} from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import SearchBar from './Searchbar';
global.__reanimatedWorkletInit = () => { };
const Drawer = createDrawerNavigator();
function Component(props)
{
    return (
        <>
            <SearchBar />
            <Center bgColor={"rgba(0,0,255,0.1)"} flex={1}>
                <Text mt="12" fontSize="18">
                    This is {props.route.name} page.
                </Text>
            </Center>
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
    console.log(props.state.routeNames);
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
                <Drawer.Screen name="AddBoard" component={Component} />
                <Drawer.Screen name="Create Report" component={Component} />
            </Drawer.Navigator>
        </Box>
    );
}
export default function Example({ navigation })
{
    const route = useRoute();
    const { name } = route.params;
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
