import {
    View,
} from 'react-native'
import { PostListView } from '../../components/PostListView';
export default function PostListScreen() {
 
  return (
    <View style={{ flex: 1 }}>
      <PostListView/>
    </View>
  );
}