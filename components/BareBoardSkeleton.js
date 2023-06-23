import React from "react";
import { Skeleton, VStack, Center, NativeBaseProvider, HStack, Box } from "native-base";
import { Card } from 'react-native-paper';

const BareBoardSkeleton = () =>
{
    return <>
        <VStack w="90%" maxW="900" style={{ alignSelf: 'center', marginTop: 10 }} space={2} overflow="hidden" rounded="md" _dark={{

        }} _light={{
            borderColor: "coolGray.200"
        }}>
            <Skeleton rounded="full" w="100" h="2" style={{ alignSelf: 'center' }} startColor="violet.300" />
            <Skeleton rounded="3xl" h="350" startColor="violet.300" />
            <Skeleton style={{ alignSelf: 'center', height: 40 }} rounded="3xl" w="150" startColor="violet.300" />
            <Skeleton h="60" rounded="md" startColor="violet.300" />

            <HStack justifyContent="center" space={3}>
                <Skeleton w="100" rounded="full" startColor="violet.300" />

                <Skeleton w="100" rounded="3xl" startColor="violet.300" />
            </HStack>

        </VStack>
    </>;
};
export default BareBoardSkeleton;

// export default () =>
// {
//     return (
//         //   <NativeBaseProvider>
//         <Center flex={1} px="3">
//             <Example />
//         </Center>
//         // </NativeBaseProvider>
//     );
// };

export const TableSkeleton = ({ version = true }) =>
{
    return (
        <Card mode='elevated' width="96%" alignSelf="center">
            <HStack justifyContent="space-between" space={4} p="5">
                <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ flex: 5 }} />
                <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ flex: 5 }} />
                <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ flex: 5 }} />
            </HStack>
            <HStack justifyContent="space-between" space={4} p="5">
                <Skeleton h="5" rounded="sm" startColor="violet.300" style={{ flex: 5 }} />
                <HStack space={5} style={{ flex: 6 }}>
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                </HStack>
                <Skeleton h="5" rounded="sm" startColor="violet.300" style={{ flex: 5 }} />
            </HStack>
            <HStack justifyContent="space-between" space={4} p="5">
                <Skeleton h="5" rounded="sm" startColor="violet.300" style={{ flex: 5 }} />
                <HStack space={5} style={{ flex: 6 }}>
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                </HStack>
                <Skeleton h="5" rounded="sm" startColor="violet.300" style={{ flex: 5 }} />
            </HStack>
            <HStack justifyContent="space-between" space={4} p="5">
                <Skeleton h="5" rounded="sm" startColor="violet.300" style={{ flex: 5 }} />
                <HStack space={5} style={{ flex: 6 }}>
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                </HStack>
                <Skeleton h="5" rounded="sm" startColor="violet.300" style={{ flex: 5 }} />
            </HStack>
            <HStack justifyContent="space-between" space={4} p="5">
                <Skeleton h="5" rounded="sm" startColor="violet.300" style={{ flex: 5 }} />
                <HStack space={5} style={{ flex: 6 }}>
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                    <Skeleton h="5" rounded={version ? "3xl" : "sm"} startColor="violet.300" style={{ width: 20 }} />
                </HStack>
                <Skeleton h="5" rounded="sm" startColor="violet.300" style={{ flex: 5 }} />
            </HStack>
        </Card>
    )
}

export const Imageskeleton = ({ height = 350, showButton = true }) =>
{
    return (
        <>
            <Skeleton my={2} alignSelf="center" w="90%" rounded="3xl" h={height} startColor="violet.300" />
            {showButton ? <HStack my={2} space={3} justifyContent="center">
                <Skeleton style={{ alignSelf: 'center', height: 40 }} rounded="3xl" w="100" startColor="violet.300" />
                <Skeleton style={{ alignSelf: 'center', height: 40 }} rounded="3xl" w="100" startColor="violet.300" />

            </HStack> : ""}
        </>

    )
}
export const DescSkeleton = () =>
{
    return (
        <>
            <Skeleton my={2} alignSelf="center" w="90%" h="60" rounded="md" startColor="violet.300" />
        </>
    )
}
export const SaveEditSkeleton = () =>
{
    return (
        <HStack justifyContent="center" space={3}>
            <Skeleton w="100" rounded="full" startColor="violet.300" />

            <Skeleton w="100" rounded="3xl" startColor="violet.300" />
        </HStack>
    )
}