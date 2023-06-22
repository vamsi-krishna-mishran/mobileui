import React from "react";
import { Radio, Stack, Center, NativeBaseProvider } from "native-base";

const Example = () =>
{
    return <Radio.Group name="exampleGroup" defaultValue="1" accessibilityLabel="pick a size">
        <Stack direction={{
            base: "column",
            md: "row"
        }} alignItems={{
            base: "flex-start",
            md: "center"
        }} space={4} w="75%" maxW="300px">
            <Radio value="1" colorScheme="red" size="sm" my={1}>
                Small
            </Radio>
        </Stack>
    </Radio.Group>;
};

export default () =>
{
    return (

        <Example />

    );
};
