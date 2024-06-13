import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { it } from 'node:test';
import '@testing-library/jest-dom'


it('should have Shop Now text', () => {
    render(<Home />);
    
    const myElem = screen.getByText('Shop Now');

    expect(myElem).toBeInTheDocument();
});

