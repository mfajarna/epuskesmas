import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IcAbout, IcArrowRight, IcLogout, IcMyProfile, IcPemeriksaan, IcSetting } from '../../assets/icon'
import { fonts } from '../../utils/fonts'
import { color } from '../../utils/colors'

const ProfileComponent = ({onPress,text}) => {

    const Icon = () => {
        switch(text){
            case "My Profile":
                return <IcMyProfile />

            case "Settings":
                return <IcSetting />
            
            case "About App":
                return <IcAbout />

            case "Logout":
                return <IcLogout />

            default:
                return <IcMyProfile />
        }
    }


  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.wrapper}>
        <View style={{marginBottom: 5}}>
            <Icon />
        </View>
         

         <View style={{justifyContent: 'center'}}>
            <Text style={styles.text}>{text}</Text>
         </View>

         <View style={{justifyContent: 'center'}}>
             <IcArrowRight />
         </View>
        
      </View>
      
    </TouchableOpacity>
  )
}

export default ProfileComponent

const styles = StyleSheet.create({
    container:{
        marginBottom: 15,
        height: 56,
        backgroundColor: color.white,
        borderRadius: 10,
        justifyContent: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
        
    },
    wrapper:{
        flexDirection: 'row',
        paddingHorizontal: 13,
        justifyContent: 'space-between'
    },
    text:{
        fontFamily: fonts.semiBold,
        fontSize: 15,
        color: color.primary
    }
})