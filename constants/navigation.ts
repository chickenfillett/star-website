import { StarIcon, CameraIcon, BookOpenIcon, UserIcon, LockIcon } from '@/components/ui/Icons';

export const NAV_ITEMS = [
  { href: '/', label: '首页', icon: StarIcon },
  { href: '/photography', label: '摄影作品', icon: CameraIcon },
  { href: '/opinions', label: '观点分享', icon: BookOpenIcon },
  { href: '/about', label: '关于我', icon: UserIcon },
] as const;

export const PRIVATE_NAV_ITEMS = [
  ...NAV_ITEMS,
  { href: '/private', label: '私域', icon: LockIcon },
] as const;
