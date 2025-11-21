import {
    Text,
    View,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native'
import _ from 'lodash'
import { useMappingHelper } from '@shopify/flash-list';
import FastImage from '@d11/react-native-fast-image';
import { useMemo } from 'react';
import { usePost } from '../hooks/usePost';
const SingleImageContainerRatio = 193 / 346
const Spacing = (12 + 10) * 2
const { width: screen_width } = Dimensions.get('window')
const LikeIcon = require('../assets/post/icon_like.png')
const LikedIcon = require('../assets/post/icon_liked.png')
const Margin = 5

export function UserHeader(props: any) {
    const { user } = props;
    const { avatar, nickname } = user
    return (
        <View style={{ flexDirection: 'row' }}>
            <FastImage source={{ uri: avatar }} style={styles.avatar} />
            <Text style={styles.nickname}>{nickname}</Text>
        </View>
    )
}

function ContentText(props) {
    const contentText = useMemo(() => {
        let result = props.content.trim && props.content.trim() || ''

        const cleanedResult = result.replace(/[\r\n]+|\[图片\]/g, '');

        return cleanedResult
    }, [props.content])
    return (
        <View style={{ flex: 1, marginTop: 9 }}>
            <Text style={styles.subject} >{props.subject}</Text>
            <Text style={styles.content}>{contentText}</Text>
        </View>
    );
}

function BottomToolbar(props) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, backgroundColor: '#fff' }}>
            <View style={{ flex: 1 }} />
            <LikeButton postId={props.postId} />
        </View>
    )
}

function LikeButton(props) {
    const { liked, likeNum, toggleLike } = usePost(props.postId);
    const source = liked ? LikedIcon : LikeIcon
    console.log(`-------${props.postId}的LikeButton重新渲染-------`)
    return (
        <TouchableWithoutFeedback onPress={toggleLike}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={source} />
                <Text style={{ color: liked ? '#F7A040' : '#B1B8C1', marginLeft: 3, textAlign: 'left' }}>{likeNum}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

function ThumnailImageView(props) {
    const { style, url, targetWidth, targetHeight } = props
    const uri = `${url}?imageView2/2/w/1080/h/16000/q/80/format/webp`
    return (
        <FastImage source={{ uri: uri }}
            style={[{}, style]} />
    )
}

function calculateElementSize(length: number, imageData?: any, attribute?: any) {
    let imageViewWidth = 0
    let imageViewHeight = 0

    imageViewWidth = (screen_width - Spacing - (length === 1 ? 0 : Margin)) / length
    let ratio = SingleImageContainerRatio
    if (length === 1) {
        // 单图小于标准的宽高比,使用图片本身的宽高比
        const imageAttribute = imageData && imageData[0] || attribute;
        if (imageAttribute.width && imageAttribute.height) {
            const originRatio = imageAttribute.height / imageAttribute.width
            // 新增长图逻辑（高宽比 ≥ 1.1 视为长图）
            if (originRatio >= 1.1) {
                const imageViewWidthHalf = imageViewWidth * 0.5
                const maxHeight = imageViewWidthHalf * 1.3 // 最大高度限制
                const calculatedHeight = imageViewWidthHalf * originRatio

                imageViewWidth = imageViewWidthHalf
                imageViewHeight = Math.min(calculatedHeight, maxHeight)
                return { imageViewWidth, imageViewHeight }
            }
            if (originRatio < SingleImageContainerRatio) {
                ratio = Math.max(originRatio, 0.3)
            }
        }
    }
    imageViewHeight = length === 1 ? imageViewWidth * ratio : 204
    return { imageViewWidth: imageViewWidth, imageViewHeight: imageViewHeight }
}
export function ImagesGrid(props) {
    const { getMappingKey } = useMappingHelper();


    const { images } = props;
    if (_.isEmpty(images)) {
        return <View />
    }
    if (images.length === 1) {
        const image = images[0]
        const { imageViewWidth, imageViewHeight } = calculateElementSize(1, images)
        return (
            <View>
                <ThumnailImageView
                    style={[{ width: imageViewWidth, height: imageViewHeight, borderRadius: 6 },]}
                    url={image.url} />
            </View>
        )
    } else {
        const imageData = images.slice(0, 3);
        return (
            <View style={{ flexDirection: 'row', columnGap: 6 }}>
                {imageData.map((image, index) => <ThumnailImageView
                    key={getMappingKey(image.url, index)}
                    style={{ aspectRatio: 1, flex: 1, borderRadius: 6 }} url={image.url}
                />)}
            </View>
        )
    }
}
export function PostListCell(props) {
    const { post } = props
    const {
        images,
        content,
        subject,
        postId,
        columnId,
        postStat: { relayNum = 0, likeNum = 0, commentNum = 0 } = {},
        selfOperation: { collected = false, liked = false } = {},
        createTime,
        sendTime,
        user,
        topics,
        userStick,
        communityId,
        type,
        vods,
        columnTop,
        prime,
        cover
    } = post
    console.log('post list cell render')
    return (
        <View style={styles.cellContainer}>
            <View style={{ flexDirection: 'row' }}>
                <UserHeader user={user} />
            </View>
            <ContentText subject={subject} content={content} />
            <View style={{ marginTop: 5 }}>
                <ImagesGrid images={images} />
            </View>
            <BottomToolbar postId={postId} />
        </View>
    )
}

const styles = StyleSheet.create({
    cellContainer: { 
        flex: 1, 
        marginHorizontal: 12, 
        paddingHorizontal: 10, 
        borderRadius: 6, 
        paddingTop: 10, 
        marginTop: 10, 
        paddingVertical: 4, 
        backgroundColor: '#fff' 
    },
    subject: { 
        color: '#333333', 
        fontSize: 16, 
        lineHeight: 25 
    },
    content: { 
        color: '#333333', 
        marginTop: 5, 
        fontSize: 15, 
        lineHeight: 21 
    },
    avatar: { 
        height: 30, 
        width: 30, 
        borderRadius: 15 
    },
    nickname: { 
        fontSize: 15, 
        color: '#333333', 
        marginLeft: 5 
    }
})