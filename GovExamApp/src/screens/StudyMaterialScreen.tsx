import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Card, Button, Chip, Searchbar, FAB} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {theme} from '../utils/theme';
import {examCategories} from '../data/examData';

interface Props {
  navigation: any;
  route: any;
}

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'notes' | 'video' | 'article';
  category: string;
  subject: string;
  topic: string;
  size?: string;
  duration?: string;
  downloadUrl?: string;
  isDownloaded: boolean;
  isFavorite: boolean;
  lastAccessed?: Date;
}

const StudyMaterialScreen: React.FC<Props> = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(route?.params?.category || 'all');

  // Mock study materials data
  const studyMaterials: StudyMaterial[] = [
    {
      id: '1',
      title: 'Ancient Indian History - Complete Notes',
      description: 'Comprehensive notes covering Indus Valley Civilization to Gupta Empire',
      type: 'pdf',
      category: 'upsc',
      subject: 'History',
      topic: 'Ancient History',
      size: '2.5 MB',
      isDownloaded: true,
      isFavorite: true,
      lastAccessed: new Date('2024-01-10'),
    },
    {
      id: '2',
      title: 'Indian Constitution - Video Lectures',
      description: 'Detailed video series on Constitutional provisions and amendments',
      type: 'video',
      category: 'upsc',
      subject: 'Polity',
      topic: 'Constitution',
      duration: '4h 30m',
      isDownloaded: false,
      isFavorite: false,
    },
    {
      id: '3',
      title: 'Quantitative Aptitude - Quick Notes',
      description: 'Formula sheets and shortcuts for competitive exam math',
      type: 'notes',
      category: 'ssc',
      subject: 'Mathematics',
      topic: 'Quantitative Aptitude',
      size: '1.2 MB',
      isDownloaded: true,
      isFavorite: true,
    },
    {
      id: '4',
      title: 'Banking Awareness - Current Updates',
      description: 'Latest banking sector developments and RBI guidelines',
      type: 'article',
      category: 'banking',
      subject: 'Banking',
      topic: 'Current Affairs',
      isDownloaded: false,
      isFavorite: false,
      lastAccessed: new Date('2024-01-08'),
    },
    {
      id: '5',
      title: 'Modern Indian History - Timeline',
      description: 'Important events from 1857 to Independence with dates',
      type: 'pdf',
      category: 'upsc',
      subject: 'History',
      topic: 'Modern History',
      size: '3.1 MB',
      isDownloaded: false,
      isFavorite: true,
    },
  ];

  const materialTypes = ['all', 'pdf', 'notes', 'video', 'article'];

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || material.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return 'picture-as-pdf';
      case 'notes': return 'note';
      case 'video': return 'play-circle-outline';
      case 'article': return 'article';
      default: return 'description';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return theme.colors.error;
      case 'notes': return theme.colors.primary;
      case 'video': return theme.colors.accent;
      case 'article': return theme.colors.info;
      default: return theme.colors.placeholder;
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = examCategories.find(cat => cat.id === categoryId);
    return category?.color || theme.colors.primary;
  };

  const renderMaterial = ({item}: {item: StudyMaterial}) => {
    const typeColor = getTypeColor(item.type);
    const categoryColor = getCategoryColor(item.category);

    return (
      <Card style={[styles.materialCard, {borderLeftColor: categoryColor}]}>
        <Card.Content>
          <View style={styles.materialHeader}>
            <View style={styles.materialInfo}>
              <View style={styles.titleRow}>
                <Icon name={getTypeIcon(item.type)} size={24} color={typeColor} />
                <Text style={styles.materialTitle}>{item.title}</Text>
                {item.isFavorite && (
                  <Icon name="favorite" size={20} color={theme.colors.error} />
                )}
              </View>
              <Text style={styles.materialDescription}>{item.description}</Text>
            </View>
          </View>

          <View style={styles.materialMeta}>
            <Chip
              icon="category"
              mode="outlined"
              compact
              style={[styles.metaChip, {borderColor: categoryColor}]}
            >
              {item.category.toUpperCase()}
            </Chip>
            <Chip
              mode="outlined"
              compact
              style={styles.metaChip}
            >
              {item.subject}
            </Chip>
            <Chip
              mode="outlined"
              compact
              style={styles.metaChip}
            >
              {item.type.toUpperCase()}
            </Chip>
          </View>

          <View style={styles.materialDetails}>
            {item.size && (
              <View style={styles.detailItem}>
                <Icon name="storage" size={16} color={theme.colors.placeholder} />
                <Text style={styles.detailText}>{item.size}</Text>
              </View>
            )}
            {item.duration && (
              <View style={styles.detailItem}>
                <Icon name="schedule" size={16} color={theme.colors.placeholder} />
                <Text style={styles.detailText}>{item.duration}</Text>
              </View>
            )}
            {item.lastAccessed && (
              <View style={styles.detailItem}>
                <Icon name="access-time" size={16} color={theme.colors.placeholder} />
                <Text style={styles.detailText}>
                  {item.lastAccessed.toLocaleDateString()}
                </Text>
              </View>
            )}
            <View style={styles.detailItem}>
              <Icon 
                name={item.isDownloaded ? 'cloud-done' : 'cloud-download'} 
                size={16} 
                color={item.isDownloaded ? theme.colors.success : theme.colors.placeholder} 
              />
              <Text style={styles.detailText}>
                {item.isDownloaded ? 'Downloaded' : 'Online'}
              </Text>
            </View>
          </View>

          <View style={styles.materialActions}>
            <Button
              mode="contained"
              onPress={() => {/* Open material */}}
              style={[styles.actionButton, {backgroundColor: typeColor}]}
              compact
            >
              {item.type === 'video' ? 'Watch' : 'Read'}
            </Button>
            {!item.isDownloaded && (
              <Button
                mode="outlined"
                onPress={() => {/* Download material */}}
                style={styles.actionButton}
                compact
                icon="download"
              >
                Download
              </Button>
            )}
            <Button
              mode="text"
              onPress={() => {/* Toggle favorite */}}
              compact
              icon={item.isFavorite ? 'favorite' : 'favorite-border'}
            >
              {item.isFavorite ? 'Saved' : 'Save'}
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
          placeholder="Search study materials..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Type:</Text>
          <View style={styles.filterChips}>
            {materialTypes.map(type => (
              <TouchableOpacity
                key={type}
                onPress={() => setSelectedType(type)}
              >
                <Chip
                  selected={selectedType === type}
                  onPress={() => setSelectedType(type)}
                  style={[
                    styles.filterChip,
                    selectedType === type && {backgroundColor: `${theme.colors.primary}20`}
                  ]}
                  icon={type !== 'all' ? getTypeIcon(type) : undefined}
                >
                  {type === 'all' ? 'All' : type.toUpperCase()}
                </Chip>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>Category:</Text>
          <View style={styles.filterChips}>
            <TouchableOpacity onPress={() => setSelectedCategory('all')}>
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
      </View>

      {/* Materials List */}
      <FlatList
        data={filteredMaterials}
        renderItem={renderMaterial}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="library-books" size={64} color={theme.colors.placeholder} />
            <Text style={styles.emptyText}>No study materials found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <FAB
        icon="add"
        style={styles.fab}
        onPress={() => {/* Add new material */}}
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
  filterSection: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
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
  materialCard: {
    marginBottom: 16,
    borderLeftWidth: 4,
    elevation: 3,
  },
  materialHeader: {
    marginBottom: 12,
  },
  materialInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: 8,
    flex: 1,
  },
  materialDescription: {
    fontSize: 14,
    color: theme.colors.placeholder,
    lineHeight: 20,
  },
  materialMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  metaChip: {
    height: 28,
  },
  materialDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 12,
    color: theme.colors.placeholder,
    marginLeft: 4,
    fontWeight: '500',
  },
  materialActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
});

export default StudyMaterialScreen;