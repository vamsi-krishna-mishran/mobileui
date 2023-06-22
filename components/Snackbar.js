import * as React from 'react';
import { Center } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { PaperProvider, Snackbar, Portal } from 'react-native-paper';

function SnackbarT({ data, visible, setVisibile })
{

    return (
        <View style={styles.container}>
            <Portal>
                <Snackbar
                    duration={2000}
                    style={{ backgroundColor: data.state ? "green" : "red", marginBottom: 30, borderRadius: 10 }}
                    elevation={7}
                    visible={visible}
                    onDismiss={() => setVisibile(false)}
                    action={{
                        label: 'close',
                        onPress: () => { setVisibile(false) }
                    }}
                >

                    <Text style={{ color: "white", fontWeight: "bold" }}>{data.data}</Text>

                </Snackbar>
            </Portal>
        </View>
    );
}

export default SnackbarT;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});