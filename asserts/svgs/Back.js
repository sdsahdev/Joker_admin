import React from "react";
import { View } from "react-native-animatable";

function Icon() {
    return (
        <View>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                fill="none"
                viewBox="0 0 44 44"
            >
                <g filter="url(#filter0_b_547_499)">
                    <rect
                        width="44"
                        height="44"
                        fill="#fff"
                        fillOpacity="0.2"
                        rx="8"
                    ></rect>
                    <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                        d="M19.57 15.93L13.5 22l6.07 6.07M30.5 22H13.67"
                    ></path>
                    <rect
                        width="43"
                        height="43"
                        x="0.5"
                        y="0.5"
                        stroke="url(#paint0_linear_547_499)"
                        rx="7.5"
                    ></rect>
                </g>
                <defs>
                    <filter
                        id="filter0_b_547_499"
                        width="116"
                        height="116"
                        x="-36"
                        y="-36"
                        colorInterpolationFilters="sRGB"
                        filterUnits="userSpaceOnUse"
                    >
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feGaussianBlur
                            in="BackgroundImageFix"
                            stdDeviation="18"
                        ></feGaussianBlur>
                        <feComposite
                            in2="SourceAlpha"
                            operator="in"
                            result="effect1_backgroundBlur_547_499"
                        ></feComposite>
                        <feBlend
                            in="SourceGraphic"
                            in2="effect1_backgroundBlur_547_499"
                            result="shape"
                        ></feBlend>
                    </filter>
                    <linearGradient
                        id="paint0_linear_547_499"
                        x1="3.85"
                        x2="39.6"
                        y1="3.3"
                        y2="40.15"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#fff"></stop>
                        <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
                    </linearGradient>
                </defs>
            </svg>
        </View>

    );
}

export default Icon;