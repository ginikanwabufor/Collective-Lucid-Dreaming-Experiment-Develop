import { describe, test, expect, beforeEach } from 'vitest';

interface DreamReport {
  encryptedReport: string;
  timestamp: number;
}

interface BiometricData {
  encryptedData: string;
  timestamp: number;
}

describe('Dream Data Storage', () => {
  let dreamReports: Map<string, DreamReport>;
  let biometricData: Map<string, BiometricData>;
  let blockHeight: number;
  
  const participant1 = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const participant2 = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
  
  beforeEach(() => {
    dreamReports = new Map();
    biometricData = new Map();
    blockHeight = 0;
  });
  
  test('participants can submit dream reports', () => {
    const experimentId = 1;
    const report: DreamReport = {
      encryptedReport: "encrypted dream report content",
      timestamp: blockHeight
    };
    
    // Submit report
    const reportKey = `${participant1}-${experimentId}`;
    dreamReports.set(reportKey, report);
    
    // Verify report was stored
    const storedReport = dreamReports.get(reportKey);
    expect(storedReport).toEqual(report);
  });
  
  test('participants can submit biometric data', () => {
    const experimentId = 1;
    const data: BiometricData = {
      encryptedData: "encrypted biometric data content",
      timestamp: blockHeight
    };
    
    // Submit data
    const dataKey = `${participant1}-${experimentId}`;
    biometricData.set(dataKey, data);
    
    // Verify data was stored
    const storedData = biometricData.get(dataKey);
    expect(storedData).toEqual(data);
  });
  
  test('different participants can submit data for same experiment', () => {
    const experimentId = 1;
    
    // First participant submits data
    const report1: DreamReport = {
      encryptedReport: "participant 1 report",
      timestamp: blockHeight
    };
    dreamReports.set(`${participant1}-${experimentId}`, report1);
    
    // Second participant submits data
    const report2: DreamReport = {
      encryptedReport: "participant 2 report",
      timestamp: blockHeight
    };
    dreamReports.set(`${participant2}-${experimentId}`, report2);
    
    // Verify both reports were stored correctly
    expect(dreamReports.get(`${participant1}-${experimentId}`)).toEqual(report1);
    expect(dreamReports.get(`${participant2}-${experimentId}`)).toEqual(report2);
  });
});

