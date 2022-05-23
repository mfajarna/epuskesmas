import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/atoms/Header'
import {fonts} from '../utils/fonts'
import {normalizeFont} from '../utils/normalizeFont'
import FiturComponent from '../components/molecules/FiturComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getListPoliActive } from '../utils/redux/action/pendaftaran'
import { getUser } from '../utils/AsyncStoreServices'
import { setLoading } from '../utils/redux/action'
import Gap from '../components/atoms/Gap'


const PemeriksaanScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const{listPoliActive} = useSelector(state => state.pendaftaranReducer)

  
  const getListDataPoliActive = async () => {
      const user = await getUser();
      const token = user.token;
      
      dispatch(getListPoliActive(token))
  }


  const renderPoli = () => {
    return(
      listPoliActive.map(item => {
        var id = item.id;
        var nama_poli = item.poli.nama_poli;
        return(
          <FiturComponent
              key={item.id}
              title={item.poli.nama_poli}
              desc={item.poli.desc_poli}
              onPress={() => navigation.reset({index:0, routes:[{name:'DaftarPemeriksaanScreen', params: {id,nama_poli}}] })}
          />
        )
      })
    )
  }

  useEffect(() => {
    getListDataPoliActive();
      if(listPoliActive.length == 0)
      {
        dispatch(setLoading(true))
      }
      if(listPoliActive.length > 0)
      {
        dispatch(setLoading(false))
      }
  }, [listPoliActive])


  return (
    <View style={styles.container}>
        <Header
          title="Daftar Pemeriksaan"
          onBack={() => navigation.reset({index:0, routes:[{name:'HomeScreen'}] })}
        />
        <View style={styles.content}>
            <Text style={{
              fontFamily: fonts.semiBold,
              fontSize: normalizeFont(13),
              color: 'black'
            }}>Pilih poli sesuai dengan kebutuhan</Text>
            <Gap height={10} />
            {renderPoli()}
        </View>
    </View>
  )
}

export default PemeriksaanScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  },
  content:{
    paddingHorizontal: 20,
    marginTop: 20
  }
})