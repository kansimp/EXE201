import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoute, RouteType } from "@routes/routes";
import MainLayout from "@layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthLayout from "@layouts/AuthLayout";
import AdminLayout from "@layouts/AdminLayouts";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {publicRoute.map((route: RouteType, index: number) => {
            const Page = route.component;
            let Layout = MainLayout;
            if (route.layout === null) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <>
                      <Page />
                    </>
                  }
                />
              );
            } else if (route.layout === AuthLayout) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AuthLayout>
                      <Page />
                    </AuthLayout>
                  }
                />
              );
            } else if (route.layout === AdminLayout) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <AdminLayout>
                      <Page />
                    </AdminLayout>
                  }
                />
              );
            }
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
