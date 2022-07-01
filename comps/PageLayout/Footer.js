import React from "react"
//Components
import FooterProfile from "./FooterProfile"
import FooterCopyRights from "./FooterCopyRights"

const Footer = () => {

    return (
        <footer className="footer d-flex flex-wrap">
            <span className="frame-top grow frame-line" />
            <span className="frame-bottom grow frame-line" />
            <FooterProfile />
            <FooterCopyRights />
        </footer >
    )
}

export default Footer