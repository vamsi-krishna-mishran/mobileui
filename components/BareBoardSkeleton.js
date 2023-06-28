import React from "react";
import {
  Skeleton,
  VStack,
  Center,
  NativeBaseProvider,
  HStack,
  Box,
} from "native-base";
import { Text } from "react-native";
import { Card } from "react-native-paper";

const BareBoardSkeleton = () => {
  return (
    <>
      <VStack
        w="90%"
        maxW="900"
        style={{ alignSelf: "center", marginTop: 10 }}
        space={2}
        overflow="hidden"
        rounded="md"
        _dark={{}}
        _light={{
          borderColor: "coolGray.200",
        }}
      >
        <Skeleton
          rounded="full"
          w="100"
          h="2"
          style={{ alignSelf: "center" }}
          startColor="violet.300"
        />
        <Skeleton rounded="3xl" h="350" startColor="violet.300" />
        <Skeleton
          style={{ alignSelf: "center", height: 40 }}
          rounded="3xl"
          w="150"
          startColor="violet.300"
        />
        <Skeleton h="60" rounded="md" startColor="violet.300" />

        <HStack justifyContent="center" space={3}>
          <Skeleton w="100" rounded="full" startColor="violet.300" />

          <Skeleton w="100" rounded="3xl" startColor="violet.300" />
        </HStack>
      </VStack>
    </>
  );
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

export const TableSkeleton = ({ version = true }) => {
  return (
    <Card mode="elevated" width="96%" alignSelf="center">
      <HStack justifyContent="space-between" space={4} p="5">
        <Skeleton
          h="5"
          rounded={version ? "3xl" : "sm"}
          startColor="violet.300"
          style={{ flex: 5 }}
        />
        <Skeleton
          h="5"
          rounded={version ? "3xl" : "sm"}
          startColor="violet.300"
          style={{ flex: 5 }}
        />
        <Skeleton
          h="5"
          rounded={version ? "3xl" : "sm"}
          startColor="violet.300"
          style={{ flex: 5 }}
        />
      </HStack>
      <HStack justifyContent="space-between" space={4} p="5">
        <Skeleton
          h="5"
          rounded="sm"
          startColor="violet.300"
          style={{ flex: 5 }}
        />
        <HStack space={5} style={{ flex: 6 }}>
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
        </HStack>
        <Skeleton
          h="5"
          rounded="sm"
          startColor="violet.300"
          style={{ flex: 5 }}
        />
      </HStack>
      <HStack justifyContent="space-between" space={4} p="5">
        <Skeleton
          h="5"
          rounded="sm"
          startColor="violet.300"
          style={{ flex: 5 }}
        />
        <HStack space={5} style={{ flex: 6 }}>
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
        </HStack>
        <Skeleton
          h="5"
          rounded="sm"
          startColor="violet.300"
          style={{ flex: 5 }}
        />
      </HStack>
      <HStack justifyContent="space-between" space={4} p="5">
        <Skeleton
          h="5"
          rounded="sm"
          startColor="violet.300"
          style={{ flex: 5 }}
        />
        <HStack space={5} style={{ flex: 6 }}>
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
        </HStack>
        <Skeleton
          h="5"
          rounded="sm"
          startColor="violet.300"
          style={{ flex: 5 }}
        />
      </HStack>
      <HStack justifyContent="space-between" space={4} p="5">
        <Skeleton
          h="5"
          rounded="sm"
          startColor="violet.300"
          style={{ flex: 5 }}
        />
        <HStack space={5} style={{ flex: 6 }}>
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
          <Skeleton
            h="5"
            rounded={version ? "3xl" : "sm"}
            startColor="violet.300"
            style={{ width: 20 }}
          />
        </HStack>
        <Skeleton
          h="5"
          rounded="sm"
          startColor="violet.300"
          style={{ flex: 5 }}
        />
      </HStack>
    </Card>
  );
};

export const Imageskeleton = ({ height = 350, showButton = true }) => {
  return (
    <>
      <Skeleton
        my={2}
        alignSelf="center"
        w="90%"
        rounded="3xl"
        h={height}
        startColor="violet.300"
      />
      {showButton ? (
        <HStack my={2} space={3} justifyContent="center">
          <Skeleton
            style={{ alignSelf: "center", height: 40 }}
            rounded="3xl"
            w="100"
            startColor="violet.300"
          />
          <Skeleton
            style={{ alignSelf: "center", height: 40 }}
            rounded="3xl"
            w="100"
            startColor="violet.300"
          />
        </HStack>
      ) : (
        ""
      )}
    </>
  );
};
export const DescSkeleton = () => {
  return (
    <>
      <Skeleton
        my={2}
        alignSelf="center"
        w="90%"
        h="60"
        rounded="md"
        startColor="violet.300"
      />
    </>
  );
};
export const SaveEditSkeleton = () => {
  return (
    <HStack justifyContent="center" space={3}>
      <Skeleton w="100" rounded="full" startColor="violet.300" />

      <Skeleton w="100" rounded="3xl" startColor="violet.300" />
    </HStack>
  );
};
export const HSubSkeleton = () => {
  return (
    <Box rounded="md" mt={5} style={{ width: "45%",marginBottom:20,marginRight:20 }} backgroundColor="white">
      <Skeleton
        ml={3}
        mr={5}
        mt={2}
        w="130"
        style={{ height: 15 }}
        rounded="xs"
        startColor="violet.300"
      />
      <Skeleton
        ml={3}
        mr={5}
        mt={2}
        mb={2}
        w="130"
        style={{ height: 15 }}
        rounded="xs"
        startColor="violet.300"
      />
    </Box>
  );
};
export const DescCardSkeleton = () => {
  return (
    <Card
      style={{ width: "94%", height: 170, marginTop: 20 }}
      alignSelf="center"
      rounded="2xl"
      startColor="violet.100"
    >
      <HStack>
        <Skeleton
          w="94%"
          rounded="md"
          style={{ height: 60, marginLeft: 10, marginRight: 5 }}
          mt={4}
          startColor="blue.200"
        />
      </HStack>
      <HStack>
        <Skeleton
          w="94%"
          rounded="md"
          style={{ height: 60, marginLeft: 10, marginRight: 5 }}
          mt={4}
          startColor="blue.200"
        />
      </HStack>
    </Card>
  );
};

export const UploadSheet = ({ Eo }) => {
  return (
    <Card
      style={{
        width: Eo ? "70%" : "45%",
        height: 140,
        marginTop: 10,
        marginLeft: 10,
      }}
      alignSelf="center"
      rounded="2xl"
      startColor="violet.100"
    >
      <HStack justifyContent="center">
        <Skeleton
          w="60%"
          alignSelf="center"
          rounded="sm"
          style={{ height: 10 }}
          mt={4}
          startColor="blue.200"
        />
      </HStack>
      <HStack>
        <Skeleton
          w="90%"
          rounded="xs"
          style={{ height: 20, marginLeft: 10, marginRight: 5 }}
          mt={2}
          startColor="blue.200"
        />
      </HStack>
      <HStack>
        <Skeleton
          w="90%"
          rounded="xs"
          style={{ height: 20, marginLeft: 10, marginRight: 5 }}
          mt={1}
          startColor="blue.200"
        />
      </HStack>
      <HStack>
        <Skeleton
          w="90%"
          rounded="xs"
          style={{ height: 20, marginLeft: 10, marginRight: 5 }}
          mt={1}
          startColor="blue.200"
        />
      </HStack>
      <HStack>
        <Skeleton
          w="90%"
          rounded="xs"
          style={{ height: 20, marginLeft: 10, marginRight: 5 }}
          mt={1}
          startColor="blue.200"
        />
      </HStack>
    </Card>
  );
};
