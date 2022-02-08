import { Link } from 'react-router-dom'

export const CourseCard = ({_id, name, category, speaker, poster}) => {

    const path = `/${poster}`;

    return (
        <div className="col mx-auto animate__animated animate__fadeIn">
            <div className="card">
                <img src={ path }  className="card-img-top" alt={name} />
                
                <div className="card-body">
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
