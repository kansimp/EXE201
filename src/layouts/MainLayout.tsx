import { ReactNode } from 'react';

export type MainLayoutProps = {
    children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <>
            <div>Header</div>
            <div>{children}</div>
            <div>Footer</div>
        </>
    );
};

export default MainLayout;
