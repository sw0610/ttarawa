import { StyleSheet } from 'react-native'
import { color } from '@styles/GlobalStyles'

export const header = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 135,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 35,
  },
})

export const sns = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: color.white,
  },
})
