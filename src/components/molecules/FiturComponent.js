import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from '../../utils/colors'
import { fonts } from '../../utils/fonts'
import { IcInformasiKesehatan, IcPemeriksaan, IcRiwayatKesehatan, IcRiwayatObat, IcSuratRujukan } from '../../assets/icon'
import Gap from '../atoms/Gap'

const FiturComponent = ({onPress, title, desc, ...restProps}) => {

    const Icon = () => {
        switch(title){
            case 'Pemeriksaan':
                return <IcPemeriksaan />

            case 'Riwayat Kesehatan':
                return <IcRiwayatKesehatan />

            case 'Informasi Kesehatan':
                    return <IcInformasiKesehatan />

            case 'Riwayat Obat':
                return <IcRiwayatObat />

            case 'Surat Rujukan':
                return <IcSuratRujukan />

            default:
                return <IcPemeriksaan />
        }
    }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} {...restProps}>
      <View style={{flexDirection: 'row'}}>
        <View style={{justifyContent: 'center',}}>
            <Icon />
        </View>
        
        <View style={{marginLeft: 9}}>
            <Text style={styles.title}>{title}</Text>
            <Gap height={3} />
            <Text style={styles.desc}>{desc}</Text>
        </View>
      </View>

    </TouchableOpacity>
  )
}

export default FiturComponent

const styles = StyleSheet.create({
    container: {
        height: 63,
        backgroundColor: color.white,
        borderRadius: 10,
        padding: 11
    },
    title:{
        fontFamily: fonts.semiBold,
        color: 'black',
        fontSize: 13
    },
    desc:{
        fontFamily: fonts.medium,
        color: '#9F9F9F',
        fontSize: 10,
        width: 250
    }
})