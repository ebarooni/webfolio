export type SocialId = 'github' | 'gitlab' | 'stackoverflow' | 'linkedin';

export type SocialLink = Readonly<{
  id: SocialId;
  label: string;
  handle: string;
  href: string;
}>;

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    handle: 'ebarooni',
    href: 'https://github.com/ebarooni',
  },
  {
    id: 'gitlab',
    label: 'GitLab',
    handle: 'ebarooni',
    href: 'https://gitlab.com/ebarooni',
  },
  {
    id: 'stackoverflow',
    label: 'Stack Overflow',
    handle: 'ebarooni',
    href: 'https://stackoverflow.com/users/13690331/ebarooni',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'barooni',
    href: 'https://linkedin.com/in/barooni',
  },
];
