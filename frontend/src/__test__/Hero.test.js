import { render, screen } from '@testing-library/react';
import { expect, test } from '@jest/globals';
import Hero from '../components/Landing/Hero';
import { StaticRouter } from 'react-router-dom/server';

test('renders hero section of landing page and test if user can see main title', () => {
  render(
    <StaticRouter>
      <Hero />
    </StaticRouter>,
  );
  expect(
    screen.getByText('Keep your clipboards in sync everywhere'),
  ).toBeInTheDocument();
});

test.skip('if user can see the hero image', async () => {
  render(
    <StaticRouter>
      <Hero />
    </StaticRouter>,
  );
  const heroImage = await screen.findByRole('img');
  expect(heroImage.src).toContain('hero-image.jpg');
});
