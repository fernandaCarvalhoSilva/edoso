
import { NativeModules } from 'react-native';

const { RNInstalledApplication } = NativeModules;


const getApps = () => {
    return RNInstalledApplication.getApps();
}
const getNonSystemApps = () => {
    return RNInstalledApplication.getNonSystemApps();
}
const getSystemApps = () => {
    return RNInstalledApplication.getSystemApps();
}
const isPackageInstalled = (packageName) => {
    return RNInstalledApplication.isPackageInstalled(packageName);
}

export default {
    getApps,
    getNonSystemApps,
    getSystemApps,
    isPackageInstalled,
};
