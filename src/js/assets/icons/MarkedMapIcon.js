import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import icon from "decorators/icon";

@icon
class MarkedMapIcon extends PureComponent {
    render() {
        const { color, opacity } = this.props;

        return (
            <svg
                width="21"
                height="24"
                viewBox="0 0 21 24"
                fill={color}
                fillOpacity={opacity}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M20.894 22.5405L17.8713 15.6756C17.7122 15.2973 17.341 15.0811 16.9698 15.0811H15.8031C15.4849 15.6756 15.1137 16.2162 14.7425 16.7027H16.5455L19.091 22.3784H1.90915L4.40158 16.7027H6.20461C5.8334 16.2162 5.51521 15.6756 5.144 15.0811H4.03037C3.65915 15.0811 3.28794 15.2973 3.12885 15.6756L0.106123 22.5405C-0.212058 23.1892 0.318245 24 1.00764 24H19.9925C20.7349 24 21.2122 23.2432 20.894 22.5405Z" />
                <path d="M17.0228 6.27024C17.2349 11.2432 13.0455 16.6486 11.2955 18.7027C10.8712 19.1892 10.1818 19.1892 9.7576 18.7027C8.0076 16.7027 3.97729 11.4594 3.97729 6.64861C3.97729 3.08105 6.7879 0.162127 10.2349 -3.48804e-05C13.7879 -0.108143 16.8637 2.70267 17.0228 6.27024ZM10.5 1.94591C7.95457 1.94591 5.88639 4.05402 5.88639 6.64861C5.88639 9.24321 7.95457 11.3513 10.5 11.3513C13.0455 11.3513 15.1137 9.24321 15.1137 6.64861C15.1137 4.05402 13.0455 1.94591 10.5 1.94591Z" />
            </svg>
        );
    }
}

MarkedMapIcon.propTypes = {
    color: PropTypes.string,
    opacity: PropTypes.number,
};

export default MarkedMapIcon;
