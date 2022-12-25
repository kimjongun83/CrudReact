import Spinner from 'react-bootstrap/Spinner';

const LoadingComponent = ()=> {
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
        </Spinner>
    );
}

export default LoadingComponent;