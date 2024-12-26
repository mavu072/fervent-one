import React from "react";
import { ThreeDots } from "react-loader-spinner";

function InlineLoader() {
    return (
        <div className='inline-loader'>
            <ThreeDots
                visible={true}
                height="auto"
                width="40"
                color="#b1aeae"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
}

export default InlineLoader;