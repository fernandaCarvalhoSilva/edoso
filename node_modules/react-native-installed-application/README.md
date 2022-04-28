
# react-native-installed-application

[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)
[![Version](http://img.shields.io/npm/v/react-native-installed-application.svg)](https://www.npmjs.com/package/react-native-installed-application)
[![Download](http://img.shields.io/npm/dm/react-native-installed-application.svg)](https://www.npmjs.com/package/react-native-installed-application)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/danilrafiqi/react-native-installed-application/master/LICENSE)

React Native module which provides list of installed Android applications.

- Work for android
- Support typescript

## Table of contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [result](#result)
4. [method](#method)

## Installation

If using yarn:

```
yarn add react-native-installed-application
```

If using npm:

```
npm i react-native-installed-application
```

## Usage

```javascript
import React, { useState } from "react";
import { View, Text } from "react-native";
import RNInstalledApplication from 'react-native-installed-application';

const App = () => {
  const [data, setData] = useState([]);

  const getApplication = ()=>{
    RNInstalledApplication.getApps()
    .then(apps => {
      setData(apps)
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <View style={{ marginVertical: 80, marginHorizontal: 20 }}>
      <TouchableOpacity onPress={()=> getApplication()}>
        <Text>Hello World</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
```


## Getting started

`$ npm install react-native-installed-application --save`

## Method

#### 1 - getApps()
#### 2 - getNonSystemApps()
#### 3 - getSystemApps()
#### 4 - isPackageInstalled(packageName)

## Result 

- packageName
- versionName
- versionCode
- firstInstallTime
- lastUpdateTime
- appName
- icon // Base64
- apkDir
- size // Bytes