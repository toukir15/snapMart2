import ClientNavbar from "./clientNavbar";
import ServerNavbar from "./serverNavbar";
export const Navbar = async () => {

  return (
    <div className="bg-[#F85606] shadow-md fixed top-0 left-0 w-full z-50">
      <div>
        <ClientNavbar />
        <ServerNavbar />
      </div>
    </div>
  );
};
