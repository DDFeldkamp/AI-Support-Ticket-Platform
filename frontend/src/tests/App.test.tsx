import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
test('sanity', () => { render(<div>AI Support Ticket Intelligence</div>); expect(screen.getByText(/AI Support/)).toBeInTheDocument(); });
