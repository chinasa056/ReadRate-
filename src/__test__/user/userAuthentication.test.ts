import bcrypt from 'bcryptjs';
import * as userController from '../../core/controllers/user';
import * as userService from '../../core/services/user';
import { logger } from '../../core/utils/logger';
import AuthorizationError from '../../core/errors/AuthorizationError';
import * as authHelpers from '../../core/helpers/auth';

// Mock dependencies
jest.mock('bcryptjs');
jest.mock('../../core/services/user');
jest.mock('../../core/utils/logger');
jest.mock('../../core/helpers/auth');

describe('User Authentication', () => {
  // Clear all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('processUserRegistration', () => {
    const mockRegistrationRequest = {
      user_name: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    const mockCreatedUser = {
      id: '123',
      user_name: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',
      is_verified: false,
      is_admin: false
    };

    it('should successfully register a new user', async () => {
      // Mock dependencies
      (userService.findUserByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.genSaltSync as jest.Mock).mockReturnValue('salt');
      (bcrypt.hashSync as jest.Mock).mockReturnValue('hashedpassword');
      (userService.createUser as jest.Mock).mockResolvedValue(mockCreatedUser);

      // Call the function
      const result = await userController.processUserRegistration(mockRegistrationRequest);

      // Assert function calls
      expect(userService.findUserByEmail).toHaveBeenCalledWith(mockRegistrationRequest.email);
      expect(bcrypt.genSaltSync).toHaveBeenCalledWith(10);
      expect(bcrypt.hashSync).toHaveBeenCalledWith(mockRegistrationRequest.password, 'salt');
      expect(userService.createUser).toHaveBeenCalledWith({
        user_name: mockRegistrationRequest.user_name,
        email: mockRegistrationRequest.email,
        password: 'hashedpassword'
      });
      expect(logger.info).toHaveBeenCalledWith('User registration successful');

      // Assert result
      expect(result).toEqual({
        message: 'User registration successful',
        user: mockCreatedUser
      });
    });

    it('should throw an error if user with email already exists', async () => {
      // Mock dependencies
      (userService.findUserByEmail as jest.Mock).mockResolvedValue({
        id: '123',
        email: 'test@example.com'
      });

      // Call the function and expect it to throw
      await expect(userController.processUserRegistration(mockRegistrationRequest))
        .rejects.toThrow('User with this email already exists');

      // Assert function calls
      expect(userService.findUserByEmail).toHaveBeenCalledWith(mockRegistrationRequest.email);
      expect(userService.createUser).not.toHaveBeenCalled();
      expect(logger.info).not.toHaveBeenCalled();
    });
  });

  describe('processUserLogin', () => {
    const mockLoginRequest = {
      email: 'test@example.com',
      password: 'password123'
    };

    const mockUser = {
      id: '123',
      user_name: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword',
      is_verified: true,
      is_admin: false
    };

    const mockAccessToken = 'mock-access-token';
    const mockRefreshToken = 'mock-refresh-token';

    it('should successfully login a user with valid credentials', async () => {
      // Mock dependencies
      (userService.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (authHelpers.generateAccessJwtToken as jest.Mock).mockReturnValue(mockAccessToken);
      (authHelpers.generateRefreshJwtToken as jest.Mock).mockReturnValue(mockRefreshToken);

      // Call the function
      const result = await userController.processUserLogin(mockLoginRequest);

      // Assert function calls
      expect(userService.findUserByEmail).toHaveBeenCalledWith(mockLoginRequest.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginRequest.password, mockUser.password);
      expect(authHelpers.generateAccessJwtToken).toHaveBeenCalledWith({
        userId: mockUser.id,
        user_name: mockUser.user_name,
        isAdmin: mockUser.is_admin
      });
      expect(authHelpers.generateRefreshJwtToken).toHaveBeenCalledWith({
        id: mockUser.id
      });
      expect(logger.info).toHaveBeenCalledWith('Login successful');

      // Assert result
      expect(result).toEqual({
        email: mockUser.email,
        access_token: mockAccessToken,
        refresh_token: mockRefreshToken
      });
    });

    it('should throw an AuthorizationError if user does not exist', async () => {
      // Mock dependencies
      (userService.findUserByEmail as jest.Mock).mockResolvedValue(null);

      // Call the function and expect it to throw
      await expect(userController.processUserLogin(mockLoginRequest))
        .rejects.toThrow(AuthorizationError);
      
      // Assert function calls
      expect(userService.findUserByEmail).toHaveBeenCalledWith(mockLoginRequest.email);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(authHelpers.generateAccessJwtToken).not.toHaveBeenCalled();
      expect(authHelpers.generateRefreshJwtToken).not.toHaveBeenCalled();
      expect(logger.info).not.toHaveBeenCalled();
    });

    it('should throw an AuthorizationError if password is invalid', async () => {
      // Mock dependencies
      (userService.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      // Call the function and expect it to throw
      await expect(userController.processUserLogin(mockLoginRequest))
        .rejects.toThrow(AuthorizationError);
      
      // Assert function calls
      expect(userService.findUserByEmail).toHaveBeenCalledWith(mockLoginRequest.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginRequest.password, mockUser.password);
      expect(authHelpers.generateAccessJwtToken).not.toHaveBeenCalled();
      expect(authHelpers.generateRefreshJwtToken).not.toHaveBeenCalled();
      expect(logger.info).not.toHaveBeenCalled();
    });

    it('should include the correct error message for wrong password', async () => {
      // Mock dependencies
      (userService.findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      
      try {
        await userController.processUserLogin(mockLoginRequest);
        fail('Expected error was not thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(AuthorizationError);
        if (error instanceof AuthorizationError) {
          expect(error.message).toBe('Wrong password');
        }
      }
    });
  });

  describe('refreshToken', () => {
    const mockRefreshData = {
      userId: '123',
      refreshToken: 'old-refresh-token'
    };

    const mockUser = {
      id: '123',
      user_name: 'testuser',
      email: 'test@example.com',
      is_admin: false
    };

    const mockNewAccessToken = 'new-access-token';
    const mockNewRefreshToken = 'new-refresh-token';

    it('should successfully refresh tokens when provided with valid refresh token', async () => {
      // Mock dependencies
      (userService.findUserById as jest.Mock).mockResolvedValue(mockUser);
      (authHelpers.isRefreshTokenValid as jest.Mock).mockResolvedValue(true);
      (authHelpers.generateRefreshJwtToken as jest.Mock).mockReturnValue(mockNewRefreshToken);
      (authHelpers.generateAccessJwtToken as jest.Mock).mockReturnValue(mockNewAccessToken);
      (authHelpers.cacheRefreshToken as jest.Mock).mockResolvedValue(undefined);

      // Call the function
      const result = await userController.refreshToken(mockRefreshData);

      // Assert function calls
      expect(userService.findUserById).toHaveBeenCalledWith(mockRefreshData.userId);
      expect(authHelpers.isRefreshTokenValid).toHaveBeenCalledWith({
        userId: mockRefreshData.userId,
        refreshToken: mockRefreshData.refreshToken
      });
      expect(authHelpers.generateRefreshJwtToken).toHaveBeenCalledWith({
        id: mockUser.id
      });
      expect(authHelpers.generateAccessJwtToken).toHaveBeenCalledWith({
        userId: mockUser.id,
        user_name: mockUser.user_name,
        isAdmin: mockUser.is_admin
      });
      expect(authHelpers.cacheRefreshToken).toHaveBeenCalledWith({
        userId: mockUser.id,
        refreshToken: mockNewRefreshToken
      });

      // Assert result
      expect(result).toEqual({
        id: mockUser.id,
        user_name: mockUser.user_name,
        email: mockUser.email,
        accessToken: mockNewAccessToken,
        refreshToken: mockNewRefreshToken
      });
    });

    it('should throw ResourceNotFoundError if user is not found', async () => {
      // Mock dependencies
      (userService.findUserById as jest.Mock).mockResolvedValue(null);

      // Call the function and expect it to throw
      await expect(userController.refreshToken(mockRefreshData))
        .rejects.toThrow('User not found');

      // Assert function calls
      expect(userService.findUserById).toHaveBeenCalledWith(mockRefreshData.userId);
      expect(authHelpers.isRefreshTokenValid).not.toHaveBeenCalled();
    });

    it('should throw BadRequestError if refresh token is invalid', async () => {
      // Mock dependencies
      (userService.findUserById as jest.Mock).mockResolvedValue(mockUser);
      (authHelpers.isRefreshTokenValid as jest.Mock).mockResolvedValue(false);

      // Call the function and expect it to throw
      await expect(userController.refreshToken(mockRefreshData))
        .rejects.toThrow('Invalid refresh token');

      // Assert function calls
      expect(userService.findUserById).toHaveBeenCalledWith(mockRefreshData.userId);
      expect(authHelpers.isRefreshTokenValid).toHaveBeenCalledWith({
        userId: mockRefreshData.userId,
        refreshToken: mockRefreshData.refreshToken
      });
      expect(authHelpers.generateRefreshJwtToken).not.toHaveBeenCalled();
      expect(authHelpers.generateAccessJwtToken).not.toHaveBeenCalled();
      expect(authHelpers.cacheRefreshToken).not.toHaveBeenCalled();
    });
  });
});

// Important: Clean up all connections after these tests
afterAll(async () => {
  // Using dynamic imports to avoid issues with module initialization order
  const { closeRedis } = await import('../../core/utils/redis');
  const { default: sequelize } = await import('../../core/database/sequelize');
  
  try {
    await closeRedis();
    await sequelize.close();
  } catch (error) {
    logger.error('Error in test cleanup:', error);
  }
});
