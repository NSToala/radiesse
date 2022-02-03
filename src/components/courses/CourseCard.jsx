import { Link } from 'react-router-dom'

export const CourseCard = ({_id, name, category, speaker, poster}) => {

    const path = `/${poster}`;

    return (
        <div className="col mx-auto animate__animated animate__fadeIn">
            <div className="card">
                <img src={ path }  className="card-img-top" alt={name} />
                
                <div className="card-body">
                    <div className="progress my-2">
                        <div className="progress-bar bg-success" role="progressbar" style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>

                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{speaker}</p>

                    <Link to={`/courses/learn/${_id}`}>
                        Iniciar curso
                    </Link>
                </div>
            </div>
        </div>
    )
}
