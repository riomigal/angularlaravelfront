import { User } from './user.model';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User('name', 'asdfasdf232', ['user'])).toBeTruthy();
  });
});
