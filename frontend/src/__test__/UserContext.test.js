import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { UserProvider, useUser } from '../components/Users/UserContext';

const createWrapper = (Wrapper, props) => {
  return function CreatedWrapper({ children }) {
    return <Wrapper {...props}>{children}</Wrapper>;
  };
};

test('useUser hook returns setUser and an empty user when not logged in', () => {
  const { result } = renderHook(() => useUser(), {
    wrapper: createWrapper(UserProvider),
  });
  const [user, setUser] = result.current;
  expect(user).toBeNull();
  expect(typeof setUser).toBe('function');
});
