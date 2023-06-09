/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true, // 개발 중 렌더링 확인을 위하여 잠시 false로 해둠. ture일 경우 디버깅을 위해서 2번씩 실행해 원하는 렌더링이 나오지 않을 수 가 있다.
  swcMinify: false,
  images: {
    domains: ['lecture-1.vercel.app', 'search.pstatic.net'],
  },
  i18n: {
    /** https://nextjs.org/docs/advanced-features/i18n-routing#getting-started */
    locales: ['ko'],
    defaultLocale: 'ko',
  },
};

module.exports = nextConfig;
