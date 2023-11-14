import React, {useCallback, useMemo, useRef} from 'react';
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

import {
  Canvas,
  DiffRect,
  Group,
  RoundedRect,
  rect,
  rrect,
} from '@shopify/react-native-skia';
import {CloseIcon, FlashOffIcon, GalleryIcon, QRIcon} from './../assets/ICONS';
import LottieView from 'lottie-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetView from './BottomSheetView';

function Scanner(props:any): JSX.Element {


  const device = useCameraDevice('back');

  //height and width of device
  const {height, width} = useWindowDimensions();

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(codes);
      console.log(`Scanned ${codes.length} codes!`);
      props.navigation.navigate('Home', {codes})
    },
  });

  // dimensions for scanner box

  const START_X = width * 0.14;
  const START_Y = height * 0.15;
  const WIDTH = width * 0.72;

  const outer = rrect(rect(0, 0, width, height), 0, 0);
  const inner = rrect(rect(START_X, START_Y, WIDTH, WIDTH), 20, 20);

  const ClipTop = rect(START_X - 55, START_Y - 55, 100, 100);
  const ClipTopRight = rect(START_X + WIDTH - 45, START_Y - 55, 100, 100);
  const BottomLeft = rect(START_X - 55, START_Y + WIDTH - 45, 100, 100);
  const BottomRight = rect(
    START_X + WIDTH - 55,
    START_Y + WIDTH - 55,
    100,
    100,
  );

  const RoundCornerColors = {
    topLeft: '#F17B7B',
    topRight: '#EF9D01',
    bottomLeft: '#4D8DEF',
    bottomRight: '#20A34A',
  };

  const CornerWidth = 7;


  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['12%', '45%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <View style={styles.background}>
        <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} />
        {device == null ? (
          <Text>No Camera Device</Text>
        ) : (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
          />
        )}
        {/* Skia View */}
        <Canvas style={{flex: 1}}>
          <Group>
            <DiffRect
              inner={inner}
              outer={outer}
              color="black"
              opacity={0.7}></DiffRect>
            <RoundedRect
              x={START_X - 10}
              y={START_Y - 10}
              width={256}
              height={256}
              r={25}
              color={RoundCornerColors.topLeft}
              strokeWidth={CornerWidth}
              style="stroke"
              clip={ClipTop}
            />
            <RoundedRect
              x={START_X + 50}
              y={START_Y - 10}
              width={256}
              height={256}
              r={25}
              color={RoundCornerColors.topRight}
              strokeWidth={CornerWidth}
              style="stroke"
              clip={ClipTopRight}
            />
            <RoundedRect
              x={START_X - 10}
              y={START_Y + 50}
              width={256}
              height={256}
              r={25}
              color={RoundCornerColors.bottomLeft}
              strokeWidth={CornerWidth}
              style="stroke"
              clip={BottomLeft}
            />
            <RoundedRect
              x={START_X + 50}
              y={START_Y + 50}
              width={256}
              height={256}
              r={25}
              color={RoundCornerColors.bottomRight}
              strokeWidth={CornerWidth}
              style="stroke"
              clip={BottomRight}
            />
          </Group>
        </Canvas>

        {/* Upload Button */}
        <View
          style={{
            flex: 1,
            display: 'flex',
            position: 'absolute',
            top: WIDTH + START_Y + 40,
            width: width,
          }}>
          <TouchableOpacity style={styles.GalleryBtnContainer}>
            <GalleryIcon width={18} height={18} />
            <Text style={styles.galleryBtnText}>Upload from gallery</Text>
          </TouchableOpacity>
        </View>
        {/* Top Nav  Section*/}
        <View style={{position: 'absolute', top: 16, width: width}}>
          <View style={styles.topNavContainer}>
            <Pressable onPress={()=>{props.navigation.goBack()}}>
            <CloseIcon width={16} height={16} style={{marginTop: 12}} />
            </Pressable>
            <View
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <FlashOffIcon width={30} height={30} />
              <QRIcon width={30} height={30} />
            </View>
          </View>
        </View>
        {/* Lottie Diwali */}
        <View
          style={{position: 'absolute', bottom: -20, zIndex: 0, width: width}}>
          <View style={{display: 'flex', alignItems: 'center', flex: 1}}>
            <LottieView
              style={{width: width - 40, height: 180}}
              resizeMode="cover"
              source={require('../lottie/diwali.json')}
              autoPlay
              loop
            />
          </View>
        </View>
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{backgroundColor: '#303030', borderRadius: 40}}
        style={{width: width, display: 'flex', justifyContent: 'center'}}>
        <BottomSheetView />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    flex: 1,
  },
  GalleryBtnContainer: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 9999,
  },
  galleryBtnText: {
    color: '#2a2a2a',
    fontSize: 12,
    fontWeight: '600',
    marginStart: 6,
  },
  topNavContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
});

export default Scanner;
