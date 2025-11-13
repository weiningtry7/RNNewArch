import {
    View,
    Text,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native'
import { PostListView } from '../../components/PostListView';
import { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

const Item = (props) => {
  const { item, onPress } = props
  return (
    <TouchableWithoutFeedback onPress={() => {onPress(item)}}>
    <View style={{ flexDirection: 'row', paddingHorizontal: 16 , paddingVertical: 14, backgroundColor: '#fff' }}>
      <Text style={{ color: '#333', fontSize: 16, lineHeight: 24 }}>{item.title}</Text>
    </View>
    </TouchableWithoutFeedback>
  )
}
export default function HomeScreen() {
  const navigation = useNavigation()
  const onPress = (item) => {
    //@ts-ignore
    navigation.navigate(item.screen)
  }
  const data = useMemo(() => {
    return [
      {'title': '帖子列表', 'screen': 'PostListScreen'}
    ]
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <FlatList
      data={data}
      renderItem={({ item, index}) => <Item item={item} onPress={onPress}/>}
      />
    </View>
  );
}