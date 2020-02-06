import {
  createMaterialTopTabNavigator,
} from 'react-navigation';

import BookmarksPoemScreen from './BookmarksPoemScreen';
import BookmarksSherScreen from './BookmarksSherScreen';

const BookmarksNavigator = createMaterialTopTabNavigator(
  {
    POEMS: BookmarksPoemScreen,
    SHERS: BookmarksSherScreen,
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

export default BookmarksNavigator;
