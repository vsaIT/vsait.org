import AdminSideNavigation from './AdminSideNavigation';

type AdminLayoutProps = {
  children: JSX.Element;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className='z-10 flex w-full flex-row overflow-y-hidden bg-stone-100'>
      <AdminSideNavigation />
      <div className='relative box-border flex h-screen w-full flex-col overflow-y-auto'>
        {children}
      </div>
    </div>
  );
};
export default AdminLayout;
