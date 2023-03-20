import { StyleSheet, View, FlatList } from 'react-native'
import { useEffect, useState } from 'react'
import SNSCard from '@components/common/SNSCard'
import { color } from '@styles/GlobalStyles'

export default function SNS() {
  interface SnsData {
    historyId: number
    profile: string // 프로필 이미지 주소
    nickname: string
    badgeImg: string
    image: string // 주행기록
    favoritesCount: number // 좋아요 수
    isMyFavorite: number // 좋아요 여부  true: 1, false: 0
    time: string // 주행 시간
    distance: string // 주행 거리
    content: string // 내용
    startAddress?: string // 출발지 주소
    endAddress?: string // 도착지 주소
  }

  const [dataLst, setDataLst] = useState<SnsData[]>([])

  const datas: SnsData[] = [
    {
      historyId: 1,

      profile: '@assets/profile.png',
      nickname: '열정라이더따옹이',
      badgeImg: '@assets/rank/amateur.png',
      image: '@assets/riding.png',

      favoritesCount: 15,
      isMyFavorite: 1,

      time: '30분',
      distance: '3.5km',

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      historyId: 2,

      profile: '@assets/profile.png',
      nickname: '달려라예지',
      badgeImg: '@assets/rank/beginner.png',
      image: '@assets/riding.png',

      favoritesCount: 15,
      isMyFavorite: 0, // true: 1, false: 0

      time: '30분',
      distance: '3.5km',

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      historyId: 3,

      profile: '@assets/profile.png',
      nickname: '따르릉예지',
      badgeImg:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRroBwNcmJFu3Q7gjYq18s9vaaY8-QTbOW5_Q&usqp=CAU',
      image: '@assets/riding.png',

      favoritesCount: 15,
      isMyFavorite: 1, // true: 1, false: 0

      time: '30분',
      distance: '3.5km',

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
    {
      historyId: 4,

      profile: '@assets/profile.png',
      nickname: '예지경주마',
      badgeImg:
        'https://contents.sixshop.com/uploadedFiles/84218/default/image_1547035192141.jpg',
      image: '@assets/riding.png',

      favoritesCount: 15,
      isMyFavorite: 1, // true: 1, false: 0

      time: '30분',
      distance: '3.5km',

      content:
        '이번에 새로운 코스 달려봤는데 확실히 오랜만에 달리니까 너무 좋았습니다!! 이 코스 꼭 추천드립니다!',
    },
  ]

  useEffect(() => {
    // axios
    setDataLst(datas)
  }, [])

  return (
    <View style={styles.snsContainer}>
      <FlatList
        data={dataLst}
        renderItem={({ item }) => {
          const isLike: boolean = item.isMyFavorite == 1 ? true : false

          return (
            <SNSCard
              key={item.historyId}
              // userImg={item.profile}
              userImg={require('@assets/profile.png')}
              userName={item.nickname}
              rank={require('@assets/rank/beginner.png')}
              // rank={require(rank)}
              imagepath={require('@assets/riding.png')}
              likes={item.favoritesCount}
              isLike={isLike}
              distence={item.distance}
              time={item.time}
              content={item.content}
            />
          )
        }}
        keyExtractor={(item) => item.historyId.toString()}
        onEndReached={() => console.log('End reached')}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  snsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: color.white,
  },
})
