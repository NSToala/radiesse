import { Link } from 'react-router-dom'

export const CourseCard = ({_id, name, category, speaker, poster}) => {

    const path = `/${poster}`;

    return (
        <div className="col animate__animated animate__fadeIn">
            <div className="card">
                
                <div className="row no-gutters">
                    <div className="col-4">
                        <img src={ path } className="card-img" alt={name} />
                    </div>
                    <div className="col-8">

                        <div className="card-body">

                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{speaker}</p>

                            <p className="card-text">
                                <small className="text-muted">{ category }</small>
                            </p>

                            
                            <Link to={`/courses/learn/${_id}`}>
                                Más...
                            </Link>

                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
