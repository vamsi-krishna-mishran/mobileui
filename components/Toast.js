import React from "react";
import
{
    Button, useToast,
    VStack, HStack, Text,
    Center, IconButton, CloseIcon,
    Alert, NativeBaseProvider
} from "native-base";

function Toast()
{
    const toast = useToast();
    return (
        toast.show({
            render: () =>
            {
                return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                    Hello! Have a nice day
                </Box>;
            }
        })
    )
}

export default Toast