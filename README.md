# Government Exam Preparation App 📚

A comprehensive React Native mobile application designed for students preparing for Indian government examinations including UPSC, SSC, Banking, Railway, and other competitive exams.

## 🚀 Features

### 📖 Exam Categories
- **UPSC** - Civil Services Examination preparation
- **SSC** - Staff Selection Commission exams
- **Banking** - IBPS, SBI, RBI sector exams
- **Railway** - Railway Recruitment Board exams
- **Defense** - Military and paramilitary exams

### 🎯 Core Functionality
- **Interactive Quiz System** - Practice with timer and scoring
- **Mock Tests** - Full-length practice tests with negative marking
- **Study Materials** - PDFs, notes, videos, and articles
- **Progress Tracking** - Detailed analytics and performance charts
- **Current Affairs** - Daily updates with categorized news
- **Offline Support** - Download content for offline study

### 📊 Progress Analytics
- Weekly and monthly performance charts
- Subject-wise accuracy tracking
- Study streak monitoring
- Time spent analysis
- Achievement system with badges

### 🎨 User Experience
- Modern Material Design interface
- Dark/Light theme support
- Multilingual support (English/Hindi)
- Customizable daily goals
- Push notifications for study reminders

## 🛠️ Technology Stack

- **Frontend**: React Native 0.73.2
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **UI Library**: React Native Paper
- **Charts**: React Native Chart Kit
- **Icons**: React Native Vector Icons
- **Storage**: AsyncStorage + SQLite
- **State Management**: React Hooks

## 📱 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GovExamApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (macOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   ```

5. **Run on Android**
   ```bash
   npm run android
   ```

6. **Run on iOS**
   ```bash
   npm run ios
   ```

## 📂 Project Structure

```
GovExamApp/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── ExamCategoriesScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── MockTestsScreen.tsx
│   │   ├── CurrentAffairsScreen.tsx
│   │   ├── StudyMaterialScreen.tsx
│   │   ├── ProgressScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/         # Navigation configuration
│   ├── services/          # API and data services
│   ├── utils/             # Utility functions and theme
│   ├── types/             # TypeScript type definitions
│   └── data/              # Mock data and constants
├── android/               # Android-specific code
├── ios/                   # iOS-specific code
├── assets/               # Images, fonts, and other assets
└── package.json
```

## 🎯 Key Screens

### 🏠 Home Screen
- Daily progress tracking
- Quick access to quizzes and tests
- Study streak display
- Current affairs preview
- Featured exam categories

### 📚 Exam Categories
- Browse all exam types
- View progress by category
- Access subject-wise content
- Quick practice options

### ❓ Quiz System
- Interactive question interface
- Timer functionality
- Progress tracking
- Detailed explanations
- Category and difficulty filters

### 📊 Progress Analytics
- Performance charts and graphs
- Subject-wise accuracy
- Weekly/monthly trends
- Achievement badges
- Study time tracking

### 📰 Current Affairs
- Daily news updates
- Categorized content
- Search and filter options
- Bookmark functionality
- Importance ratings

## 🔧 Configuration

### Theme Customization
The app uses a custom theme defined in `src/utils/theme.ts`:

```typescript
export const theme = {
  colors: {
    primary: '#2E7D32',    // Green for growth
    accent: '#FF6F00',     // Orange for energy
    upsc: '#1565C0',       // Blue for UPSC
    ssc: '#7B1FA2',        // Purple for SSC
    banking: '#00695C',    // Teal for Banking
    railway: '#E65100',    // Orange for Railway
    // ... more colors
  }
};
```

### Adding New Exam Categories
1. Update `examCategories` in `src/data/examData.ts`
2. Add corresponding questions and subjects
3. Update theme colors if needed
4. Add category-specific icons

## 📈 Data Structure

### Question Format
```typescript
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  subject: string;
  topic: string;
  year?: number;
  source?: string;
}
```

### Progress Tracking
```typescript
interface UserProgress {
  userId: string;
  examCategory: string;
  subject: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  lastStudied: Date;
}
```

## 🚀 Future Enhancements

### Planned Features
- [ ] **Live Classes** - Interactive video sessions
- [ ] **Discussion Forums** - Student community features
- [ ] **AI-Powered Recommendations** - Personalized study plans
- [ ] **Voice-to-Text** - Audio question support
- [ ] **Offline Sync** - Sync progress when online
- [ ] **Premium Features** - Advanced analytics and content
- [ ] **Multi-language Support** - Regional language options
- [ ] **Social Features** - Study groups and competitions

### Technical Improvements
- [ ] **State Management** - Redux/Zustand integration
- [ ] **API Integration** - Backend service connection
- [ ] **Performance Optimization** - Lazy loading and caching
- [ ] **Testing** - Unit and integration tests
- [ ] **CI/CD Pipeline** - Automated deployment
- [ ] **Analytics** - User behavior tracking
- [ ] **Crash Reporting** - Error monitoring
- [ ] **Push Notifications** - Advanced notification system

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Add proper documentation
- Test your changes thoroughly
- Update README if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Gaurav Saha**
- GitHub: [@gauravsaha16](https://github.com/gauravsaha16)
- Email: gaurav@example.com

## 🙏 Acknowledgments

- React Native community for excellent documentation
- Material Design for UI/UX inspiration
- Indian education system for motivation
- All the students preparing for government exams

## 📞 Support

If you encounter any issues or have questions:

1. **Check the FAQ** in the app's Help section
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Contact support** through the app's feedback feature

---

**Made with ❤️ for Indian students aspiring for government jobs**

*"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela*
