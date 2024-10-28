import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

type propValue = {
    isVisible: boolean;
}

export default function ProfileModal(props: propValue) {
    return (
        <Modal transparent visible={props.isVisible}>
            <View>
                <View style={{backgroundColor:'blue', width:50, height: 50}}>

                </View>
            </View>

        </Modal>
    )
}