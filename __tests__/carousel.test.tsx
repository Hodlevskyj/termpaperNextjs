import React from 'react';
import { render } from '@testing-library/react';
import FormWraper from '../src/components/FormWraper';

describe('FormWraper component', () => {
  it('renders children correctly', () => {
    const { getByTestId } = render(
      <FormWraper>
        <div data-testid="test-child">Test Child</div>
      </FormWraper>
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const childElement = getByTestId('test-child');
    expect(childElement).toHaveTextContent('Test Child');
  });

  it('applies correct styles', () => {
    const { container } = render(
      <FormWraper>
        <div data-testid="test-child">Test Child</div>
      </FormWraper>
    );
    // eslint-disable-next-line testing-library/no-node-access
    const formWrapperElement = container.firstChild;
    expect(formWrapperElement).toHaveClass('min-h-fit');
  });
});
