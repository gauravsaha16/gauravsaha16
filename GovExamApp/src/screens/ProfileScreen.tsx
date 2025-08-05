import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Card,
  Button,
  Switch,
  Divider,
  List,
  Avatar,
  Chip,
  ProgressBar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../utils/theme';

interface Props {
  navigation: any;
}

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Mock user data
  const user = {
    name: 'Gaurav Saha',
    email: 'gaurav@example.com',
    phone: '+91 9876543210',
    joinedDate: new Date('2023-06-15'),
    premium: false,
    targetExams: ['UPSC', 'SSC'],
    studyStreak: 7,
    totalQuestions: 1250,
    accuracy: 71.4,
  };

  const achievements = [
    {
      id: '1',
      title: '7-Day Streak',
      description: 'Studied for 7 consecutive days',
      icon: 'local-fire-department',
      color: '#FF6F00',
      unlocked: true,
    },
    {
      id: '2',
      title: 'First 100',
      description: 'Solved first 100 questions',
      icon: 'quiz',
      color: '#2E7D32',
      unlocked: true,
    },
    {
      id: '3',
      title: 'Speed Demon',
      description: 'Completed a quiz in under 10 minutes',
      icon: 'speed',
      color: '#1565C0',
      unlocked: true,
    },
    {
      id: '4',
      title: 'Perfect Score',
      description: 'Scored 100% in a mock test',
      icon: 'star',
      color: '#7B1FA2',
      unlocked: false,
    },
    {
      id: '5',
      title: 'Knowledge Seeker',
      description: 'Read 50 study materials',
      icon: 'library-books',
      color: '#00695C',
      unlocked: false,
    },
    {
      id: '6',
      title: '30-Day Challenge',
      description: 'Study for 30 consecutive days',
      icon: 'calendar-today',
      color: '#E65100',
      unlocked: false,
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', onPress: () => {/* Handle logout */}},
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your progress will be lost.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', style: 'destructive', onPress: () => {/* Handle delete */}},
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <Card style={styles.profileCard}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <Avatar.Text
              size={80}
              label={user.name.split(' ').map(n => n[0]).join('')}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Text style={styles.joinDate}>
                Member since {user.joinedDate.toLocaleDateString()}
              </Text>
              {user.premium ? (
                <Chip icon="star" mode="flat" style={styles.premiumChip}>
                  Premium Member
                </Chip>
              ) : (
                <Button
                  mode="contained"
                  onPress={() => {/* Navigate to premium */}}
                  style={styles.upgradeButton}
                  compact
                >
                  Upgrade to Premium
                </Button>
              )}
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Stats */}
      <Card style={styles.statsCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Icon name="local-fire-department" size={32} color="#FF6F00" />
              <Text style={styles.statNumber}>{user.studyStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="quiz" size={32} color={theme.colors.primary} />
              <Text style={styles.statNumber}>{user.totalQuestions}</Text>
              <Text style={styles.statLabel}>Questions</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="check-circle" size={32} color={theme.colors.success} />
              <Text style={styles.statNumber}>{user.accuracy}%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Target Exams */}
      <Card style={styles.examCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Target Exams</Text>
          <View style={styles.examChips}>
            {user.targetExams.map((exam, index) => (
              <Chip
                key={index}
                mode="flat"
                style={styles.examChip}
                icon="target"
              >
                {exam}
              </Chip>
            ))}
            <Button
              mode="outlined"
              onPress={() => {/* Edit target exams */}}
              compact
              icon="edit"
            >
              Edit
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Achievements */}
      <Card style={styles.achievementsCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <Text style={styles.sectionSubtitle}>
            {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
          </Text>
          <ProgressBar
            progress={achievements.filter(a => a.unlocked).length / achievements.length}
            color={theme.colors.primary}
            style={styles.achievementProgress}
          />
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                style={[
                  styles.achievementItem,
                  !achievement.unlocked && styles.lockedAchievement,
                ]}
              >
                <Icon
                  name={achievement.icon}
                  size={40}
                  color={achievement.unlocked ? achievement.color : '#CCCCCC'}
                />
                <Text
                  style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.lockedText,
                  ]}
                >
                  {achievement.title}
                </Text>
                <Text
                  style={[
                    styles.achievementDescription,
                    !achievement.unlocked && styles.lockedText,
                  ]}
                >
                  {achievement.description}
                </Text>
                {achievement.unlocked && (
                  <Icon name="check-circle" size={20} color={theme.colors.success} />
                )}
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      {/* Settings */}
      <Card style={styles.settingsCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <List.Item
            title="Notifications"
            description="Get notified about daily goals and updates"
            left={props => <List.Icon {...props} icon="notifications" />}
            right={() => (
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
              />
            )}
          />
          <Divider />
          
          <List.Item
            title="Study Reminders"
            description="Daily reminders to maintain your streak"
            left={props => <List.Icon {...props} icon="schedule" />}
            right={() => (
              <Switch
                value={studyReminders}
                onValueChange={setStudyReminders}
              />
            )}
          />
          <Divider />
          
          <List.Item
            title="Dark Mode"
            description="Switch to dark theme"
            left={props => <List.Icon {...props} icon="dark-mode" />}
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            )}
          />
          <Divider />
          
          <List.Item
            title="Language"
            description="English"
            left={props => <List.Icon {...props} icon="language" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to language settings */}}
          />
          <Divider />
          
          <List.Item
            title="Daily Goal"
            description="50 questions per day"
            left={props => <List.Icon {...props} icon="target" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to goal settings */}}
          />
        </Card.Content>
      </Card>

      {/* Account Actions */}
      <Card style={styles.actionsCard}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <List.Item
            title="Edit Profile"
            left={props => <List.Icon {...props} icon="edit" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to edit profile */}}
          />
          <Divider />
          
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="privacy-tip" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to privacy policy */}}
          />
          <Divider />
          
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="description" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to terms */}}
          />
          <Divider />
          
          <List.Item
            title="Help & Support"
            left={props => <List.Icon {...props} icon="help" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Navigate to help */}}
          />
          <Divider />
          
          <List.Item
            title="Rate App"
            left={props => <List.Icon {...props} icon="star-rate" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => {/* Open app store for rating */}}
          />
        </Card.Content>
      </Card>

      {/* Logout and Delete */}
      <View style={styles.dangerZone}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          style={styles.logoutButton}
          icon="logout"
        >
          Logout
        </Button>
        <Button
          mode="text"
          onPress={handleDeleteAccount}
          style={styles.deleteButton}
          textColor={theme.colors.error}
        >
          Delete Account
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileCard: {
    margin: 16,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: theme.colors.placeholder,
    marginBottom: 4,
  },
  joinDate: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginBottom: 12,
  },
  premiumChip: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-start',
  },
  upgradeButton: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.accent,
  },
  statsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: 4,
  },
  examCard: {
    margin: 16,
    marginTop: 0,
    elevation: 3,
  },
  examChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  examChip: {
    backgroundColor: `${theme.colors.primary}20`,
    marginRight: 8,
    marginBottom: 8,
  },
  achievementsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 3,
  },
  achievementProgress: {
    height: 6,
    borderRadius: 3,
    marginBottom: 20,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: theme.colors.surface,
    marginBottom: 12,
    elevation: 1,
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginTop: 4,
    textAlign: 'center',
  },
  lockedText: {
    color: '#CCCCCC',
  },
  settingsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 3,
  },
  actionsCard: {
    margin: 16,
    marginTop: 0,
    elevation: 3,
  },
  dangerZone: {
    margin: 16,
    marginTop: 0,
    marginBottom: 30,
    alignItems: 'center',
  },
  logoutButton: {
    marginBottom: 12,
    minWidth: 200,
  },
  deleteButton: {
    minWidth: 200,
  },
});

export default ProfileScreen;