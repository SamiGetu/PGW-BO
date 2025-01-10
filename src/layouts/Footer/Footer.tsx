const Footer = () => {
  return (
    <footer className="border-t text-neutral-800 text-center p-4">
      <p className="text-md cursor-pointer hover:text-secondary hover:underline hover:scale-95 transition duration-300 ease-in-out">
        © {new Date().getFullYear()} Developed by Invictus Software
      </p>
    </footer>
  );
};

export default Footer;
