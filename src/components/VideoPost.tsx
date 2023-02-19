import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-easy-icon';
import styled from 'styled-components';
const _videoData = {
    "id": "1",
    "title": "Phir Milenge",
    "youtube_link": "https://www.youtube.com/watch?v=S5FyS7tQuUw",
    "thumbnail_url": "https://i.ytimg.com/vi/S5FyS7tQuUw/maxresdefault.jpg",
    "description": "Till we meet again.",
    "artist": "Faisal Kapadia x Young Stunners",
    "season": "14",
}

function VideoPost({ videoData = _videoData }) {
    return (

        <View style={{paddingVertical: 10}}>
            <TouchableOpacity onPress={() => { () => Alert.alert("Video Selected: ", videoData.title) }}>
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