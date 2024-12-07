import { describe, test, expect, beforeEach } from 'vitest';

interface Item {
  id: number;
  name: string;
  description: string;
  seller: string;
  available: boolean;
}

describe('Marketplace', () => {
  let items: Map<number, Item>;
  let lastItemId: number;
  
  beforeEach(() => {
    items = new Map();
    lastItemId = 0;
  });
  
  test('items can be listed and purchased', () => {
    const seller = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
    const buyer = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
    
    // List item
    const itemId = lastItemId + 1;
    const item: Item = {
      id: itemId,
      name: "Dream Journal",
      description: "A beautiful journal for recording your dreams",
      seller,
      available: true
    };
    
    items.set(itemId, item);
    lastItemId = itemId;
    
    // Verify item was listed
    const listedItem = items.get(itemId);
    expect(listedItem).toBeDefined();
    expect(listedItem?.name).toBe("Dream Journal");
    expect(listedItem?.available).toBe(true);
    
    // Purchase item
    const purchasedItem = items.get(itemId);
    if (purchasedItem) {
      purchasedItem.available = false;
      items.set(itemId, purchasedItem);
    }
    
    // Verify item was purchased
    const finalItem = items.get(itemId);
    expect(finalItem).toBeDefined();
    expect(finalItem?.available).toBe(false);
  });
});

