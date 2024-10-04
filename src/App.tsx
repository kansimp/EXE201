import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoute, RouteType } from '@routes/routes';
import MainLayout from '@layouts/MainLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <div className="App">
            <Router basename="/EXE201">
                <Routes>
                    {publicRoute.map((route: RouteType, index: number) => {
                        const Page = route.component;
                        let Layout = MainLayout;
                        if (route.layout === null) {
                            return <Route key={index} path={route.path} element={<Page />} />;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>

            <ToastContainer />
        </div>
    );
}

export default App;
