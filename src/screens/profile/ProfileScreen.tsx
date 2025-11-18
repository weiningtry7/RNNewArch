import { useState } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native'

function Header() {
  console.log('------Header rendered------');
  return <Text>Header</Text>;
}
function TestReactComplier() {
  const [count, setCount] = useState(0);
  console.log('--------TestReactComplier rendered-------');
  return (
    <View style={{}}>
      <Header />  
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={() => setCount(c => c + 1)} />
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