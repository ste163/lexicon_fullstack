import React from "react"
import "./Icons.css"

// Icon contains all icons used for Lexicon
// To use Icons, pass in the following
    // a "Color=value" with the value based on Icons.css

// Takes a disabled prop
export const IconArrow = props => (
    <svg className={`icon__arrow ${props.rotation}`} width="35" height="20" version="1.1" viewBox="0 0 9.2606 5.2918" xmlns="http://www.w3.org/2000/svg">
        <title>Arrow Icon</title>
        <g transform="matrix(.526 0 0 .526 -.93661 -2.9209)">
            <rect className={props.disabled ? "icon__disabled" : props.color} id="line_right" transform="rotate(45)" x="16.259" y="-8.8998" width="2.5113" height="12.703"/>
            <rect className={props.disabled ? "icon__disabled" : props.color} id="line_left" transform="rotate(135)" x="1.2924" y="-18.771" width="2.5113" height="12.703"/>
        </g>
    </svg>
)

export const IconPlus = props => (
    <svg className="icon__plus" width="30" height="30" version="1.1" viewBox="0 0 7.9376 7.9376" xmlns="http://www.w3.org/2000/svg">
        <title>Plus Icon</title>
        <g transform="matrix(.61526 0 0 .61526 -2.5428 -2.5426)">
            <rect className={props.color} id="plus_vert" x="9.3277" y="4.2316" width="2.5113" height="12.703" ry="1.2556"/>
            <rect className={props.color} id="plus_horz" transform="rotate(90)" x="9.3277" y="-16.935" width="2.5113" height="12.703" ry="1.2556"/>
        </g>
    </svg>
)

export const IconHamburger = props => (
    <svg className="icon__hamburger" width="30" height="25" version="1.1" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <title>Hamburger Icon</title>
        <g transform="matrix(.61526 0 0 .61526 -2.5428 -2.5426)">
            <rect className={props.color} id="plus_horz" transform="rotate(90)" x="8" y="-16.935" width="2.5113" height="12.703" ry="1.2556"/>
            <rect className={props.color} id="plus_horz" transform="rotate(90)" x="12" y="-16.935" width="2.5113" height="12.703" ry="1.2556"/>
            <rect className={props.color} id="plus_horz" transform="rotate(90)" x="16" y="-16.935" width="2.5113" height="12.703" ry="1.2556"/>
        </g>
    </svg>
)

export const IconClose = props => (
    <svg className="icon__close" width="23" height="23" version="1.1" viewBox="0 0 6.0855 6.0855" xmlns="http://www.w3.org/2000/svg">
        <title>Close Icon</title>
        <g transform="matrix(.43505 -.43505 .43505 .43505 -6.1659 3.0428)">
            <rect className={props.color} id="line_vert" x="9.3277" y="4.2316" width="2.5113" height="12.703" ry="1.2556"/>
            <rect className={props.color} id="line_horz" transform="rotate(90)" x="9.3277" y="-16.935" width="2.5113" height="12.703" ry="1.2556"/>
        </g>
    </svg>
)

export const IconDots = props => (
    <svg className="icon__dots" width="75" height="20" version="1.1" viewBox="0 0 19.844 5.2918" xmlns="http://www.w3.org/2000/svg">
        <title>Dots Icon</title>
        <g transform="matrix(.94666 0 0 .94666 -.096637 -7.3726)">
            <path className={props.color} d="m5.4272 10.583a2.5509 2.5509 0 0 1-2.551 2.5509 2.5509 2.5509 0 0 1-2.5508-2.5509 2.5509 2.5509 0 0 1 2.5508-2.5509 2.5509 2.5509 0 0 1 2.551 2.5509z"/>
            <path className={props.color} d="m13.298 10.583a2.5509 2.5509 0 0 1-2.5509 2.5509 2.5509 2.5509 0 0 1-2.551-2.5509 2.5509 2.5509 0 0 1 2.551-2.5509 2.5509 2.5509 0 0 1 2.5509 2.5509z"/>
            <path className={props.color} d="m20.841 10.583a2.5509 2.5509 0 0 1-2.5509 2.5509 2.5509 2.5509 0 0 1-2.551-2.5509 2.5509 2.5509 0 0 1 2.551-2.5509 2.5509 2.5509 0 0 1 2.5509 2.5509z"/>
        </g>
    </svg>
)

export const IconLogout = props => (
    <svg className="icon__logout" width="35" height="30" version="1.1" viewBox="0 0 9.2606 7.9376" xmlns="http://www.w3.org/2000/svg">
        <title>Logout Icon</title>
        <g transform="matrix(.73547 0 0 .73547 -3.1534 -3.8149)">
            <path className={props.color} id="logout__rect" d="m15.97 5.4395c0.3658-3.2e-4 0.66243 0.2963 0.66211 0.66211v8.9102c3.18e-4 0.36581-0.29631 0.66243-0.66211 0.66211h-5.1123c-0.36505-7.41e-4 -0.66048-0.29706-0.66016-0.66211v-8.9102c-3.2e-4 -0.36505 0.29511-0.66136 0.66016-0.66211zm-0.66211 1.3223h-3.788v7.5898h3.788z" style={{colorRendering:"auto",color:"#000000",dominantBaseline:"auto",imageRendering:"auto",inlineSize:"0",isolation:"auto",mixBlendMode:"normal",shapeMargin:"0",shapePadding:"0",shapeRendering:"auto",solidColor:"#000000",stopColor:"#000000"}}/>
            <path className={props.color} id="logout__arrow" d="m8.0477 5.6538c8e-3 -1.1e-4 0.016-1e-4 0.024 1e-5 0.22161 9e-3 0.43181 0.10058 0.58864 0.2574l4.0486 4.0486c0.34402 0.3441 0.34402 0.90192 0 1.246l-4.0486 4.0514c-0.34418 0.34449-0.90254 0.34449-1.2467 0-0.34405-0.34411-0.34405-0.90195 0-1.2461l2.5451-2.5472-4.2401 1e-5c-0.48557-7.6e-4 -0.87901-0.39421-0.87978-0.87978-3.7e-4 -0.48639 0.39341-0.88109 0.87979-0.88185h4.2401l-2.5451-2.5451c-0.34404-0.34411-0.34404-0.90196 1e-5 -1.2461 0.1679-0.16797 0.39652-0.26105 0.634-0.25814z" style={{colorRendering:"auto",color:"#000000",dominantBaseline:"auto",imageRendering:"auto",inlineSize:"0",isolation:"auto",mixBlendMode:"normal",shapeMargin:"0",shapePadding:"0",shapeRendering:"auto",solidColor:"#000000",stopColor:"#000000",strokeLinecap:"round",strokeWidth:".60854",stroke:"#171717ff"}}/>
        </g>
    </svg>
)

export const IconGear = props => (
    <svg className="icon__gear" width="30" height="30" version="1.1" viewBox="0 0 7.9375 7.9375" xmlns="http://www.w3.org/2000/svg">
        <title>Gear Icon</title>
        <g>
            <path className={props.color} id="gear" d="m3.9685 0.058889c-0.38735 0-0.70855 0.32274-0.70855 0.71007 0 0.037027 0.0037 0.073145 0.00935 0.10874-0.35458 0.081004-0.68711 0.22203-0.98649 0.41169-0.12998-0.17572-0.33796-0.29142-0.57002-0.29142-0.38735 0-0.70855 0.3212-0.70855 0.70855 0 0.23114 0.1147 0.43847 0.28925 0.56849-0.19232 0.30115-0.33522 0.63621-0.41713 0.99367-0.03218-0.0046-0.064775-0.00783-0.098084-0.00783-0.38735 0-0.70942 0.32186-0.70942 0.7092 1.3e-7 0.38735 0.32207 0.70942 0.70942 0.70942 0.033309 0 0.065903-0.00324 0.098084-0.00783 0.08206 0.35805 0.22542 0.6936 0.41821 0.99519-0.17551 0.13003-0.29121 0.33789-0.29121 0.56958 1e-7 0.38735 0.32207 0.70855 0.70942 0.70855 0.23272 0 0.4412-0.11637 0.5711-0.29295 0.29896 0.18931 0.631 0.33007 0.98497 0.41104-0.0054 0.034786-0.00913 0.07-0.00913 0.10613-5e-7 0.38735 0.32207 0.70942 0.70942 0.70942 0.38735 0 0.70855-0.32207 0.70855-0.70942 0-0.036048-0.00356-0.07121-0.00892-0.10591 0.34986-0.079957 0.6783-0.21833 0.97453-0.40429 0.12954 0.17772 0.33857 0.2949 0.57219 0.2949 0.38735 0 0.70942-0.3212 0.70942-0.70855 0-0.23062-0.11467-0.43748-0.28881-0.56762 0.19624-0.3044 0.34195-0.64368 0.42496-1.0061 0.032203 0.00459 0.064748 0.00783 0.098084 0.00783 0.38735 0 0.70942-0.32207 0.70942-0.70942 0-0.38735-0.32207-0.7092-0.70942-0.7092-0.033336 0-0.06588 0.00323-0.098084 0.00783-0.081844-0.35738-0.22453-0.69235-0.41669-0.99345 0.17509-0.13 0.29055-0.33734 0.29055-0.56871 0-0.38735-0.32207-0.70855-0.70942-0.70855-0.23206 0-0.44003 0.1157-0.57002 0.29142-0.29933-0.18971-0.6319-0.33067-0.98649-0.41169 0.0057-0.035604 0.00957-0.071704 0.00957-0.10874 0-0.38733-0.32274-0.71007-0.71007-0.71007zm6.472e-4 2.5139c0.78227 0 1.3973 0.61504 1.3973 1.3973 0 0.78227-0.61504 1.3975-1.3973 1.3975-0.78227 0-1.3973-0.61526-1.3973-1.3975-1e-7 -0.78227 0.61504-1.3973 1.3973-1.3973z"/>
        </g>
    </svg>
)