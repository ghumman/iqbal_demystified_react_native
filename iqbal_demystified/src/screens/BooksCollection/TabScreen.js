import {
  createMaterialTopTabNavigator,
} from 'react-navigation';

import Urdu from './Urdu';
import Farsi1 from './Farsi1';
import Farsi2 from './Farsi2';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Urdu,
    Farsi1,
    Farsi2,
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: 'gray',
      },
      labelStyle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
      },
      indicatorStyle: {
        borderBottomColor: '#87B56A',
        borderBottomWidth: 2,
      },
    },
  },
);

export default TabNavigator;
