import { usePathname } from 'next/navigation';

/** page를 제외한 pathname을 반환 */
export const useLocation = () => {
  const pathname = usePathname() || '/';
  return pathname.replace(/\/page\/(\d+)/, '');
};
