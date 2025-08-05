import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Card, Button, Chip, Searchbar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../utils/theme';
import {mockTests, examCategories} from '../data/examData';

interface Props {
  navigation: any;
}

const MockTestsScreen: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTests = mockTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || test.examCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (categoryId: string) => {
    const category = examCategories.find(cat => cat.id === categoryId);
    return category?.color || theme.colors.primary;
  };

  const renderMockTest = ({item}: {item: any}) => {
    const categoryColor = getCategoryColor(item.examCategory);
    
    return (
      <Card style={[styles.testCard, {borderLeftColor: categoryColor}]}>
        <Card.Content>
          <View style={styles.testHeader}>
            <View style={styles.testInfo}>
              <Text style={styles.testName}>{item.name}</Text>
              <Text style={styles.testDescription}>{item.description}</Text>
            </View>
            <Chip
              icon="schedule"
              mode="outlined"
              compact
              style={styles.durationChip}
            >
              {item.duration}m
            </Chip>
          </View>

          <View style={styles.testDetails}>
            <View style={styles.detailItem}>
              <Icon name="quiz" size={16} color={theme.colors.placeholder} />
              <Text style={styles.detailText}>{item.totalQuestions} Questions</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name="category" size={16} color={theme.colors.placeholder} />
              <Text style={styles.detailText}>{item.examCategory.toUpperCase()}</Text>
            </View>
            <View style={styles.detailItem}>
              <Icon name={item.negativeMarking ? 'remove' : 'check'} size={16} color={item.negativeMarking ? theme.colors.error : theme.colors.success} />
              <Text style={styles.detailText}>
                {item.negativeMarking ? `Negative: -${item.negativeMarkingRatio}` : 'No Negative'}
              </Text>
            </View>
          </View>

          <View style={styles.testActions}>
            <Button
              mode="contained"
              onPress={() => navigation.navigate('Quiz', {mockTest: item})}
              style={[styles.actionButton, {backgroundColor: categoryColor}]}
              compact
            >
              Start Test
            </Button>
            <Button
              mode="outlined"
              onPress={() => {/* Show test details */}}
              style={styles.actionButton}
              compact
            >
              View Details
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <Searchbar
          placeholder="Search mock tests..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        <View style={styles.filterChips}>
          <TouchableOpacity
            onPress={() => setSelectedCategory('all')}
          >
            <Chip
              selected={selectedCategory === 'all'}
              onPress={() => setSelectedCategory('all')}
              style={styles.filterChip}
            >
              All
            </Chip>
          </TouchableOpacity>
          {examCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Chip
                selected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
                style={[
                  styles.filterChip,
                  selectedCategory === category.id && {backgroundColor: `${category.color}20`}
                ]}
              >
                {category.name}
              </Chip>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Mock Tests List */}
      <FlatList
        data={filteredTests}
        renderItem={renderMockTest}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="quiz" size={64} color={theme.colors.placeholder} />
            <Text style={styles.emptyText}>No mock tests found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchSection: {
    padding: 16,
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  searchBar: {
    marginBottom: 16,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  listContainer: {
    padding: 16,
  },
  testCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 3,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  testInfo: {
    flex: 1,
    marginRight: 12,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  testDescription: {
    fontSize: 14,
    color: theme.colors.placeholder,
    lineHeight: 20,
  },
  durationChip: {
    alignSelf: 'flex-start',
  },
  testDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginLeft: 6,
    fontWeight: '500',
  },
  testActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: theme.colors.placeholder,
    textAlign: 'center',
  },
});

export default MockTestsScreen;