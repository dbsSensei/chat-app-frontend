import { Container, Navbar } from "react-bootstrap";
import Auth from "../Auth";

const Header = () => {
  return (
    <Navbar
      style={{
        boxShadow: "0px 0px 7px 0px #9e9e9d",
        backgroundColor: "white",
        padding: "0",
      }}
    >
      <Container
        style={{
          padding: "15px",
          margin: "0px",
          maxWidth: "100%",
        }}
      >
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://altechomega.com/wp-content/uploads/2020/09/logo.png"
            width="200px"
            className="d-inline-block align-top"
          />
          {/* React Bootstrap */}
        </Navbar.Brand>
        <Auth />
      </Container>
    </Navbar>
  );
};

export default Header;
