import { getUserProfile } from '../../core/controllers/profile';
import { User } from '../../core/models/users';
import { redisClient } from '../../core/utils/redis';
import ResourceNotFoundError from '../../core/errors/ResourceNotFoundError';

jest.mock('../core/models/users');
jest.mock('../core/utils/redis');

describe('getUserProfile', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should return user profile from cache if available', async () => {
    const username = 'testUser';
    const cachedData = JSON.stringify({
      email: 'test@example.com',
      phone: '123456789',
      bio: 'Test bio',
      image: 'test.jpg',
      otp_enabled: true,
    });

    // Mock the Redis get method to return cached data
    (redisClient.get as jest.Mock).mockResolvedValueOnce(cachedData);

    const result = await getUserProfile(username);

    // Expect the result to match the cached data
    expect(result).toEqual(JSON.parse(cachedData));
    // Ensure that User.findOne is not called in this case
    expect(User.findOne).not.toHaveBeenCalled();
  });

  it('should return user profile from the database if not in cache', async () => {
    const username = 'testUser';
    const userData = {
      email: 'test@example.com',
      phone: '123456789',
      bio: 'Test bio',
      image: 'test.jpg',
      otp_enabled: true,
    };

    // Mock the Redis get method to return null (data not in cache)
    (redisClient.get as jest.Mock).mockResolvedValueOnce(null);

    // Mock the User.findOne method to return user data
    (User.findOne as jest.Mock).mockResolvedValueOnce(userData);

    const result = await getUserProfile(username);

    // Expect the result to match the user data from the database
    expect(result).toEqual(userData);
    // Ensure that User.findOne is called with the correct parameters
    expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
    // Ensure that the Redis set method is called to cache the data
    expect(redisClient.set).toHaveBeenCalledWith(`user:${username}`, JSON.stringify(userData), 'EX', 10800);
  });

  it('should throw ResourceNotFoundError if user is not found in the database', async () => {
    const username = 'nonexistentUser';

    // Mock the Redis get method to return null (data not in cache)
    (redisClient.get as jest.Mock).mockResolvedValueOnce(null);

    // Mock the User.findOne method to return null (user not found)
    (User.findOne as jest.Mock).mockResolvedValueOnce(null);

    // Expect the function to throw ResourceNotFoundError
    await expect(getUserProfile(username)).rejects.toThrow(ResourceNotFoundError);

    // Ensure that User.findOne is called with the correct parameters
    expect(User.findOne).toHaveBeenCalledWith({ where: { username } });
    // Ensure that the Redis set method is not called in this case
    expect(redisClient.set).not.toHaveBeenCalled();
  });
});
