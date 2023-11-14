import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

type Props = {}

const BottomSheetView = (props: Props) => {

  const { width} = useWindowDimensions();

  return (
    <View style={{}}>
          <View style={{}}>
            <Text
              style={{fontSize: 15, textAlign: 'center', fontWeight: '600'}}>
              Scan any QR code to pay
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 4,
                textAlign: 'center',
                fontWeight: '500',
              }}>
              Google Pay . PhonePe . PayTM . UPI
            </Text>
          </View>
          <View
            style={{
              height: 2,
              width: width,
              backgroundColor: '#494949',
              marginTop: 16,
            }}
          />
          <View style={{height: '100%', width: width}}>
            <View
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/img/image-demo.jpg')}
                style={{width: 100, marginVertical: 30, height: 100}}
              />
              <Text
                style={{fontSize: 15, textAlign: 'center', fontWeight: '600'}}>
                Scan any QR code, not just Google Pay's
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  width: '90%',
                  marginLeft: 16,
                  marginTop: 4,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>
                Position your phone to make sure QR code is within the frame.
                See all supported QR codes.
              </Text>
            </View>
          </View>
        </View>
  )
}

export default BottomSheetView

const styles = StyleSheet.create({})