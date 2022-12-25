import React from 'react'

function Link(props) {
    const { to, children, onHandleChangePath } = props;

    const handleClickChangePath = (e) => {
        e.preventDefault();
        window.history.pushState(null, '', to);
        onHandleChangePath();
    }
    return (
        <a href={to} onClick={handleClickChangePath}>
            {children}
        </a>
    )
}

export default Link;