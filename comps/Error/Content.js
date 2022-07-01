import React from "react"

const ErrorContent = () => {

    return (
        <div className="error-content">
            <div className="error-content__inner">
                <div className="error-text__wrapper">
                    <h1 className="error-text">
                        <span className="error-text__inner">4</span>
                        <span className="error-text__inner">0</span>
                        <span className="error-text__inner">4</span>
                    </h1>
                    <p className="error-sub-text">
                        Ooops... Page not found.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ErrorContent;