function redirectPage(page) {
    const filters = getFiltersUrl();
    const url = page + filters;
    
    return document.location.href = url;
}

function getFiltersUrl() {
    return document.location.search;
}