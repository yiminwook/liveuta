import { useEffect } from 'react';
import useStopPropagation from '@/hook/useStopPropagation';
import ExternalLinksSection from '@/components/layout/sidebar/ExternalLinksSection';
import IndexSection from '@/components/layout/sidebar/IndexSection';
import sidebar from '@/components/layout/sidebar/Sidebar.module.scss';
import CloseButton from '@/components/common/button/CloseButton';
import ThemeButton from '@/components/common/button/ThemeButton';

interface SidebarProps {
  show: boolean;
  onClose: () => void;
}

const Sidebar = ({ show, onClose }: SidebarProps) => {
  const { stopPropagation } = useStopPropagation();

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    //window 사이즈가 바뀌면 닫히게
    window.addEventListener('resize', handleClose);

    return () => {
      window.removeEventListener('resize', handleClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside>
      <div className={[sidebar['container'], show ? sidebar['show'] : ''].join(' ')} onClick={handleClose}>
        <div className={[sidebar['sidebar'], show ? sidebar['show'] : ''].join(' ')} onClick={stopPropagation}>
          <nav>
            <CloseButton onClose={onClose} />
            <ThemeButton />
          </nav>
          <IndexSection />
          <ExternalLinksSection />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
