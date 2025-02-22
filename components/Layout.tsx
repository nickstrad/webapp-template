import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex flex-col">
      <div>
        <Navbar />
      </div>
      <div className="grow">{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
