/**
 * The view transition name of a post title. The list and the post page
 * use the same name, thus the title moves from one page to the other.
 */
export function postTitleTransitionName(slug: string): string {
  return `post-title-${slug}`;
}
