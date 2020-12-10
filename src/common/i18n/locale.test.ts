import detectLanguage from './locale';

describe('detectLanguage test', () => {
  it('test detectLanguage with header without accept-language returns en', () => {
    // Arrage
    const req = { headers: {} };

    // Act
    const result = detectLanguage(req);

    // Assert
    expect(result).toBe('en');
  });

  it('test detectLanguage with undefined accept-language header returns en', () => {
    // Arrage
    const req = {
      headers: { 'accept-language': undefined },
    };

    // Act
    const result = detectLanguage(req);

    // Assert
    expect(result).toBe('en');
  });

  it('test detectLanguage with single language in accept-language header returns ko', () => {
    // Arrage
    const req = {
      headers: { 'accept-language': 'ko' },
    };

    // Act
    const result = detectLanguage(req);

    // Assert
    expect(result).toBe('ko');
  });

  it('test detectLanguage with unexpected language in accept-language header returns en', () => {
    // Arrage
    const req = {
      headers: { 'accept-language': 'jp' },
    };

    // Act
    const result = detectLanguage(req);

    // Assert
    expect(result).toBe('en');
  });

  it('test detectLanguage with multiple language in accept-language header returns ko', () => {
    // Arrage
    const req = {
      headers: { 'accept-language': 'ko,en;q=0.5' },
    };

    // Act
    const result = detectLanguage(req);

    // Assert
    expect(result).toBe('ko');
  });

  it('test detectLanguage with multiple language in accept-language header returns ko', () => {
    // Arrage
    const req = {
      headers: { 'accept-language': 'ko,en;en-US, q=0.9;' },
    };

    // Act
    const result = detectLanguage(req);

    // Assert
    expect(result).toBe('ko');
  });

  it('test detectLanguage with multiple language in accept-language header returns en', () => {
    // Arrage
    const req = {
      headers: { 'accept-language': 'jp,en-US;ko, en;' },
    };

    // Act
    const result = detectLanguage(req);

    // Assert
    expect(result).toBe('en');
  });
});
