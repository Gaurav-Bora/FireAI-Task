import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link and useHistory from React Router
import { useNavigate } from 'react-router-dom';
const NavigationBar = () => {
    const userId = sessionStorage.getItem('userId'); // Get userId from sessionStorage
    const navigate = useNavigate();  // Get the history object from React Router

    const handleLogout = () => {
        // Clear userId from sessionStorage
        sessionStorage.removeItem('userId');
        // Redirect to the login page after logout
        navigate('/login');
    };

    return (
        <div className="container containerr">
            <Navbar bg="transparent" variant="dark" className="nav-style" expand="md">
                <Navbar.Brand href="#home">
                    {/* Your brand content */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav className="mr-auto txt-size">
                        <Nav.Link as={Link} to="/todo">ToDO List</Nav.Link>
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    </Nav>
                    <Nav className="ml-md-auto txt-size">
                        {userId ? ( // If userId exists (user is logged in)
                            <>
                                <Button variant="dark" className="text-light" onClick={handleLogout}>Logout</Button>
                            </>
                        ) : ( // If userId does not exist (user is not logged in)
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link> {/* Link to the login page */}
                                <Button as={Link} to="/signup" variant="dark" className="text-light">Register</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavigationBar;
