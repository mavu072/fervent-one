import React from "react";
import { ThreeDots } from "react-loader-spinner";

function InlineLoader() {
    return (
        <ThreeDots
            visible={true}
            height="10"
            width="40"
            color="#b1aeae"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    );
}

export default InlineLoader;