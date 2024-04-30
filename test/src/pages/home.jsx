import NavigationBar from '../components/navbar';
import '../style/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className="home-container">
            <NavigationBar />
            <div className="container ">
                <p className='heading'>SAFEGUARDING YOUR Future Tasks</p>

            </div>
            <div className='container'>
                <div className="d-flex align-items-start">

                    <Button as={Link} to="/todo" variant="dark" className="text-light px-3 mt-3 me-3">ToDo</Button>
                    <div className='ml-3 mt-3 btn-right text-light'> {/* Added margin-left to separate the text from the button */}
                        <span className="mt-3">Lorem, ipsum dolor sit amet </span>
                        <br />
                        <span>consectetur Dolore, et?</span>
                    </div>
                    <div className='ml-auto mt-2 txt-right ms-auto px-5 text-light'>
                        <span> Lorem ipsum dolor sit amet consectetur adipisicing elit.</span><br />
                        <span> Fuga praesentium magnam odit eligendi maiores</span><br />
                        <span> accusantium perspiciatis nobis doloremque blanditiis ad,
                        </span>
                    </div>
                </div>
            </div>
            {/* <div className='board-img d-flex '>
                <img src={boardImage} alt='Board Image' className='mx-auto'></img>
            </div> */}


            {/* <div className='features d-flex flex-column justify-content-center align-items-center' id='demoVideo'>
                <div className="text-center">
                    <span className='features-span'>Video Demo</span>
                    <div className='mt-3'>
                        <h1>See SpeedScan In Action</h1>
                    </div>
                </div>
                
            </div> */}





        </div>




    )
}

export default Home;
