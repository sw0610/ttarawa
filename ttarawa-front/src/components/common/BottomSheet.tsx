import { useEffect, useRef } from 'react'
import {
  View,
  Modal,
  Animated,
  Pressable,
  Dimensions,
  PanResponder,
} from 'react-native'

import { bottomSheet } from '@styles/GlobalStyles'

export default function BottomSheet(props) {
  const { modalVisible, setModalVisible } = props
  const screenHeight = Dimensions.get('screen').height // 스크린 높이
  const panY = useRef(new Animated.Value(screenHeight)).current

  // 화면의 사이즈를 기반으로 BottomSheet의 y축 위치 결정
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1], // 위로 드래그시 움직이지 않도록
    outputRange: [0, 0, 1],
  })

  // BottomSheet 재위치
  const reset = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  })

  // BottomSheet 닫음
  const close = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  })

  const panResponders = useRef(
    PanResponder.create({
      // 화면 터치 감지
      onStartShouldSetPanResponder: () => true,
      // onMoveShouldSetPanResponder: () => false,
      // 터치 or 드래그가 진행중일 때
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy)
      },
      // 터치가 끝날 때 실행
      onPanResponderRelease: (event, gestureState) => {
        // 터치 후 0이상 이동 & 속도가 1.5초과일 때 모달 닫음
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal()
        } else {
          reset.start() // 아니면 제자리로
        }
      },
    }),
  ).current

  useEffect(() => {
    if (props.modalVisible) {
      reset.start()
    }
  }, [props.modalVisible])

  const closeModal = () => {
    close.start(() => {
      setModalVisible(false)
    })
  }

  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent
    >
      <Pressable style={bottomSheet.overlay} onPress={closeModal}>
        <View style={bottomSheet.background} />
        <Animated.View
          style={{
            ...bottomSheet.container,
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          {props.children}
        </Animated.View>
      </Pressable>
    </Modal>
  )
}
