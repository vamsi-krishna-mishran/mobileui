import React from "react";
import { Skeleton, VStack, Center, NativeBaseProvider, HStack, Box } from "native-base";

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
