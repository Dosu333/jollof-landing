
/************
 * REDIRECT *
 ************/
export const gotoExternalRoute = (route:string) => {
    // window.location.href = route;
    window.open(route, "_blank");
}

export const gotoExternalRouteOnTab = (route:string) => {
    window.location.href = route;
}