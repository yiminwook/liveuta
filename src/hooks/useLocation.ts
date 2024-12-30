import { usePathname } from '@/i18n/routing';

/** page를 제외한 pathname을 반환 */
const useLocation = () => {
  const pathname = usePathname() || '/';
  const location = pathname.replace(/\/page\/(\d+)/, '');
  return location === '/' ? '' : location;
};

export default useLocation;
