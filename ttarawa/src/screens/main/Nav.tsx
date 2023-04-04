import React, { useState, useEffect } from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native'

import * as Location from 'expo-location'
import { atom, useRecoilState } from 'recoil'
import { locationListState } from '~/store/atoms'
import axios from 'axios'
// export const locationListState = atom<number[][]>({
//   key: 'locationListState',
//   default: [],
// })

export default function Nav(navigation: any) {
  const [locationList, setLocationList] = useRecoilState(locationListState)
  const [errorMsg, setErrorMsg] = useState(null)
  const [watcher, setWatcher] =
    useState<Promise<Location.LocationSubscription> | null>(null)
  const [isTracking, setIsTracking] = useState(false)

  const startLocationTracking = async () => {
    const watcher = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 0,
      },
      (location) => {
        const { latitude, longitude } = location.coords
        setLocationList((prevData) => [
          ...prevData,
          { longitude: longitude, latitude: latitude },
        ])
        console.log('getLOCATION')
      },
    )
    setIsTracking(true)
    setWatcher(watcher)
    return watcher
  }

  const stopLocationTracking = () => {
    if (!watcher) return

    watcher.then((locationSubscription: Location.LocationSubscription) => {
      locationSubscription.remove()
      setIsTracking(false)
      setWatcher(null)
      console.log('stop it')
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title={
          isTracking ? 'Stop Location Tracking' : 'Start Location Tracking'
        }
        onPress={isTracking ? stopLocationTracking : startLocationTracking}
        disabled={watcher !== null && !isTracking}
      />
    </View>
  )
}