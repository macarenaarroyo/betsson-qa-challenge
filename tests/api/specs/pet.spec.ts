import { test, expect } from '@playwright/test';

let petId: number;
test.describe('Pet Endpoints', () => {
  test.describe.configure({ mode: 'serial' });
  test('TC_API_01: Happy Path - Create a new pet with name and status available', async ({
    request,
  }) => {
    // Arrange
    const newPet = {
      id: Date.now(),
      name: 'Laika',
      photoUrls: ['none'],
      status: 'available',
    };

    // Act
    const response = await request.post('pet', {
      data: newPet,
    });

    // Assert
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Laika');
    expect(body.status).toBe('available');
    expect(body.id).toBeTruthy();

    petId = body.id;
  });

  test('TC_API_02: Sad Path - Attempt to create a pet with a malformed body', async ({
    request,
  }) => {
    // Arrange
    const malformedBody = 'invalid json';

    // Act
    const response = await request.post('pet', {
      data: malformedBody,
    });

    // Assert
    expect(response.status()).not.toBe(200);
  });

  test('TC_API_03: Happy Path - Retrieve the pet created in TC_API_01', async ({ request }) => {
    // Act
    const response = await request.get(`pet/${petId}`);

    // Assert
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(petId);
    expect(body.name).toBe('Laika');
    expect(body.status).toBe('available');
  });

  test('TC_API_04: Sad path — retrieve a pet that doesn not exist', async ({ request }) => {
    // Arrange
    const invalidId = 1234567890;

    // Act
    const response = await request.get(`pet/${invalidId}`);

    // Assert
    expect(response.status()).toBe(404);
  });

  test('TC_API_05: Happy path - Update pet status to sold', async ({ request }) => {
    // Arrange
    const updatedPet = {
      id: petId,
      name: 'Laika',
      photoUrls: ['none'],
      status: 'sold',
    };

    // Act
    const response = await request.put('pet', {
      data: updatedPet,
    });

    // Assert
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(petId);
    expect(body.name).toBe('Laika');
    expect(body.status).toBe('sold');
  });

  test('TC_API_06: Happy path - Delete the pet created in TC_API_01', async ({ request }) => {
    // Act
    const response = await request.delete(`pet/${petId}`);

    // Assert
    expect(response.status()).toBe(200);
  });

  test('TC_API_07: Verify pet deletion — attempt to retrieve the deleted pet', async ({ request }) => {
    // Act
    const response = await request.get(`pet/${petId}`);

    // Assert
    expect(response.status()).toBe(404);
  });
});
