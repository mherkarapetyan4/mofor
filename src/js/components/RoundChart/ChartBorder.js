import React, { PureComponent } from "react";

class ChartBorder extends PureComponent {
    render() {
        return (
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 98 98"
            >
                <circle fill={"#383838"} cx="49" cy="49" r="5" />
                <path
                    fill={"#383838"}
                    d="M98,48h-4C93.4,24,74,4.6,50,4V0h-2v4C24,4.6,4.6,24,4,48H0v2h4c0.5,24,20,43.4,44,44v4h2v-4
                c24-0.5,43.4-20,44-44h4V48z M49,92C25.3,92,6,72.7,6,49C6,25.3,25.3,6,49,6c23.7,0,43,19.3,43,43C92,72.7,72.7,92,49,92z"
                />
            </svg>
        );
    }
}

export default ChartBorder;
