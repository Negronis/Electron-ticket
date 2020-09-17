export let RouterLink = function (url, type = "default") {
  if (type === 'default') {
    this.props.history.push(url);
  }
  if (type === "replace") {
    this.props.history.replace(url);
  }
}
export let RouterLinkParam = function (url, type = "default", params) { 
  if (type === 'default') {
    this.props.history.push({
      pathname: url,
      params
    });
  }
  if (type === "replace") {
    this.props.history.replace({
      pathname: url,
      params
    });
  }
}
