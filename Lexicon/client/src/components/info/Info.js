import React, { forwardRef } from 'react'
import { ChangeIconClassOnHover } from '../../utils/ChangeIconClassOnHover'
import './Info.css'
// Info buttons - based on dot menu

const Info = (React.forwardRef((props, ref) => (
        <article className="info__container info__container--inactive">
            <p className="info__text">Information</p>
        </article>
)))

export default Info