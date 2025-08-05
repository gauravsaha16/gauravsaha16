import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2E7D32', // Green - representing growth and success
    accent: '#FF6F00', // Orange - representing energy and enthusiasm  
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#212121',
    placeholder: '#757575',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#FF5722',
    error: '#D32F2F',
    success: '#388E3C',
    warning: '#F57C00',
    info: '#1976D2',
    // Custom colors for exam categories
    upsc: '#1565C0', // Blue for UPSC
    ssc: '#7B1FA2', // Purple for SSC
    banking: '#00695C', // Teal for Banking
    railway: '#E65100', // Deep Orange for Railway
    defense: '#4E342E', // Brown for Defense
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'System',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700' as const,
    },
  },
};