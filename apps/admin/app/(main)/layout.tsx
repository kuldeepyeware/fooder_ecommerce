import Sidebar from "../../components/Common/Sidebar";
import SidebarMobile from "../../components/Common/SidebarMobile";

export default function MainCompLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <main className='flex'>
      <Sidebar />
      <SidebarMobile />
      {children}
    </main>
  );
}
