import { atom } from 'recoil'

// 유저 정보
export const userState = atom({
  key: 'userState', // 고유한 값
  default: {
    nickname: undefined,
    badgeName: undefined,
    totalDistance: undefined,
    profile: undefined,
    badgeImg: undefined,
  },
})

// 출발
export const departState = atom<object>({
  key: 'departState',
  default: {
    name: undefined,
    lat: undefined,
    lng: undefined,
  },
})

// 도착
export const destinState = atom<object>({
  key: 'destinState',
  default: {
    name: undefined,
    lat: undefined,
    lng: undefined,
  },
})

export const markerListState = atom({
  key: 'markerListStaste',
  default: [],
})

export const markerCategoryState = atom({
  key: 'markerCategoryState',
  default: 0,
})

// 길안내 좌표
export const pathState = atom({
  key: 'pathState',
  default: [],
})

// tracking Info
export const locationListState = atom({
  key: 'locationListState',
  default: [] as { latitude: number; longitude: number }[],
})

// SNS 모달
export const snsModal = atom({
  key: 'snsModalState',
  default: false,
})

// SNS 내용
export const snsParamsState = atom({
  key: 'snsParamsState',
  default: 'createdDate,desc',
})

export const remainingDistanceState = atom({
  key: 'remainingDistanceState',
  default: 0,
})
