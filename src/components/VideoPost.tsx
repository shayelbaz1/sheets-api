import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-easy-icon';
import { DataRow } from 'src/types/dataRow';
import styled from 'styled-components';

function VideoPost(props: { videoData: DataRow }) {
    const { videoData } = props
    return (
        <View style={{ paddingVertical: 10 }}>
            <TouchableOpacity onPress={() => { Alert.alert("Video Selected: ", videoData.title) }}>
                <ImageBackground style={styles.thumbImage} imageStyle={{ borderRadius: 16, }} source={{ uri: videoData.thumbnail_url }} >
                    <Icon type="font-awesome5" name="play-circle" size={50} color={'#ffffffc0'} />
                </ImageBackground>
            </TouchableOpacity>
            <Heading>{videoData.title}</Heading>
            <Description numberOfLines={2}> {videoData.description} </Description>
        </View>
    );
}

const styles = StyleSheet.create({
    thumbImage: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        height: 180, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center',
        elevation: 2,
    }
})

const Heading = styled(Text)`
    font-size: 16px;
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 4px;
    color: ${(props) => props.theme.colors.text};
`;

const Description = styled(Text)`
    font-size: 12px;
    color: ${(props) => props.theme.colors.text};
`;

export default VideoPost;