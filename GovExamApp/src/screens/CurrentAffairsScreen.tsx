import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Card, Chip, Searchbar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../utils/theme';
import {currentAffairs} from '../data/examData';

interface Props {
  navigation: any;
}

const CurrentAffairsScreen: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(currentAffairs.map(item => item.category)))];

  const filteredNews = currentAffairs.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return theme.colors.error;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.info;
      default: return theme.colors.placeholder;
    }
  };

  const renderNewsItem = ({item}: {item: any}) => {
    return (
      <Card style={styles.newsCard}>
        <Card.Content>
          <View style={styles.newsHeader}>
            <View style={styles.newsMetadata}>
              <Chip
                icon="schedule"
                mode="outlined"
                compact
                style={styles.dateChip}
              >
                {item.date.toLocaleDateString()}
              </Chip>
              <Chip
                mode="flat"
                compact
                style={[
                  styles.importanceChip,
                  {backgroundColor: `${getImportanceColor(item.importance)}20`}
                ]}
              >
                {item.importance.toUpperCase()}
              </Chip>
            </View>
          </View>

          <Text style={styles.newsTitle}>{item.title}</Text>
          <Text style={styles.newsContent}>{item.content}</Text>

          <View style={styles.newsFooter}>
            <View style={styles.categorySection}>
              <Icon name="category" size={16} color={theme.colors.primary} />
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            
            <View style={styles.tagsSection}>
              {item.tags.slice(0, 3).map((tag: string, index: number) => (
                <Chip
                  key={index}
                  mode="outlined"
                  compact
                  style={styles.tagChip}
                >
                  {tag}
                </Chip>
              ))}
              {item.tags.length > 3 && (
                <Text style={styles.moreTags}>+{item.tags.length - 3} more</Text>
              )}
            </View>
          </View>

          <View style={styles.newsActions}>
            <Button
              mode="outlined"
              onPress={() => {/* Share news */}}
              compact
              icon="share"
            >
              Share
            </Button>
            <Button
              mode="contained"
              onPress={() => {/* Save for later */}}
              compact
              icon="bookmark"
              style={styles.saveButton}
            >
              Save
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
          placeholder="Search current affairs..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        <View style={styles.filterChips}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
            >
              <Chip
                selected={selectedCategory === category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.filterChip,
                  selectedCategory === category && {backgroundColor: `${theme.colors.primary}20`}
                ]}
              >
                {category === 'all' ? 'All' : category}
              </Chip>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* News List */}
      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="article" size={64} color={theme.colors.placeholder} />
            <Text style={styles.emptyText}>No news found</Text>
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
  newsCard: {
    marginBottom: 16,
    elevation: 3,
  },
  newsHeader: {
    marginBottom: 12,
  },
  newsMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateChip: {
    height: 28,
  },
  importanceChip: {
    height: 28,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 12,
    lineHeight: 24,
  },
  newsContent: {
    fontSize: 15,
    color: theme.colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  newsFooter: {
    marginBottom: 16,
  },
  categorySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
    marginLeft: 6,
  },
  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },
  tagChip: {
    height: 28,
    marginRight: 6,
    marginBottom: 6,
  },
  moreTags: {
    fontSize: 12,
    color: theme.colors.placeholder,
    fontStyle: 'italic',
  },
  newsActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
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

export default CurrentAffairsScreen;