import { describe, expect, it } from 'vitest';

import { findProject, PROJECTS } from './project-catalog';

describe('project catalog', () => {
  it('should list the projects by title', () => {
    const titles = PROJECTS.map((project) => project.title);

    expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)));
  });

  it('should give every project a unique id', () => {
    const ids = PROJECTS.map((project) => project.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should find a project by its id', () => {
    expect(findProject('capawesome').title).toBe('Capawesome');
  });

  it('should fail for an unknown id', () => {
    expect(() => findProject('unknown')).toThrowError(/unknown/);
  });
});
