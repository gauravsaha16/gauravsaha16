import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Card, ProgressBar, Chip, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../utils/theme';
import {examCategories} from '../data/examData';

interface Props {
  navigation: any;
}

const ExamCategoriesScreen: React.FC<Props> = ({navigation}) => {
  const renderExamCategory = ({item}: {item: any}) => {
    const progress = Math.random() * 0.8; // Mock progress data
    const completedSubjects = Math.floor(item.subjects.length * progress);

    return (
      <Card style={[styles.card, {borderLeftColor: item.color}]}>
        <Card.Content>
          <View style={styles.cardHeader}>
            <View style={styles.examInfo}>
              <Icon name={item.icon} size={40} color={item.color} />
              <View style={styles.examDetails}>
                <Text style={styles.examName}>{item.name}</Text>
                <Text style={styles.examDescription}>{item.description}</Text>
              </View>
            </View>
            <Chip
              icon="quiz"
              mode="outlined"
              compact
              style={styles.questionsChip}
            >
              {item.totalQuestions.toLocaleString()}
            </Chip>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progress</Text>
              <Text style={styles.progressText}>
                {completedSubjects}/{item.subjects.length} subjects
              </Text>
            </View>
            <ProgressBar
              progress={progress}
              color={item.color}
              style={styles.progressBar}
            />
          </View>

          <View style={styles.subjectsPreview}>
            <Text style={styles.subjectsLabel}>Subjects:</Text>
            <View style={styles.subjectsContainer}>
              {item.subjects.slice(0, 3).map((subject: any, index: number) => (
                <Chip
                  key={subject.id}
                  mode="flat"
                  compact
                  style={[styles.subjectChip, {backgroundColor: `${item.color}20`}]}
                >
                  {subject.name}
                </Chip>
              ))}
              {item.subjects.length > 3 && (
                <Chip mode="flat" compact style={styles.moreChip}>
                  +{item.subjects.length - 3} more
                </Chip>
              )}
            </View>
          </View>

          <View style={styles.cardActions}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Quiz', {category: item.id})}
              style={[styles.actionButton, {backgroundColor: item.color}]}
              compact
            >
              Practice Now
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('StudyMaterial', {category: item.id})}
              style={styles.actionButton}
              compact
            >
              Study Material
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={examCategories}
        renderItem={renderExamCategory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  examInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  examDetails: {
    marginLeft: 15,
    flex: 1,
  },
  examName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 5,
  },
  examDescription: {
    fontSize: 14,
    color: theme.colors.placeholder,
    lineHeight: 20,
  },
  questionsChip: {
    marginLeft: 10,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  progressText: {
    fontSize: 14,
    color: theme.colors.placeholder,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  subjectsPreview: {
    marginBottom: 20,
  },
  subjectsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 10,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  subjectChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  moreChip: {
    backgroundColor: theme.colors.surface,
    marginRight: 8,
    marginBottom: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
  },
});

export default ExamCategoriesScreen;