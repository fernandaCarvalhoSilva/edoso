import React from 'react';
import {View, Platform, Text, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import CameraRoll from '@react-native-community/cameraroll';
import {PermissionsAndroid} from 'react-native';
import {Styles} from './Camera.style';
import {RouteProp, useRoute} from '@react-navigation/core';

export default function Camera() {
  type ParamList = {
    Camera: {
      zoomMode: boolean;
      flashMode: boolean;
    };
  };
  const [{cameraRef}, {takePicture}] = useCamera();
  const params = useRoute<RouteProp<ParamList, 'Camera'>>();

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    let status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function savePicture(tag: string) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(tag);
  }

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      savePicture(data.uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={Styles.body}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={Styles.preview}
        zoom={params.params.zoomMode ? 1 : 0}
      />
      {!params.params.zoomMode &&
          <TouchableOpacity style={Styles.button} onPress={() => captureHandle()}>
            <Text style={Styles.buttonText}>Tirar Foto</Text>
          </TouchableOpacity>
      }
    </View>
  );
}
