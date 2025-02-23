/**
 * Scrolls current ref into view.
 * @param {React.MutableRefObject} componentRef
 */
export const scrollTo = (componentRef) => {
    componentRef.current?.scrollIntoView({ behavior: "smooth" });
};