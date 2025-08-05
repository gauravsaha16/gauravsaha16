import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Card, Button, ProgressBar, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import {theme} from '../utils/theme';
import {examCategories, currentAffairs} from '../data/examData';

const {width} = Dimensions.get('window');

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const todayProgress = 0.65; // 65% of daily goal completed
  const dailyGoal = 50; // questions per day
  const completedToday = 32;

  const featuredExams = examCategories.slice(0, 4);
  const latestNews = currentAffairs.slice(0, 3);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Gradient */}
      <LinearGradient
        colors={[theme.colors.primary, '#4CAF50']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good Morning! 📚</Text>
          <Text style={styles.subtitle}>Ready to achieve your goals?</Text>
        </View>
      </LinearGradient>

      {/* Daily Progress Card */}
      <Card style={styles.progressCard}>
        <Card.Content>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Today's Progress</Text>
            <Chip icon="target" mode="outlined" compact>
              {completedToday}/{dailyGoal}
            </Chip>
          </View>
          <ProgressBar
            progress={todayProgress}
            color={theme.colors.success}
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {completedToday} questions completed • {dailyGoal - completedToday} more to go!
          </Text>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: theme.colors.primary}]}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Icon name="quiz" size={24} color="white" />
          <Text style={styles.actionText}>Quick Quiz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: theme.colors.accent}]}
          onPress={() => navigation.navigate('MockTests')}
        >
          <Icon name="assignment" size={24} color="white" />
          <Text style={styles.actionText}>Mock Test</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, {backgroundColor: theme.colors.info}]}
          onPress={() => navigation.navigate('Progress')}
        >
          <Icon name="trending-up" size={24} color="white" />
          <Text style={styles.actionText}>Progress</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Exam Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Exam Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {featuredExams.map((exam) => (
            <Card key={exam.id} style={[styles.examCard, {borderLeftColor: exam.color}]}>
              <Card.Content>
                <View style={styles.examHeader}>
                  <Icon name={exam.icon} size={32} color={exam.color} />
                  <Text style={styles.examName}>{exam.name}</Text>
                </View>
                <Text style={styles.examDescription}>{exam.description}</Text>
                <Text style={styles.examQuestions}>
                  {exam.totalQuestions.toLocaleString()} Questions
                </Text>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('Categories')}
                  style={[styles.examButton, {backgroundColor: exam.color}]}
                  compact
                >
                  Start Learning
                </Button>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>

      {/* Current Affairs Preview */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Current Affairs</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CurrentAffairs')}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {latestNews.map((news) => (
          <Card key={news.id} style={styles.newsCard}>
            <Card.Content>
              <View style={styles.newsHeader}>
                <Chip
                  icon="schedule"
                  mode="outlined"
                  compact
                  style={styles.dateChip}
                >
                  {news.date.toLocaleDateString()}
                </Chip>
                <Chip
                  mode="flat"
                  compact
                  style={[
                    styles.importanceChip,
                    {backgroundColor: news.importance === 'high' ? '#FFEBEE' : '#F3E5F5'}
                  ]}
                >
                  {news.importance.toUpperCase()}
                </Chip>
              </View>
              <Text style={styles.newsTitle}>{news.title}</Text>
              <Text style={styles.newsContent} numberOfLines={2}>
                {news.content}
              </Text>
              <Text style={styles.newsCategory}>{news.category}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Study Streak */}
      <Card style={styles.streakCard}>
        <Card.Content>
          <View style={styles.streakContent}>
            <Icon name="local-fire-department" size={40} color="#FF6F00" />
            <View style={styles.streakInfo}>
              <Text style={styles.streakTitle}>Study Streak</Text>
              <Text style={styles.streakDays}>7 Days 🔥</Text>
              <Text style={styles.streakText}>Keep it up! You're doing great!</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressCard: {
    margin: 16,
    marginTop: -20,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: theme.colors.placeholder,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  actionButton: {
    width: width * 0.28,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  viewAll: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  examCard: {
    width: 200,
    marginLeft: 16,
    marginRight: 8,
    borderLeftWidth: 4,
    elevation: 2,
  },
  examHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  examName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: theme.colors.text,
  },
  examDescription: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginBottom: 8,
  },
  examQuestions: {
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 15,
  },
  examButton: {
    borderRadius: 20,
  },
  newsCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 2,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dateChip: {
    height: 28,
  },
  importanceChip: {
    height: 28,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 14,
    color: theme.colors.placeholder,
    lineHeight: 20,
    marginBottom: 8,
  },
  newsCategory: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  streakCard: {
    margin: 16,
    marginBottom: 30,
    elevation: 2,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakInfo: {
    marginLeft: 15,
    flex: 1,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  streakDays: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginVertical: 5,
  },
  streakText: {
    fontSize: 14,
    color: theme.colors.placeholder,
  },
});

export default HomeScreen;