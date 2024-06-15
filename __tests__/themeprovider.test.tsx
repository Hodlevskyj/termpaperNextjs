import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';


describe('ThemeProvider Component', () => {
  test('renders children with theme provider props', () => {
    const mockChildren = <div>Test Children</div>;
    const mockTheme = 'dark';

    const { getByText } = render(
      <ThemeProvider enableSystem={false} defaultTheme={mockTheme}>
        {mockChildren}
      </ThemeProvider>
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const childElement = getByText('Test Children');
    expect(childElement).toBeInTheDocument();

  });
});
