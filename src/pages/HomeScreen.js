import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { deleteUser, getUser } from '../utils/AsyncStoreServices'

const HomeScreen = ({navigation}) => {

  const user = async () => {
        const dataUser = await getUser();

        console.log('data user',dataUser)
  }

  useEffect(() => {
    user();
  }, [])


  const onLogout = async () => {
        const removeUser = await deleteUser()

        navigation.replace('LoginScreen')
        return Promise.resolve(removeUser)
    }

  return (
    <View>
      <TouchableOpacity onPress={onLogout}>
          <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})