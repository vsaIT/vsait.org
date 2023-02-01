import { ChildrenProps } from '@lib/types';
import AdminSideNavigation from './AdminSideNavigation';

const AdminLayout = ({ children }: ChildrenProps) => {
  return (
    <div className="flex flex-row z-10 w-full bg-stone-100 overflow-y-hidden">
      <AdminSideNavigation />
      <div className="flex flex-col relative w-full box-border overflow-y-auto h-screen">
        {children}
      </div>
    </div>
  );
};
export default AdminLayout;
