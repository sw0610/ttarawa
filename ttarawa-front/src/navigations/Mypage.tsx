import { createStackNavigator } from '@react-navigation/stack'
import MyProfile from '@screens/mypage/MyProfile'
import MyLikes from '@screens/mypage/MyLikes'
import MyHistory from '@screens/mypage/MyHistory'

const MyPageStack = createStackNavigator()

// MyPage Nested Navigation
export default function MyPageStackScreen({ route }) {
  return (
    <MyPageStack.Navigator initialRouteName="MyProfile">
      <MyPageStack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ headerShown: false }}
      />
      <MyPageStack.Screen
        name="MyLikes"
        component={MyLikes}
        options={{
          title: '좋아요 목록',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            fontSize: 20,
          },
        }}
      />
      <MyPageStack.Screen
        name="MyHistory"
        component={MyHistory}
        options={{
          title: '주행기록',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            textAlign: 'center',
            fontSize: 20,
          },
        }}
      />
    </MyPageStack.Navigator>
  )
}
