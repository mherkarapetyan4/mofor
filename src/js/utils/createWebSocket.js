import { BASE_URL } from "config/consts";
import webstomp from "webstomp-client";
function createWebSocket(category, actionGetMessage) {
    let root;
    if (location.hostname === "localhost") {
        root = BASE_URL.replace("https://", "wss://");
    } else if (location.origin.indexOf("https://") !== -1) {
        root = location.origin.replace("https://", "wss://") + "/sizl/";
    } else {
        root = location.origin.replace("http://", "ws://") + "/sizl/";
    }

    const endpoint = `${root}/stomp`;
    // const mgfoms_sessionid = cookie.load('mgfoms_sessionid')

    const socket = new WebSocket(
        endpoint +
            "?mgfoms_sessionid=" +
            localStorage.getItem("mgfoms_sessionid"),
    );
    const client = webstomp.over(socket, { debug: false });
    client.connect({}, () => {
        client.subscribe(`/user/topic/${category}/unread`, (frame) => {
            const unreadMessage = JSON.parse(frame.body).exist;
            const { dispatch } = this.props;
            if (unreadMessage) {
                dispatch(actionGetMessage());
            }
        });
    });
}

export { createWebSocket };
