import { TwitterIcon, InstagramIcon, GithubIcon, MailIcon } from '@/components/ui/Icons';

export const SOCIAL_LINKS = [
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: GithubIcon, href: 'https://github.com', label: 'Github' },
  { icon: MailIcon, href: 'mailto:example@email.com', label: 'Email' },
] as const;

export const SHARE_PLATFORMS = [
  { name: 'Twitter', icon: '𝕏', color: 'bg-white' },
  { name: 'WeChat', icon: '💬', color: 'bg-green-500' },
  { name: 'Weibo', icon: '📱', color: 'bg-red-500' },
  { name: 'Copy Link', icon: '📋', color: 'bg-gray-500' },
] as const;
