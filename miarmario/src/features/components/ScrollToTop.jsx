import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        } else {
            window.location = window.location.hash;
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;
