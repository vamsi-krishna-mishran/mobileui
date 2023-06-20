import React from "react";
import { VStack, Input, Button, IconButton, Icon, Text, NativeBaseProvider, Center, Box, Divider, Heading } from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SearchBar()
{
    return <VStack space={5} w="98%">
        <VStack w="100%" space={5} alignSelf="center">
            <Input fontWeight="bold" variant="unstyled" color="rgba(255,255,255,1)" backgroundColor={"rgba(0,0,255,0.2)"} m={1} placeholder="Enter the document id" width="98%" borderRadius="100" px="0" InputLeftElement={<Icon mx="2" size="4" color="blue.300" as={<Ionicons name="ios-search" />} />} />
        </VStack>
    </VStack>
};