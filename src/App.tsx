import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Repository from "./pages/Repository";
import Issues from "./pages/Issues";
import PullRequests from "./pages/PullRequests";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="repository/:owner/:repo" element={<Repository />} />
          <Route path="repository/:owner/:repo/issues" element={<Issues />} />
          <Route
            path="repository/:owner/:repo/pulls"
            element={<PullRequests />}
          />
          <Route path="settings" element={<Settings />} />
          <Route path="test" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
