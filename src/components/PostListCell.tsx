import {
    Text,
    View,
    Dimensions
} from 'react-native'
import FastImage from '@d11/react-native-fast-image';
import { useMemo } from 'react';
const { width: screen_width } = Dimensions.get('window')
export function UserHeader(props: any) {
    const { user } = props;
    const { avatar, nickname } = user
    return (
        <View style={{ flexDirection: 'row'}}>
            <FastImage source={{ uri: avatar}} style={{ height: 30, width: 30, borderRadius: 15 }}/>
            <Text style={{ fontSize: 15, color: '#333333'}}>{nickname}</Text>
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
      <View style={{ flex: 1, marginTop: 9}}>
                {/* <Text style={[styles.subject, ]} >{props.postId}</Text> */}
        <Text style={{ color: '#333333', fontSize: 16, lineHeight: 25 }} >{props.subject}</Text>
        {/* {contentText && <EmojiTextView  style={[styles.content, ]} numberOfLines={2}>{contentText}</EmojiTextView>} */}
        <Text style={{ color: '#333333', marginTop: 5, fontSize: 15, lineHeight: 21 }}>{contentText}</Text>
      </View>
    );
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
    return (
        <View style={{ flex: 1, marginHorizontal: 16, marginVertical: 14 }}>
            <View style={{ flexDirection: 'row'}}>
                <UserHeader user={user}/>
            </View>
            <ContentText subject={subject} content={content}/>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
                {images && images.length ? <FastImage source={{ uri: `${images[0].url}?imageView2/2/w/1080/h/16000/q/80/format/webp`}} 
                style={{ borderRadius: 6, flex: 1, aspectRatio: images[0].width / images[0].height}}/> : null}
            </View>
        </View>
    )
}