/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';
import requestUserPermission from './firebaseConnection';
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => requestUserPermission);
