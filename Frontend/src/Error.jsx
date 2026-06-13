import './Error.css';

export default function Error({error,resetErrorBoundary}){
    return(
        <div className="Error">
            <h3>OOPS! Something went wrong</h3>
            <h1>:(</h1>
            <button onClick={()=>{resetErrorBoundary()}}>Try Again !</button>
        </div>
    )
}