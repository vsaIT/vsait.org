import AdminSideNavigation from './AdminSideNavigation';
import BackToTop from '@/components/BackToTop';

type AdminLayoutProps = {
  children: JSX.Element;
};

const SCROLL_CONTAINER_ID = 'admin-content';

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className='z-10 flex w-full flex-row overflow-y-hidden bg-stone-200'>
      <AdminSideNavigation />
      <div
        id={SCROLL_CONTAINER_ID}
        className='relative box-border flex h-screen w-full flex-col overflow-y-auto'
      >
        {children}
        <BackToTop targetId={SCROLL_CONTAINER_ID} />
      </div>
    </div>
  );
};
export default AdminLayout;
