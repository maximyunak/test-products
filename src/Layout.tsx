import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`min-w-screen min-h-screen transition text-xl bg-[#fffff5]`}>
      <div className="container max-w-[95%] mx-auto flex gap-4 justify-center align-center w-full pt-5 pb-8">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
};
