import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import PledgeModal from "./PledgeModal";

const PublicLayout: React.FC = () => {
  const [isPledgeOpen, setIsPledgeOpen] = useState(false);

  return (
    <>
      <Header onTakePledge={() => setIsPledgeOpen(true)} />

      <main>
        <Outlet />
      </main>

      <Footer />

      {isPledgeOpen && (
        <PledgeModal onClose={() => setIsPledgeOpen(false)} />
      )}
    </>
  );
};

export default PublicLayout;

