import React, {Fragment} from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
export default ({children, onClick, tip, btnClassName, tipClassName}) => (
    <Fragment>
        <Tooltip title={tip} className={tipClassName} placement="top" >
            <IconButton onClick={onClick} className={btnClassName}>
                {children}
            </IconButton>
        </Tooltip>
    </Fragment>
);
