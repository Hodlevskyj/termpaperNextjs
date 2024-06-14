import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AvatarComponent from '@/components/Avatar';


describe('AvatarComponent', () => {
    it('renders AvatarImage when src is provided', () => {
        const { getByAltText } = render(<AvatarComponent src="test-image.png" />);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const avatarImage = getByAltText('avatar');
        expect(avatarImage).toBeInTheDocument();
        expect(avatarImage).toHaveAttribute('src', 'test-image.png');
    });

    it('renders RxAvatar icon when src is not provided', () => {
        const { container } = render(<AvatarComponent />);
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const icon = container.querySelector('svg');
        expect(icon).toBeInTheDocument();
    });
});
