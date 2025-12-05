import { useState } from 'react';
import {
    View,
    Text,
    Button,
    Platform,
    PermissionsAndroid
} from 'react-native'

import HTImagePicker from '@hotta/react-native-imagepicker';

function Header() {
  console.log('------Header rendered------');
  return <Text>Header</Text>;
}
function TestReactComplier() {
  const [count, setCount] = useState(0);
  console.log('--------TestReactComplier rendered-------');
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
    console.log('------==asyncShowImagePicker------')
    console.log(response)
  }

  return (
    <View style={{}}>
      <Header />  
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={_onPress} />
    </View>
  );
}
export default function ProfileScreen() {
    console.log('--------ProfileScreen rendered-------');
    return (
        <View style={{ flex: 1}}>
            <TestReactComplier/>
        </View>
    )
}