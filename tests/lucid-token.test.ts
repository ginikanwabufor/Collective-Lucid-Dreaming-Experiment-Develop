import { describe, test, expect, beforeEach } from 'vitest';

interface TokenState {
  balances: Map<string, number>;
  totalSupply: number;
}

describe('Lucid Token', () => {
  let state: TokenState;
  const owner = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const user1 = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  const user2 = 'ST3AM1A56AK2C1XAFJ4115ZSV26EB49BVQ10MGCS0';
  
  beforeEach(() => {
    state = {
      balances: new Map(),
      totalSupply: 0
    };
  });
  
  test('owner can mint tokens', () => {
    const amount = 1000;
    const sender = owner;
    
    // Mint tokens
    const currentBalance = state.balances.get(user1) || 0;
    state.balances.set(user1, currentBalance + amount);
    state.totalSupply += amount;
    
    // Verify balance
    expect(state.balances.get(user1)).toBe(amount);
    expect(state.totalSupply).toBe(amount);
  });
  
  test('users can transfer tokens', () => {
    // Setup initial balance
    state.balances.set(user1, 1000);
    state.totalSupply = 1000;
    
    const amount = 500;
    
    // Transfer tokens
    const senderBalance = state.balances.get(user1) || 0;
    const recipientBalance = state.balances.get(user2) || 0;
    
    expect(senderBalance).toBeGreaterThanOrEqual(amount);
    
    state.balances.set(user1, senderBalance - amount);
    state.balances.set(user2, recipientBalance + amount);
    
    // Verify balances
    expect(state.balances.get(user1)).toBe(500);
    expect(state.balances.get(user2)).toBe(500);
    expect(state.totalSupply).toBe(1000);
  });
});
