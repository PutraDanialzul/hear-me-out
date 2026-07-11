import ExpressionForm from "../../../components/expression/expression-form";
import ExpressionInfoButton from "../../../components/expression/expression-info-button";
import MindSpacePanel from "../../../components/expression/mind-space-panel";

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
        <MindSpacePanel>
            <div>
                {banner} 
                <h1>New Thoughts <ExpressionInfoButton/></h1> 
                <ExpressionForm/>
            </div>
        </MindSpacePanel>
    );
}