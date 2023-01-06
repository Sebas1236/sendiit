import { useState } from "react";
import "./css/imagestyles.css";
export const ImageComponent = (image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC") => {
    const [isOpen, setIsOpen] = useState(false);
    // console.log(image)
    const handleShowDialog = () => {
        setIsOpen(!isOpen);
        console.log("cliked");
    };

    return (
        <div>
            <img
                className="small"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOaSURBVO3BQW7dWAIEwayHf/8r52jRi1oR4JCSbaEi4hdm/nOYKYeZcpgph5lymCmHmXKYKYeZcpgph5lymCmHmXKYKYeZcpgpHx5Kwk9SuZKEptKS0FSeSEJTaUn4SSpPHGbKYaYcZsqHl6m8KQl3qFxRuSMJb1J5UxLedJgph5lymCkfvlkS7lC5IwlNpSWhqbxJ5Ykk3KHynQ4z5TBTDjPlwy+ThCtJuEPlShKayr/sMFMOM+UwUz78cipXktBUWhKaSlP5TQ4z5TBTDjPlwzdT+ZOS8IRKS0JTeULlb3KYKYeZcpgpH16WhD9JpSWhqbQkXElCU2lJaCpXkvA3O8yUw0w5zJT4hX9YEprK/P8OM+UwUw4z5cNDSWgqLQlvUmkqLQlNpSWhqbQkNJWWhCsqLQlvUvlOh5lymCmHmfLhZUm4ovKTktBUWhKaSktCU7mShKZyRxKayk86zJTDTDnMlPiFB5LQVFoSmkpLQlNpSbiickcS7lBpSWgqTyThTSpPHGbKYaYcZsqHh1RaEp5IQlNpSWhJaCp3qFxJQlO5IwlXVFoSmkpLQlN502GmHGbKYaZ8eCgJV1RaEprKlSQ0lStJaCpN5UoSmkpLwhWVKyotCU2lJaGptCQ0lScOM+UwUw4z5cPLVN6k0pLQVJrKHUloKi0JTeVKEppKS0JTaUloKi0JTeVNh5lymCmHmRK/8EASmsodSbhD5UoSmsoTSbiiciUJV1SeSEJTeeIwUw4z5TBTPvzlVFoSmkpTuSMJTeWKSktCU/lJKm86zJTDTDnMlA/fLAlN5Y4k3JGEKypXktBUWhKuJOGOJLxJ5YnDTDnMlMNMiV/4hyXhisoTSWgqLQlN5Y4kNJUrSWgqbzrMlMNMOcyUDw8l4SepNJU7knCHyhNJaCpPqLQkNJUnDjPlMFMOM+XDy1TelIQrSXhC5UoSnlC5IwlN5ScdZsphphxmyodvloQ7VJ5QuZKEloQ3JeEJlZaEptJU3nSYKYeZcpgpH365JDSVloSmckcSvpNKS8IVlScOM+UwUw4z5cMvk4Q7VO5IQlP5TkloKi0JbzrMlMNMOcyUD99M5TuptCQ0lSeS0FRaEppKS8IVlSsqP+kwUw4z5TBTPrwsCT8pCU3liSQ0lZaEptKS0FTuSMKfdJgph5lymCnxCzP/OcyUw0w5zJTDTDnMlMNMOcyUw0w5zJTDTDnMlMNMOcyUw0w5zJT/AdXBqwAFVgMAAAAAAElFTkSuQmCC"
                // src={image.image}
                onClick={handleShowDialog}
                alt="no hay qr"
                style={{
                    height: 30,
                    width: 30,
                }}
            />
            {isOpen && (
                <dialog
                    className="dialog"
                    style={{ position: "absolute" }}
                    open
                    onClick={handleShowDialog}
                >
                    <img
                        className="image"
                        src={image.image}
                        onClick={handleShowDialog}
                        alt="no image"
                    />
                </dialog>
            )}
        </div>
    );
}
