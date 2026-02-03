import {
    View,
    PermissionsAndroid,
    Platform,
    Button,
    StyleSheet,
    Dimensions
} from 'react-native'
import HTImagePicker from '@hotta/react-native-imagepicker';
import { useState } from 'react';
import { wrap } from 'lodash';
import FastImage from '@d11/react-native-fast-image';

// 计算每列宽度：(屏幕宽度 - 左右内边距 - 图片间距 * 2) / 3
const { width } = Dimensions.get('window');
const COLUMN_GAP = 10;
const SCREEN_PADDING = 16;
const IMAGE_SIZE = (width - SCREEN_PADDING * 2 - COLUMN_GAP * 2) / 3;
function ImagePickScreen() {
    const [pickData, setPickData] = useState<any[]>([])
    const _onPress = async () => {
        const options: any = {
            mediaType: 'photo',
            sortOrder: 'asc',
        }
        // 添加权限检查（Android 13+ 需要 READ_MEDIA_IMAGES）
        if (Platform.OS === 'android') {
            let permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
            if (Platform.Version >= 33) { // Android 13+
                permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
            }
            const granted = await PermissionsAndroid.request(
                permission,
                {
                    title: '允许"App"访问照片、视频?',
                    message: '访问你的照片、视频、音频等媒体内容，以编辑或管理媒体内容',
                    buttonNeutral: '稍后再说',
                    buttonNegative: '取消',
                    buttonPositive: '确定',
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                throw new Error('没有访问相册权限');
            }
        }
        const response = await HTImagePicker.asyncShowImagePicker(options);
        setPickData(response)
    }
    return (
        <View style={styles.content}>
            <Button title="选取图片" onPress={_onPress} />
            <View style={styles.container}>
                {pickData.map((e, index) => <View style={styles.imageContainer} key={index}>
                    <FastImage source={{uri: `${e.uri}`}} style={styles.image}/>
                    </View>)}
            </View>
        </View>
    )
}

export default ImagePickScreen

const styles = StyleSheet.create({
    content: {
        flex :1, 
        backgroundColor: '#fff',
        paddingHorizontal: 16
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: COLUMN_GAP,
        rowGap: COLUMN_GAP,
        marginTop: 20
    },
    imageContainer: {
        width: IMAGE_SIZE, // 动态计算的宽度
        height: IMAGE_SIZE,
        borderRadius: 6,
        backgroundColor: '#F3F4F5',
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        aspectRatio: 1
    }
})