import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import ExamCategoriesScreen from '../screens/ExamCategoriesScreen';
import MockTestsScreen from '../screens/MockTestsScreen';
import CurrentAffairsScreen from '../screens/CurrentAffairsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QuizScreen from '../screens/QuizScreen';
import StudyMaterialScreen from '../screens/StudyMaterialScreen';
import ProgressScreen from '../screens/ProgressScreen';
import {theme} from '../utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{headerShown: false}}
    />
    <Stack.Screen 
      name="Quiz" 
      component={QuizScreen}
      options={{
        title: 'Practice Quiz',
        headerStyle: {backgroundColor: theme.colors.primary},
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen 
      name="StudyMaterial" 
      component={StudyMaterialScreen}
      options={{
        title: 'Study Material',
        headerStyle: {backgroundColor: theme.colors.primary},
        headerTintColor: '#fff',
      }}
    />
    <Stack.Screen 
      name="Progress" 
      component={ProgressScreen}
      options={{
        title: 'Your Progress',
        headerStyle: {backgroundColor: theme.colors.primary},
        headerTintColor: '#fff',
      }}
    />
  </Stack.Navigator>
);

const AppNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'HomeTab':
              iconName = 'home';
              break;
            case 'Categories':
              iconName = 'category';
              break;
            case 'MockTests':
              iconName = 'quiz';
              break;
            case 'CurrentAffairs':
              iconName = 'article';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack}
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Categories" 
        component={ExamCategoriesScreen}
        options={{title: 'Exam Categories'}}
      />
      <Tab.Screen 
        name="MockTests" 
        component={MockTestsScreen}
        options={{title: 'Mock Tests'}}
      />
      <Tab.Screen 
        name="CurrentAffairs" 
        component={CurrentAffairsScreen}
        options={{title: 'Current Affairs'}}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;