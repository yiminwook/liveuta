import { MouseEvent } from 'react';
import useStopPropagation from '@/hooks/useStopPropagation';
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

  const onClick = () => {
    onClose();
  };

  return (
    <aside>
      <div className={[sidebar['container'], show ? sidebar['show'] : ''].join(' ')} onClick={onClick}>
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
