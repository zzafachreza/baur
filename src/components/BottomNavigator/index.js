import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils/colors';

export default function BottomNavigator({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ backgroundColor: colors.primary, flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = 'home';
        let Newlabel = '';

        if (label === 'Home') {
          iconName = 'home-outline';
          Newlabel = 'Home';
        } else if (label === 'Account') {
          iconName = 'person-outline';
          Newlabel = 'Profile';
        } else if (label === 'Search') {
          iconName = 'search-outline';
          Newlabel = 'Search';
        } else if (label === 'Add') {
          iconName = 'add-circle-outline';
          Newlabel = 'Search';
        } else if (label === 'History') {
          iconName = 'file-tray-stacked-outline';
          Newlabel = 'History';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <View
              style={{
                color: isFocused ? colors.primary : colors.white,
                // paddingTop: 5,
                paddingBottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <View
                style={{

                  // borderTopWidth: 2,
                  // borderTopColor: colors.primary,
                  backgroundColor: isFocused ? colors.tertiary : colors.primary,
                  width: windowWidth / 4,
                  bottom: 0,
                  height: 70,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name={isFocused ? iconName.replace('-outline', '') : iconName}
                  type="ionicon"
                  size={32}
                  color={isFocused ? colors.primary : colors.tertiary}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: iconName => ({
    // paddingTop: 5,
    // paddingBottom: 5,
    // fontSize: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  }),
  box: iconName => ({}),
});
