import { SafeAreaView, View, ScrollView, Dimensions } from 'react-native'
import { useEffect, useRef } from 'react'
import { styles, color } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import MapHeader from '@components/main/MapHeader'
import InitTmap from '@utils/map/InitTmap'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import IconButton from '@components/common/IconButton'
import MapCard from '@components/main/MapCard'
import CategoryContent from '@components/main/CategoryContent'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import {
  departState,
  destinState,
  markerListState,
  markerState,
} from '@store/atoms'
import main from '@services/main'
import getLocation from '@utils/getLocation'

const SCREEN_WIDTH = Dimensions.get('window').width

export default function Map({ navigation }) {
  const [depart, setDepart] = useRecoilState(departState)
  const [markerList, setMarkerList] = useRecoilState(markerListState)
  const marker = useRecoilValue(markerState)
  const setDestin = useSetRecoilState(destinState)

  // 현재 위치 설정
  const getCurrent = async () => {
    const { lat, lng, name } = await getLocation()
    setDepart({ ...depart, lat, lng, name })
  }

  // 선택한 마커로 카드 스크롤
  const scrollViewRef = useRef()
  const handleScroll = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: SCREEN_WIDTH * index,
      animated: true,
    })
  }

  useEffect(() => {
    handleScroll(marker)
  }, [marker])

  // 새로운 카테고리 선택시 처음으로 스크롤
  useEffect(() => {
    handleScroll(0)
  }, [markerList])

  // 목적지 설정
  const handleDestin = (index: number) => {
    const { name, lat, lng } = markerList[index]
    setDestin({ ...depart, name, lat, lng })
  }

  useEffect(() => {
    main
      .fetchDestin(3, 0, 10, depart.lat, depart.lng)
      .then((res) => {
        setMarkerList(res)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <SafeAreaView style={[styles.androidSafeArea, map.container]}>
      <MapHeader navigation={navigation} />
      <InitTmap />
      <View style={map.content}>
        <IconButton
          icon1={
            <MaterialIcons
              name="my-location"
              size={45}
              color={color.primary}
              style={map.location}
            />
          }
          press={getCurrent}
        />
        {markerList.length ? (
          <ScrollView
            ref={scrollViewRef}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
          >
            {markerList.map((marker, index) => (
              <View key={index} style={map.cardContainer}>
                <MapCard
                  children={
                    <CategoryContent
                      title={marker.name}
                      distance={marker.distance}
                      address={marker.address}
                    />
                  }
                  icon={
                    <FontAwesome5
                      name="flag-checkered"
                      size={30}
                      color={color.white}
                    />
                  }
                  btnText="목적지 설정"
                  press={() => handleDestin(index)}
                />
              </View>
            ))}
          </ScrollView>
        ) : null}
      </View>
    </SafeAreaView>
  )
}
