import { test } from 'node:test';
import assert from 'node:assert';

// We override standard global behavior to test handleFirestoreError
import * as firebaseLib from './firebase';

test('handleFirestoreError does not leak PII in error message', (t) => {
  // Capture console.error
  const originalConsoleError = console.error;
  let consoleOutput = '';
  console.error = (msg, data) => {
    consoleOutput = `${msg}${data}`;
  };

  // Mock currentUser temporarily if possible
  const originalCurrentUser = firebaseLib.auth.currentUser;

  // Create a mutable copy of auth just for testing if needed, but we can't easily mock auth.currentUser because it is read-only.
  // Actually auth is an object, we can mock it using Object.defineProperty
  Object.defineProperty(firebaseLib.auth, 'currentUser', {
    value: {
        uid: 'user123',
        email: 'secret@example.com',
        emailVerified: true,
        isAnonymous: false,
        tenantId: 'tenant456',
        providerData: [
          {
            providerId: 'google.com',
            displayName: 'John Doe',
            email: 'secret@example.com',
            photoURL: 'http://example.com/photo.jpg',
          },
        ],
      },
    configurable: true
  });

  try {
    const error = new Error('Permission denied');
    firebaseLib.handleFirestoreError(error, firebaseLib.OperationType.GET, 'users/123');
    assert.fail('Expected handleFirestoreError to throw');
  } catch (err: any) {
    const errObj = JSON.parse(err.message);

    // Ensure PII is NOT present
    assert.strictEqual(errObj.authInfo.email, undefined, 'Email should not be in error message');
    assert.strictEqual(errObj.authInfo.emailVerified, undefined, 'EmailVerified should not be in error message');
    assert.strictEqual(errObj.authInfo.providerInfo, undefined, 'providerInfo should not be in error message');

    // Ensure harmless debug data is present
    assert.strictEqual(errObj.authInfo.userId, 'user123', 'userId should be present');
    assert.strictEqual(errObj.authInfo.isAnonymous, false, 'isAnonymous should be present');
    assert.strictEqual(errObj.authInfo.tenantId, 'tenant456', 'tenantId should be present');

    // Check that console.error output also doesn't contain PII
    assert.ok(!consoleOutput.includes('secret@example.com'), 'Email should not be logged');
    assert.ok(!consoleOutput.includes('providerData'), 'Provider data should not be logged');
    assert.ok(!consoleOutput.includes('displayName'), 'Display name should not be logged');
  } finally {
    // Restore console.error
    console.error = originalConsoleError;
    // Restore currentUser
    Object.defineProperty(firebaseLib.auth, 'currentUser', {
      value: originalCurrentUser,
      configurable: true
    });
  }
});
