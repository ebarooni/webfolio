import { PACKAGE_MANAGERS } from '../capacitor-calendar.content';
import { type CodeTab } from './code-tabs/code-tabs';

export const INSTALL_TABS: readonly CodeTab[] = PACKAGE_MANAGERS.map(
  (manager) => ({
    id: manager.id,
    title: manager.name,
    label: 'Terminal',
    code: manager.command,
    language: 'shell',
  }),
);
