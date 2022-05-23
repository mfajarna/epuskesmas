import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/atoms/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../utils/AsyncStoreServices'
import { getNoAntrian } from '../utils/redux/action/pendaftaran'
import { setLoading } from '../utils/redux/action'
import UseForm from '../utils/useForm'
import CustomTextInput from '../components/molecules/CustomTextInput'
import Gap from '../components/atoms/Gap'
import DropDownPicker from 'react-native-dropdown-picker';
import { fonts } from '../utils/fonts'
import CustomButton from '../components/molecules/CustomButton'
import { color } from '../utils/colors'
import { showMessage } from '../utils/showMessage'
import axios from 'axios'
import { ENDPOINT_API } from '../utils/httpClient'

const DaftarPemeriksaanScreen = ({navigation, route}) => {

  const params = route.params;
  const dispatch = useDispatch();
  var id_poli = params.id;
  var nama_poli = params.nama_poli;
  const{noAntrianPoli} = useSelector(state => state.pendaftaranReducer);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'bpjs', value: 'bpjs'},
    {label: 'umum', value: 'umum'}
  ])

  const [openKunjungan, setOpenKunjungan] = useState(false);
  const [valueKunjungan, setValueKunjungan] = useState(null);
  const [itemsKunjungan, setItemsKunjungan] = useState([
    {label: 'Kunjungan Baru', value: 'kunjungan_baru'},
    {label: 'Kunjungan Lama', value: 'kunjungan_lama'}
  ])

  const[form, setForm] = UseForm({
    no_urut: noAntrianPoli,
    status: '',
    kunjungan: '',
    status_pemeriksaan: 'MENUNGGU',
    id_poli: id_poli
})


  const getDataPoli = async () => {
      const user = await getUser();
      const token = user.token;

      dispatch(getNoAntrian(token,id_poli, nama_poli))

      return Promise.resolve(user);
  }

  const renderDropdown = () => {
    if(open == true)
    {

    }
    if(open == false)
    {
      return(
        <>
            <Gap height={10} />
            <Text style={{
                      fontFamily: fonts.medium,
                      fontSize: 13,
                      color: '#070707',
                      marginBottom: 10
            }}>Tipe Kunjungan</Text>
            <DropDownPicker
              open={openKunjungan}
              value={valueKunjungan}
              items={itemsKunjungan}
              setOpen={setOpenKunjungan}
              setValue={setValueKunjungan}
              setItems={setItemsKunjungan}
              onChangeValue={(value) => {
                setForm('kunjungan', value)
              }}
            />
        </>

      )
    }
  }

  const onContinue = async () => {
      const user = await getUser();
      const token = user.token;

      const result = await axios.post(`${ENDPOINT_API}/pendaftaran/createPendaftaran`, {
          data:{
            form
          }
        },{
          headers:{
            'Authorization': token
          }
        }
        ).then(res => {
        showMessage('Berhasil membuat no antrian dan pemeriksaan', 'success')

        navigation.reset({index:0, routes:[{name:'HomeScreen'}] })
      }).catch(err => {
        showMessage('Gagal membuat no antrian dan pemeriksaan')

        console.log(err)
        navigation.reset({index:0, routes:[{name:'HomeScreen'}] })
      })


      return Promise.resolve(result);
  }

  useEffect(() => {
      getDataPoli()

      if(noAntrianPoli.length == 0)
      {
        dispatch(setLoading(true))
      }
      if(noAntrianPoli.length > 1)
      {
        dispatch(setLoading(false))
      }

  
  },[noAntrianPoli])

  return (
    <View style={styles.container}>
      <Header 
            onBack={() => navigation.reset({index:0, routes:[{name:'PemeriksaanScreen'}] })}
            title="Daftar Pemeriksaan dan Antrian"
            />

        <View style={{
          paddingHorizontal: 25
        }}>
          <Text style={{
              fontFamily: fonts.semiBold,
              fontSize: 13,
              color: '#070707',
              marginTop: 15
                }}>No Antrian {nama_poli}</Text>
        </View>

        <View style={styles.content}> 
        
        <View>
            <Gap height={20} />
                <CustomTextInput
                      text="No Urut"
                      placeholder="No Urut"
                      value={form.no_urut}
                      onChangeText={(value) => setForm('no_urut', value)}
                      editable={false}
                  />
                <Gap height={10} />
                <Text style={{
                          fontFamily: fonts.medium,
                          fontSize: 13,
                          color: '#070707',
                          marginBottom: 10
                }}>Status</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  autoScroll={true}
                  onChangeValue={(value) => {
                    setForm('status', value)
                  }}
                />

                {renderDropdown()}
        </View>
        
        <View style={{
          marginBottom: 20
        }}>
          <CustomButton
                text="Submit"
                color={color.primary}
                onPress={onContinue}
          />
        </View>



        </View>
    </View>
  )
}

export default DaftarPemeriksaanScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    },
    content:{
        paddingHorizontal: 25,
        flex: 1,
        justifyContent: 'space-between'
    }
})