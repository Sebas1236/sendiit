export const TrackStepsPoints = ({step}) => {
	const totalSteps = 5;
	if (step < 1)
		return (<></>)
	else 
		return (
		<div className="d-flex justify-content-center mt-4">
			<div className="d-flex align-items-center justify-content-center">
				{[...Array(totalSteps)].map((e, i) => (
					<span key={i} className="d-flex align-items-center">
						<div className={"d-flex align-items-center justify-content-center pe-1 circle "
							.concat(i+1 < step ? "done " : "")
							.concat(i+1 === step ?"current " : "")}>
								{i+1 < step && <i className="fa fa-check check"></i>}
						</div>
							{ i+1 < step && <hr className="green-line"></hr>}
							{ i+1 >= step && i+1 < totalSteps && <hr className="gray-line"></hr>}
					</span>
				))}
			</div>
				 
		  <div className="d-flex align-items-center ps-4">
        <span className="fw-bolder">Paso {step} de {totalSteps}</span>
      </div>
		</div>
	);
}