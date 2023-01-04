export const TrackStepsPoints = ({step}) => {
	const totalSteps = 5;

	return (
		<div className="d-flex justify-content-center mt-4">
			<div className="d-flex align-items-center justify-content-center">
				{[...Array(totalSteps)].map((e, i) => {
					++i;
					return (
						<span key={i} className="d-flex align-items-center">
							<div className={"d-flex align-items-center justify-content-center pe-1 circle "
								.concat(i < step ? "done " : "")
								.concat(i === step ?"current " : "")}>
									{i < step && < i className="fa fa-check check"></i>}
							</div>
								{ i < step && < hr className="green-line"></hr>}
								{ i >= step && i < totalSteps && <hr className="gray-line"></hr>}
						</span>
					)}
				)}
			</div>
				 
		  <div className="d-flex align-items-center ps-4">
        <span className="fw-bolder">Paso {step} de {totalSteps}</span>
      </div>
		</div>
	);
}