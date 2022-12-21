import sendiitLogo from '../images/sendiit-original.png';

export const Sendiitlogo = () => {
    return (
        <img 
            src={sendiitLogo} 
            alt="Sendiit Logo" 
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '130px',
            }}
        />
    )
}
