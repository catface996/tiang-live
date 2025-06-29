import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import ScanDetail from './ScanDetail';

// Mock the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    dataSourceId: 'test-datasource-id'
  }),
  useNavigate: () => jest.fn()
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>{component}</I18nextProvider>
    </BrowserRouter>
  );
};

describe('ScanDetail Internationalization', () => {
  beforeEach(() => {
    // Reset language to Chinese
    i18n.changeLanguage('zh');
  });

  test('renders Chinese text correctly', async () => {
    renderWithProviders(<ScanDetail />);

    // Wait for component to load
    await screen.findByText('刷新');

    // Check if Chinese text is rendered
    expect(screen.getByText('刷新')).toBeInTheDocument();
    expect(screen.getByText('开始扫描')).toBeInTheDocument();
    expect(screen.getByText('导出实体')).toBeInTheDocument();
  });

  test('renders English text correctly', async () => {
    // Change language to English
    i18n.changeLanguage('en');

    renderWithProviders(<ScanDetail />);

    // Wait for component to load
    await screen.findByText('Refresh');

    // Check if English text is rendered
    expect(screen.getByText('Refresh')).toBeInTheDocument();
    expect(screen.getByText('Start Scan')).toBeInTheDocument();
    expect(screen.getByText('Export Entities')).toBeInTheDocument();
  });

  test('entity type translations work correctly', () => {
    const component = renderWithProviders(<ScanDetail />);

    // Test would need to be expanded to check entity type translations
    // This is a basic structure for testing internationalization
  });
});
