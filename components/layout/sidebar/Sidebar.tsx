import { MouseEvent } from 'react';
import useStopPropagation from '@/hooks/useStopPropagation';
import ExternalLinksSection from '@/components/layout/sidebar/ExternalLinksSection';
import IndexSection from '@/components/layout/sidebar/IndexSection';
import sidebar from '@/components/layout/sidebar/Sidebar.module.scss';
import CloseButton from '@/components/common/CloseButton';
import DarkModeButton from '@/components/common/DarkModeButton';

interface SidebarProps {
  show: boolean;
  onClose: () => void;
}

const Sidebar = ({ show, onClose }: SidebarProps) => {
  const { stopPropagation } = useStopPropagation();

  const onClick = (e: MouseEvent) => {
    e.stopPropagation(); //이벤트 버블링 방지
    onClose();
  };

  return (
    <aside>
      <div className={[sidebar['container'], show ? sidebar['show'] : ''].join(' ')} onClick={onClick}>
        <div className={[sidebar['sidebar'], show ? sidebar['show'] : ''].join(' ')} onClick={stopPropagation}>
          <nav>
            <CloseButton className={sidebar['close']} onClose={onClose} />
            <DarkModeButton className={sidebar['darkmode']} />
          </nav>
          <IndexSection />
          <ExternalLinksSection />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
