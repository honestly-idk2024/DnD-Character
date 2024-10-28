import { View, StyleSheet, Image } from 'react-native';

type propValue = {
    containerSize: number;
    colorBorder: string;
}

export default function UserIcon(props: propValue) {
    return (
            <View style={{...styles.iconContainer, borderColor: props.colorBorder}}>
                <Image source={{uri:'https://hips.hearstapps.com/hmg-prod/images/funny-pop-culture-cat-names-66aa693568e44.jpg?'}} style={{...styles.iconImage, height: props.containerSize, width: props.containerSize}}/>
            </View>
    )
}


const styles = StyleSheet.create({
    iconContainer: {
        borderWidth: 2,
        borderRadius: 999,
        aspectRatio: 1/1,
    },
    iconImage: {
        borderRadius: 999,
        aspectRatio: 1/1,
    }
})