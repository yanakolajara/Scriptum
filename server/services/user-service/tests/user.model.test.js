import { describe, it, expect } from 'vitest';
import { UserModel } from '../models/user.model.js';

describe('User Model', () => {
  it('should create a new user object with the correct fields', async () => {
    const mockUser = {
      name: 'Yanako',
      email: 'yanako@example.com',
      password: 'hashedpassword123',
    };

    // Simulate DB response
    const createdUser = await userModel.createUser(mockUser);

    expect(createdUser).toHaveProperty('id');
    expect(createdUser.name).toBe(mockUser.name);
    expect(createdUser.email).toBe(mockUser.email);
    expect(createdUser.password).not.toBe(mockUser.password); // assuming hashing inside model
  });

  /**
   * @test should retrieve a user by ID
   */

  /**
   * @test should retrieve a user by email
   */

  /**
   * @test should update a user's information
   */

  /**
   * @test should delete a user by ID
   */
});
