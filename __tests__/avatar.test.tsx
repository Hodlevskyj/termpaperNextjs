/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AvatarComponent from '@/components/Avatar';


describe('AvatarComponent', () => {
    it('renders AvatarImage when src is provided', () => {
        const { getByAltText } = render(<AvatarComponent src="https://example.com/avatar.jpg" />);
        const avatarImage = getByAltText('avatar');
        expect(avatarImage).toBeInTheDocument();
        expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('renders RxAvatar when src is not provided', () => {
        const { container } = render(<AvatarComponent src={null} />);
        // eslint-disable-next-line testing-library/no-node-access
        const rxAvatar = container.querySelector('svg');
        expect(rxAvatar).toBeInTheDocument();
    });

    it('renders RxAvatar when src is undefined', () => {
        const { container } = render(<AvatarComponent src={undefined} />);
        const rxAvatar = container.querySelector('svg');
        expect(rxAvatar).toBeInTheDocument();
    });
});
