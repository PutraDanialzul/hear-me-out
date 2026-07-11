import ExpressionForm from "../../../components/expression/expression-form";

export default async function AddExpressionPage({searchParams}:{searchParams:Promise<{error:string}>}){
    let banner = (null);
    const error = (await searchParams).error;
    if(error)
        banner = (
            <div className="errorBanner">
                {error}
            </div>
        );
    return (
        <div>
            {banner} 
            <h1>Express: </h1>
            <ExpressionForm/>
        </div>
    );
}