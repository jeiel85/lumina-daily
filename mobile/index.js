import { registerRootComponent } from 'expo';
import { registerWidgetTask } from 'react-native-android-widget';
import App from './App';
import { QuoteWidget } from './src/widgets/QuoteWidget';

// Register the background task for the Android Widget
registerWidgetTask('QuoteWidget', (props) => (
  <QuoteWidget {...props} />
));

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
