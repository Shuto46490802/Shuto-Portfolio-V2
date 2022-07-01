//Components
import FooterCopyRights from "./FooterCopyRights";
import FooterWorks from "./FooterWorks";

const Footer2 = () => {

    return ( 
        <footer className="footer d-flex flex-wrap">
        <span className="frame-top grow frame-line" />
        <span className="frame-bottom grow frame-line" />
        <FooterWorks />
        <FooterCopyRights />
    </footer >
     );
}
 
export default Footer2;