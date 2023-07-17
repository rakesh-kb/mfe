import { mount } from 'auth/Auth';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; 

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                const { currentPathname } = history.location;
                if (currentPathname !== nextPathname) {
                    history.push(nextPathname);
                }
            }
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />;
};