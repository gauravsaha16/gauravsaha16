import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Card, ProgressBar, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LineChart, PieChart, BarChart} from 'react-native-chart-kit';

import {theme} from '../utils/theme';
import {examCategories} from '../data/examData';

const {width} = Dimensions.get('window');

interface Props {
  navigation: any;
}

const ProgressScreen: React.FC<Props> = ({navigation}) => {
  // Mock data for demonstration
  const overallStats = {
    totalQuestions: 1250,
    correctAnswers: 892,
    incorrectAnswers: 358,
    accuracy: 71.4,
    timeSpent: 2340, // minutes
    streak: 7,
  };

  const weeklyProgress = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      data: [20, 35, 28, 45, 32, 25, 40],
      color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
      strokeWidth: 3,
    }],
  };

  const subjectWiseData = [
    {
      name: 'History',
      population: 85,
      color: '#1565C0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Geography',
      population: 72,
      color: '#7B1FA2',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Polity',
      population: 68,
      color: '#00695C',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Economics',
      population: 59,
      color: '#E65100',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const monthlyTestScores = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [65, 72, 68, 78, 85, 82],
    }],
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Overall Stats Cards */}
      <View style={styles.statsGrid}>
        <Card style={[styles.statCard, styles.primaryCard]}>
          <Card.Content>
            <View style={styles.statContent}>
              <Icon name="quiz" size={32} color="white" />
              <View style={styles.statText}>
                <Text style={styles.statNumber}>{overallStats.totalQuestions}</Text>
                <Text style={styles.statLabel}>Questions Solved</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, styles.successCard]}>
          <Card.Content>
            <View style={styles.statContent}>
              <Icon name="check-circle" size={32} color="white" />
              <View style={styles.statText}>
                <Text style={styles.statNumber}>{overallStats.accuracy}%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, styles.warningCard]}>
          <Card.Content>
            <View style={styles.statContent}>
              <Icon name="local-fire-department" size={32} color="white" />
              <View style={styles.statText}>
                <Text style={styles.statNumber}>{overallStats.streak}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, styles.infoCard]}>
          <Card.Content>
            <View style={styles.statContent}>
              <Icon name="schedule" size={32} color="white" />
              <View style={styles.statText}>
                <Text style={styles.statNumber}>{Math.floor(overallStats.timeSpent / 60)}h</Text>
                <Text style={styles.statLabel}>Time Spent</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Weekly Progress Chart */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Weekly Progress</Text>
          <Text style={styles.chartSubtitle}>Questions solved per day</Text>
          <LineChart
            data={weeklyProgress}
            width={width - 64}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Subject-wise Performance */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Subject-wise Performance</Text>
          <Text style={styles.chartSubtitle}>Accuracy percentage by subject</Text>
          <PieChart
            data={subjectWiseData}
            width={width - 64}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      {/* Monthly Test Scores */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Monthly Test Scores</Text>
          <Text style={styles.chartSubtitle}>Average scores in mock tests</Text>
          <BarChart
            data={monthlyTestScores}
            width={width - 64}
            height={200}
            chartConfig={chartConfig}
            style={styles.chart}
            yAxisSuffix="%"
          />
        </Card.Content>
      </Card>

      {/* Exam Category Progress */}
      <Card style={styles.progressCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Exam Category Progress</Text>
          <Text style={styles.chartSubtitle}>Your progress across different exams</Text>
          
          {examCategories.slice(0, 4).map((exam, index) => {
            const progress = Math.random() * 0.8 + 0.1; // Mock progress
            const completedQuestions = Math.floor(exam.totalQuestions * progress);
            
            return (
              <View key={exam.id} style={styles.progressItem}>
                <View style={styles.progressHeader}>
                  <View style={styles.examInfo}>
                    <Icon name={exam.icon} size={24} color={exam.color} />
                    <Text style={styles.examName}>{exam.name}</Text>
                  </View>
                  <Chip
                    mode="outlined"
                    compact
                    style={[styles.progressChip, {borderColor: exam.color}]}
                  >
                    {Math.floor(progress * 100)}%
                  </Chip>
                </View>
                <ProgressBar
                  progress={progress}
                  color={exam.color}
                  style={styles.examProgressBar}
                />
                <Text style={styles.progressText}>
                  {completedQuestions.toLocaleString()} / {exam.totalQuestions.toLocaleString()} questions
                </Text>
              </View>
            );
          })}
        </Card.Content>
      </Card>

      {/* Recent Activity */}
      <Card style={styles.activityCard}>
        <Card.Content>
          <Text style={styles.chartTitle}>Recent Activity</Text>
          <Text style={styles.chartSubtitle}>Your learning activity this week</Text>
          
          {[
            {day: 'Today', questions: 25, time: 45, accuracy: 84},
            {day: 'Yesterday', questions: 32, time: 58, accuracy: 78},
            {day: '2 days ago', questions: 18, time: 32, accuracy: 89},
            {day: '3 days ago', questions: 41, time: 72, accuracy: 76},
          ].map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityDay}>
                <Text style={styles.dayText}>{activity.day}</Text>
              </View>
              <View style={styles.activityStats}>
                <View style={styles.activityStat}>
                  <Icon name="quiz" size={16} color={theme.colors.primary} />
                  <Text style={styles.activityStatText}>{activity.questions}</Text>
                </View>
                <View style={styles.activityStat}>
                  <Icon name="schedule" size={16} color={theme.colors.accent} />
                  <Text style={styles.activityStatText}>{activity.time}m</Text>
                </View>
                <View style={styles.activityStat}>
                  <Icon name="check-circle" size={16} color={theme.colors.success} />
                  <Text style={styles.activityStatText}>{activity.accuracy}%</Text>
                </View>
              </View>
            </View>
          ))}
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  statCard: {
    width: (width - 44) / 2,
    elevation: 3,
  },
  primaryCard: {
    backgroundColor: theme.colors.primary,
  },
  successCard: {
    backgroundColor: theme.colors.success,
  },
  warningCard: {
    backgroundColor: theme.colors.accent,
  },
  infoCard: {
    backgroundColor: theme.colors.info,
  },
  statContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 12,
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  chartCard: {
    margin: 16,
    marginTop: 0,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginBottom: 16,
  },
  chart: {
    borderRadius: 8,
  },
  progressCard: {
    margin: 16,
    marginTop: 0,
    elevation: 3,
  },
  progressItem: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  examInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  examName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginLeft: 8,
  },
  progressChip: {
    height: 28,
  },
  examProgressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 6,
  },
  progressText: {
    fontSize: 12,
    color: theme.colors.placeholder,
  },
  activityCard: {
    margin: 16,
    marginTop: 0,
    marginBottom: 30,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityDay: {
    width: 80,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  activityStats: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  activityStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityStatText: {
    fontSize: 14,
    color: theme.colors.text,
    marginLeft: 4,
    fontWeight: '500',
  },
});

export default ProgressScreen;