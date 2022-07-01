const SVGDefs = () => {
    return (
        <svg className="svgDefs">
            <defs>
                <symbol id="svgSlash">
                    <line x1="0%" y1="0%" x2="100%" y2="100%" />
                </symbol>
                <pattern className="fill-theme" id="diagonal-stripe-1" patternUnits="userSpaceOnUse" width="17" height="17">
                    <path d="M0,2l15,15H8L0,9V2z M17,9L8,0h7l2,2V9z"></path>
                </pattern>
                <pattern className="fill-theme" id="diagonal-stripe-2" patternUnits="userSpaceOnUse" width="27" height="27">
                    <path d="M0,3.5L3.5,0h15L0,18.5V3.5 M3.5,27L27,3.5v15L18.5,27H3.5z"></path>
                </pattern>
                <pattern className="fill-theme" id="diagonal-stripe-3" patternUnits="userSpaceOnUse" width="6" height="6">
                    <path d="M2,3V2h1V1h1V0H2v1H1v1H0v2h1V3H2z M0,0h1v1H0V0z M5,0v1H4v1H3v1H2v1H1v1H0v1h2V5h1V4h1V3h1V2h1V0H5z M6,3H5v1 H4v1H3v1h2V5h1V3z" ></path>
                </pattern>
                <pattern className="fill-theme" id="star-pattern-1" patternUnits="userSpaceOnUse" width="6" height="6">
                <path d="M1,1V0h1v1h1v1H2v1H1V2H0V1H1z M4,4V3h1v1h1v1H5v1H4V5H3V4H4z"></path>
                </pattern>
                <pattern className="fill-theme" id="star-pattern-2" x="5" y="5" width="10" height="10" patternUnits="userSpaceOnUse" >
                    <circle cx="5" cy="5" r="5" />
                </pattern>
            </defs>
        </svg>
    );
}

export default SVGDefs;