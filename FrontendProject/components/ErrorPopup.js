import React from 'react';
import { View, Text, Modal, Button } from 'react-native';

const ErrorPopup = ({ visible, message, onConfirm, onCancel }) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <Text>{message}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 4, marginTop: 30, borderRadius: 8 }}>
                        <View style={{ marginRight: 10,width:70 }}>
                            <Button
                             style={{ borderRadius:35 }}
                            title="Yes" onPress={onConfirm} />
                        </View>
                        <View style={{ marginLeft: 10,width:70 }}>
                            <Button
                            style={{ borderRadius:35 }}
                            title="No" onPress={onCancel} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ErrorPopup;
