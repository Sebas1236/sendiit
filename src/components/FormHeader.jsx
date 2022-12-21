
export const FormHeader = ({title}) => {
	return (
		<div className="form-header p-4">
			<img className="mb-4 mx-auto d-block" src='/img/brand/logo_sendiit-dark.png' alt="sendiit" width="200"/>
			<h1 className="h3 mb-3 fw-normal text-center">{title}</h1>
		</div>
	);
}
