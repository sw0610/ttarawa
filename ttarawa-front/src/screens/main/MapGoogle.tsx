import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Image } from 'react-native'
import { styles, color } from '@styles/GlobalStyles'
import { map } from '@styles/main'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { destinState, markerListState, markerCategoryState } from '@store/atoms'

// 마커 커스터마이징 아이콘들
import bikeIcon from '@assets/Icon/bike.png' // 대여소
import yellowbikeIcon from '@assets/Icon/yellowbike.png'
import redbikeIcon from '@assets/Icon/redbike.png'
import blackbikeIcon from '@assets/Icon/blackbike.png'
import cafeIcon from '@assets/Icon/cafe.png' // 카페
import restaurantIcon from '@assets/Icon/restaurant.png' // 음식점
import cultureIcon from '@assets/Icon/star.png' // 관광지(문화시설)
import toiletIcon from '@assets/Icon/toilets.png' // 화장실
import mapStyle from '@utils/customMapStyle.json' // 마커 지우는 옵션 json파일 가져오기

export default function MapGoogle({ setMarker, region }) {
  // const [depart, setDepart] = useRecoilState(departState)
  const markerList = useRecoilValue(markerListState)
  const setDestin = useSetRecoilState(destinState)
  const category = useRecoilValue(markerCategoryState)

  const icons = [bikeIcon, restaurantIcon, cafeIcon, cultureIcon, toiletIcon]

  // 카테고리별 Marker 커스터마이징
  const getIcon = (checkMarker) => {
    // 대여소가 아니라면, 카테고리별 표시
    if (category !== 0) {
      return icons[category]
    }

    // 데여소라면, 개수별로, Icon 변경
    const visit = checkMarker.visit || 0

    if (visit >= 10) {
      return bikeIcon
    } else if (visit >= 4) {
      return yellowbikeIcon
    } else if (visit >= 1) {
      return redbikeIcon
    } else {
      return blackbikeIcon
    }
  }

  const handleMarkerPress = (index: number, marker: object) => {
    setMarker(index)
    const { lat, lng, name } = marker
    setDestin({ lat, lng, name })
  }

  return (
    <MapView
      style={map.container}
      showsUserLocation
      followsUserLocation
      region={region}
      provider={PROVIDER_GOOGLE} // iphone 설정
      // customMapStyle={mapStyle} // 이렇게 customMapStyle 속성에 JSON 파일을 추가합니다.
    >
      {markerList?.map((marker, index) => (
        <Marker
          key={marker.spotId}
          coordinate={{
            latitude: marker.lat,
            longitude: marker.lng,
          }}
          title={marker.name}
          description={
            marker.sub_category ? marker.sub_category : marker.subCategory
          }
          onPress={() => handleMarkerPress(index, marker)}
          icon={getIcon(marker)}
        />
      ))}
    </MapView>
  )
}
