import { expect, test } from '@jest/globals';
import { createRenderer } from 'react-test-renderer/shallow';
import { StaticRouter } from 'react-router-dom/server';
import LandingPage from '../components/Landing/LandingPage';

test('renders landing page correctly', () => {
  const view = createRenderer();
  view.render(
    <StaticRouter>
      <LandingPage />
    </StaticRouter>,
  );
  expect(view.getRenderOutput()).toMatchSnapshot();
});
