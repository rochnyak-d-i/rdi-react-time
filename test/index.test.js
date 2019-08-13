import React from 'react';
import { act, create } from 'react-test-renderer';
import Time from '../src';

describe('React Time', () => {
  it('should render time with correct format', () => {
    const testRenderer = create(
      <Time
        date={new Date(2020, 1, 10, 5, 10, 10)}
        format="YYYY-MM-DD HH:mm:ss"
      />
    );
    const testInstance = testRenderer.root.findByType('time');

    expect(testInstance.children[0]).toBe('2020-02-10 05:10:10');
    expect(testInstance.props.dateTime).toBe('2020-02-10 05:10');
  });

  it('should update time', () => {
    const testRenderer = create(
      <Time autoUpdate timeUpdate={1 * 1000} date={new Date()} />
    );
    const testInstance = testRenderer.root.findByType('time');

    expect(testInstance.children[0]).toBe('a few seconds ago');
  });

  it('should calendarUntilDays correctly work', () => {
    const testRenderer = create(
      <Time calendarUntilDays={1} date={new Date()} />
    );
    const testInstance = testRenderer.root.findByType('time');

    expect(testInstance.children[0]).toEqual(
      expect.stringContaining('Today at '));
  });
});
