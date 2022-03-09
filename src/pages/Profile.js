import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../utils/colors'
import Header from '../components/atoms/Header'
import { IlUser } from '../assets/illustration'
import { fonts } from '../utils/fonts'
import { deleteUser, getUser } from '../utils/AsyncStoreServices'
import ProfileComponent from '../components/molecules/ProfileComponent'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../utils/redux/action/global'


const Profile = ({navigation}) => {
  const[nama,setNama] = useState('')
  const[email,setEmail] = useState('')
  const dispatch = useDispatch()


  const dataUser = async () => {
      dispatch(setLoading(true))

      const user = await getUser()


      setNama(user.nama_lengkap)
      setEmail(user.email)

      dispatch(setLoading(false))
      return Promise.resolve(user)

  }

  const onProfile = () => {
      navigation.reset({index:0, routes:[{name:'MyProfileScreen'}] })

  }

  const onLogout = async () => {
    dispatch(setLoading(true))
    
    const removeUser = await deleteUser()


    dispatch(setLoading(false))
    navigation.replace('LoginScreen')

    
    return Promise.resolve(removeUser)
}


  useEffect(() => {
      dataUser()

  },[])


  return (
    <View style={styles.container}>
      <Header
        title="Profile"
      />
      <ScrollView>

   
      <View style={styles.content}>
        <View style={{flexDirection: 'row'}}>
          <Image source={IlUser}  style={styles.photoContainer}/>
            <View style={{justifyContent: 'center', marginLeft: 10}}>
              <Text style={styles.nama}>{nama}</Text>
              <Text style={styles.email}>{email}</Text>
            </View>
        </View>

        <View style={styles.fiturProfile}>
            <ProfileComponent onPress={onProfile} text="My Profile" />
            <ProfileComponent text="Settings"/>
            <ProfileComponent text="About App"/>
            
        </View>

        <View>
              <ProfileComponent text="Logout" onPress={onLogout}/>
        </View>


      </View>
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: color.background,
  },
  content:{
      paddingHorizontal: 26,
      paddingVertical: 15,
      flex:1,
      justifyContent: 'space-between'
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: '#F0F0F0',
    padding: 20,
  },
  nama:{
    fontFamily: fonts.semiBold,
    color: 'black',
    fontSize: 15
  },
  email:{
    marginTop: 5,
    fontFamily: fonts.medium,
    color: '#9F9F9F',
    fontSize: 13
  },
  fiturProfile: {
    marginBottom: 150,
    marginTop: 30
  }
})