import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {Card, Button, ProgressBar, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../utils/theme';
import {sampleQuestions} from '../data/examData';
import {Question} from '../types';

interface Props {
  navigation: any;
  route: any;
}

const QuizScreen: React.FC<Props> = ({navigation, route}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [quizQuestions] = useState<Question[]>(sampleQuestions.slice(0, 10)); // 10 questions for demo

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    Alert.alert(
      'Submit Quiz',
      'Are you sure you want to submit your quiz?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Submit',
          onPress: () => {
            // Calculate results
            let correctAnswers = 0;
            quizQuestions.forEach((question, index) => {
              if (selectedAnswers[index] === question.correctAnswer) {
                correctAnswers++;
              }
            });
            
            navigation.navigate('QuizResult', {
              totalQuestions: quizQuestions.length,
              correctAnswers,
              incorrectAnswers: Object.keys(selectedAnswers).length - correctAnswers,
              unattempted: quizQuestions.length - Object.keys(selectedAnswers).length,
              timeSpent: 1800 - timeLeft,
              questions: quizQuestions,
              userAnswers: selectedAnswers,
            });
          },
        },
      ]
    );
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / quizQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.questionCounter}>
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </Text>
          <Chip icon="schedule" mode="outlined" compact>
            {formatTime(timeLeft)}
          </Chip>
        </View>
        <ProgressBar progress={progress} color={theme.colors.primary} style={styles.progressBar} />
      </View>

      {/* Question */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.questionCard}>
          <Card.Content>
            <View style={styles.questionHeader}>
              <Chip icon="quiz" mode="flat" compact style={styles.categoryChip}>
                {currentQuestion.category.toUpperCase()}
              </Chip>
              <Chip
                mode="flat"
                compact
                style={[
                  styles.difficultyChip,
                  {
                    backgroundColor:
                      currentQuestion.difficulty === 'easy'
                        ? '#E8F5E8'
                        : currentQuestion.difficulty === 'medium'
                        ? '#FFF3E0'
                        : '#FFEBEE',
                  },
                ]}
              >
                {currentQuestion.difficulty.toUpperCase()}
              </Chip>
            </View>
            
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
            
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswers[currentQuestionIndex] === index && styles.selectedOption,
                  ]}
                  onPress={() => handleAnswerSelect(index)}
                >
                  <View style={styles.optionContent}>
                    <View
                      style={[
                        styles.optionCircle,
                        selectedAnswers[currentQuestionIndex] === index && styles.selectedCircle,
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionLabel,
                          selectedAnswers[currentQuestionIndex] === index && styles.selectedLabel,
                        ]}
                      >
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        selectedAnswers[currentQuestionIndex] === index && styles.selectedOptionText,
                      ]}
                    >
                      {option}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navigation}>
        <View style={styles.navigationButtons}>
          <Button
            mode="outlined"
            onPress={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            style={styles.navButton}
          >
            Previous
          </Button>
          
          <View style={styles.centerInfo}>
            <Text style={styles.answeredText}>
              {answeredCount}/{quizQuestions.length} answered
            </Text>
          </View>
          
          {currentQuestionIndex === quizQuestions.length - 1 ? (
            <Button
              mode="contained"
              onPress={handleSubmitQuiz}
              style={[styles.navButton, {backgroundColor: theme.colors.success}]}
            >
              Submit
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={handleNextQuestion}
              style={styles.navButton}
            >
              Next
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionCard: {
    elevation: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryChip: {
    backgroundColor: `${theme.colors.primary}20`,
  },
  difficultyChip: {},
  questionText: {
    fontSize: 18,
    lineHeight: 26,
    color: theme.colors.text,
    marginBottom: 24,
    fontWeight: '500',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    backgroundColor: theme.colors.surface,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  selectedCircle: {
    backgroundColor: theme.colors.primary,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  selectedLabel: {
    color: 'white',
  },
  optionText: {
    fontSize: 16,
    color: theme.colors.text,
    flex: 1,
    lineHeight: 22,
  },
  selectedOptionText: {
    fontWeight: '500',
  },
  navigation: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    minWidth: 100,
  },
  centerInfo: {
    alignItems: 'center',
  },
  answeredText: {
    fontSize: 14,
    color: theme.colors.placeholder,
    fontWeight: '500',
  },
});

export default QuizScreen;